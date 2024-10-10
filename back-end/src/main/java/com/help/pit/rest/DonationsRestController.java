package com.help.pit.rest;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.help.pit.dao.DonationRepository;
import com.help.pit.dao.LikeRepository;
import com.help.pit.service.LikeService;
import com.help.pit.service.UserService;
import com.help.pit.utils.*;
import com.help.pit.entity.*;
import com.help.pit.service.DonationService;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import javax.naming.NoPermissionException;
import java.math.BigInteger;
import java.util.*;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
@AllArgsConstructor
public class DonationsRestController {
    private DonationService donationService;

    private UserService userService;

    @Autowired
    private SnGMapper sngMapper;

    @GetMapping("/donations")
    public BaseResponse<List<Donation>> findAll(@RequestParam(name = "search_key", required = false) String searchKey, @RequestParam(name = "category", required = false) String category, @RequestParam(name = "status", required = false) String status) {

        SimpleBeanPropertyFilter simpleBeanPropertyFilter =
                SimpleBeanPropertyFilter.serializeAllExcept("hasUserLiked");

        FilterProvider filterProvider = new SimpleFilterProvider()
                .addFilter("userFilter", simpleBeanPropertyFilter);

        if (searchKey != null && !searchKey.trim().isEmpty()) {
//            result = donationService.findDonations(searchKey.trim().toLowerCase());
            return new SuccessResponse<>(donationService.findDonations(searchKey.trim().toLowerCase()));
        }

        Specification<Donation> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            Predicate isDeletedPredicate = cb.equal(root.get("isDeleted"), false);
            predicates.add(isDeletedPredicate);

            if (category != null && !category.isEmpty()) {
                Predicate categoryPredicate = cb.equal(root.get("category"), category);
                predicates.add(categoryPredicate);
            }

            if (status != null && !status.isEmpty()) {
                DonationStage donationStage = DonationUtils.getDonationStage(status);

                Predicate statusPredicate = cb.equal(root.get("status"), donationStage);
                predicates.add(statusPredicate);
            }
            assert query != null;
            query.orderBy(cb.asc(root.get("id")));
            return cb.and(predicates.toArray(new Predicate[0]));
        };

//        return new SuccessResponse<>(donationService.findAll(specification));
//        result = donationService.findAll(specification);
//        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(result);
//        mappingJacksonValue.setFilters(filterProvider);

//        return mappingJacksonValue;
        return new SuccessResponse<>(donationService.findAll(specification));

    }

    @GetMapping("/donations/{id}")
    public BaseResponse<Donation> findById(@PathVariable(name = "id") Long id) {
        return new SuccessResponse<>(donationService.findById(id));
    }

    @GetMapping("/donations/categories")
    public BaseResponse<List<String>> getAllCategories() {
        List<String> categories = donationService.getAllCategories();
        Collections.sort(categories);
        return new SuccessResponse<>(categories);
    }

    @GetMapping("/csrf-token")
    public BaseResponse<CsrfToken> getCsrfToken(HttpServletRequest request) {
        return new SuccessResponse<>((CsrfToken) request.getAttribute("_csrf"));
    }

    @PostMapping("/donations")
    public BaseResponse<Donation> add(@Valid @RequestBody Donation donation, @RequestHeader("Authorization") String authToken) {
        if (donation == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }

        // Extract user id from token
        Integer id = donationService.extractUserId(authToken);
        donation.setUser(userService.findById(id));
        donation.setHasExpiry(donation.getExpiresAt() != null);
        donation.setLikes(0);
        donation.setCategory(donation.getCategory().toLowerCase());
        donation.setStatus(DonationStage.open);
        final Donation result = donationService.save(donation);
        return new SuccessResponse<>(result, "Donation added successfully!");

    }

//    @PatchMapping("/donation/update/{id}")
//    public BaseResponse<String> updateDonationStatus(@PathVariable(name = "id") Long id, @RequestParam(name = "status") DonationStage status) {
//
//        if (status == null || status.toString().isEmpty()) {
//            return new FailureResponse<>("A valid status is required", HttpStatus.BAD_REQUEST.value());
//        }
//
//        // Check whether this user exist or not
//        // donationService.findById(id);
//
//        Integer result = donationService.updateDonationStatus(status, id);
//        if (result == 0) {
//            return new FailureResponse<>("Donation not found", 400);
//        }
//
//        return new SuccessResponse<>(DonationUtils.getDonationMsg(status));
//    }

    @DeleteMapping("/donations/{id}")
    public BaseResponse<String> deleteById(@RequestHeader("Authorization") String token, @PathVariable(name = "id") Long id) throws NoPermissionException, BadRequestException {
        Donation donation = donationService.findById(id);

        Integer userId = donationService.extractUserId(token);

        Integer result = donationService.softDeleteDonation(userId, id);
        if (result == 0) {
            throw new BadRequestException("You don't have permission to delete this donation");
        }
        return new SuccessResponse<>("Donation of id " + id + " deleted successfully");
    }

    @GetMapping("/my-donations")
    public BaseResponse<List<Donation>> getMyDonations(@RequestHeader("Authorization") String token) {
        Integer id = donationService.extractUserId(token);
        User user = userService.findById(id);

        return new SuccessResponse<>(donationService.findByUser(user));
    }

    @PatchMapping("/donation/like/{id}")
    public BaseResponse<String> likeDonation(@PathVariable(name = "id") Long id, @RequestHeader("Authorization") String authToken) {
        User user = getUser(authToken);
        Set<User> userLiked = donationService.getUserLiked(id);
        String msg;

        if (userLiked.contains(user)) {
            userLiked.remove(user);
            msg = "Donation disliked successfully!";
        } else {
            userLiked.add(user);
            msg = "Donation liked successfully";
        }

        donationService.updateUserLiked(id, userLiked);
        return new SuccessResponse<>(msg);
    }

    // A user can't receive his own donations
    @PatchMapping("/donation/receive/{id}")
    public BaseResponse<UserDTO> receiveDonation(@RequestHeader("Authorization") String authToken, @PathVariable(name = "id") Long id) throws BadRequestException {
        AllUsersDTO usersDTO = donationService.findUsersByDonationId(id);

        if(usersDTO.getDonationStatus() == DonationStage.closed) {
            throw new BadRequestException("This donation is already closed");
        }
        if (usersDTO.getReceiverUser() != null) {
            throw new BadRequestException("A receiver has already been assigned for this donation.");
        }

        User user = getUser(authToken);
        if(user == usersDTO.getCreaterUser()) {
            throw new BadRequestException("You can't receive your own donation");
        }
        Integer result = donationService.processDonation(DonationStage.processing, id, user);
        if (result == 0) {
            throw new BadRequestException("This donation doesn't exist!");
        }

        UserDTO userDTO = sngMapper.toUserDTO(user);
        return new SuccessResponse<>(userDTO, "You are receiving this donation");
    }

    // Both the creator and receiver of donation should close this donation.
    @PatchMapping("/donation/close/{id}")
    public BaseResponse<String> closeDonation(@RequestHeader("Authorization") String authToken, @PathVariable(name = "id") Long id) throws BadRequestException, NoPermissionException {
        AllUsersDTO usersDTO = donationService.findUsersByDonationId(id);

        if (usersDTO.getReceiverUser() == null) {
            throw new BadRequestException("A receiver must be assigned first for this donation to be closed.");
        }
        if (usersDTO.getDonationStatus() == DonationStage.closed) {
            throw new BadRequestException("This donation is already closed!");
        }

        User currUser = getUser(authToken);
        if (currUser != usersDTO.getCreaterUser() && currUser != usersDTO.getReceiverUser()) {
            throw new NoPermissionException("You don't have permission to close this donation");
        }

        DonationStage donationStage = getDonationStage(usersDTO, currUser);
        Integer result;
        if(donationStage == null) {
            IntermediateDonationStage intermediateDonationStage = currUser == usersDTO.getCreaterUser() ? IntermediateDonationStage.closed_by_donor : IntermediateDonationStage.closed_by_receiver;
            result = donationService.updateInterDonationStatus(intermediateDonationStage, id);
        } else {
            result = donationService.updateDonationStatus(donationStage, id);
        }
        String msg = donationStage == DonationStage.closed ? "Congratulations for completing this donation" : "This donation is marked as closed by you.";

        if (result == 0) {
            throw new BadRequestException("This donation doesn't exist!");
        }
        return new SuccessResponse<>(msg);
    }

    private static DonationStage getDonationStage(AllUsersDTO usersDTO, User currUser) throws NoPermissionException {
        DonationStage donationStage;

        if (usersDTO.getIntermediateStatus() == IntermediateDonationStage.closed_by_receiver) {
            // Now donor should close this
            if (currUser == usersDTO.getCreaterUser()) {
                donationStage = DonationStage.closed;
            } else {
                throw new NoPermissionException("The donor must also close this donation");
            }
        } else if (usersDTO.getIntermediateStatus() == IntermediateDonationStage.closed_by_donor) {
            // Now receiver should close this
            if (currUser == usersDTO.getReceiverUser()) {
                donationStage = DonationStage.closed;
            } else {
                throw new NoPermissionException("The receiver must also close this donation");
            }
        } else {
            donationStage = null;
        }
        return donationStage;
    }

    User getUser(String authToken) {
        Integer id = donationService.extractUserId(authToken);
        return userService.findById(id);
    }
}
