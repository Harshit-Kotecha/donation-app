package com.help.pit.rest;

import com.help.pit.utils.DonationStage;
import com.help.pit.entity.*;
import com.help.pit.service.DonationService;
import com.help.pit.utils.DonationUtils;
import com.help.pit.utils.ResourceNotFoundException;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import javax.naming.NoPermissionException;
import java.util.*;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
@AllArgsConstructor
public class DonationsRestController {
    private DonationService donationService;

    @GetMapping("/donations")
    public BaseResponse<List<Donation>> findAll(@RequestParam(name = "search_key", required = false) String searchKey, @RequestParam(name = "category", required = false) String category, @RequestParam(name = "status", required = false) String status) {
        if (searchKey != null && !searchKey.trim().isEmpty()) {
            return new SuccessResponse<>(donationService.findDonations(searchKey.trim().toLowerCase()));
        }

        Specification<Donation> specification = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (category != null && !category.isEmpty()) {
                Predicate categoryPredicate = cb.equal(root.get("category"), category);
                predicates.add(categoryPredicate);
            }

            if (status != null && !status.isEmpty()) {
                DonationStage donationStage = DonationUtils.getDonationStage(status);

                Predicate statusPredicate = cb.equal(root.get("status"), donationStage);
                predicates.add(statusPredicate);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

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

        // Extract username from token
        donation.setCreatedBy(donationService.extractUsername(authToken));

        donation.setHasExpiry(donation.getExpiresAt() != null);
        donation.setLikes(0);
        donation.setCategory(donation.getCategory().toLowerCase());
        donation.setStatus(DonationStage.open);
        final Donation result = donationService.save(donation);
        return new SuccessResponse<>(result, "Donation added successfully!");

    }

    @PatchMapping("/donation/update/{id}")
    public BaseResponse<String> updateDonationStatus(@PathVariable(name = "id") Long id, @RequestParam(name = "status") DonationStage status) {

        if (status == null || status.toString().isEmpty()) {
            return new FailureResponse<>("A valid status is required", HttpStatus.BAD_REQUEST.value());
        }

        // Check whether this user exist or not
        donationService.findById(id);

        Integer result = donationService.updateDonationStatus(status, id);
        if (result == 0) {
            return new FailureResponse<>(400);
        }

        return new SuccessResponse<>(DonationUtils.getDonationMsg(status));
    }

    @DeleteMapping("/donations/{id}")
    public BaseResponse<String> deleteById(@RequestHeader("Authorization") String token, @PathVariable(name = "id") Long id) throws NoPermissionException, BadRequestException {
        Donation donation = donationService.findById(id);

        String currentUser = donationService.extractUsername(token);

        Integer result = donationService.softDeleteDonation(currentUser, id);
        if(result == 0) {
            throw new BadRequestException("You don't have permission to delete this donation");
        }
        return new SuccessResponse<>("Donation of id " + id + " deleted successfully");
    }

    @GetMapping("/my-donations")
    public BaseResponse<List<Donation>> getMyDonations(@RequestHeader("Authorization") String token) {
        String currentUser = donationService.extractUsername(token);

        return new SuccessResponse<>(donationService.findByCreatedByAndIsDeletedFalse(currentUser));
    }
}
