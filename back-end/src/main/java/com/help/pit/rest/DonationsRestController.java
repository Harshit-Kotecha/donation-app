package com.help.pit.rest;

import com.help.pit.dao.DonationStages;
import com.help.pit.entity.*;
import com.help.pit.models.DonationFilters;
import com.help.pit.models.Filters;
import com.help.pit.service.DonationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
@AllArgsConstructor
public class DonationsRestController {
    private DonationService donationService;

    @GetMapping("/donations")
    public BaseResponse<List<Donation>> findAll(@RequestParam(name = "search_key", required = false) String searchKey) {
        if (searchKey != null && !searchKey.trim().isEmpty()) {
            return new SuccessResponse<>(donationService.findDonations(searchKey.trim().toLowerCase()));
        }
        return new SuccessResponse<>(donationService.findAllByOrderByExpiryTimeDesc());
    }

//    List<Donation> findDonations(@Param("search_key") String searchKey) {
//        return donationService.findDonations(searchKey);
//    }

    @GetMapping("/donations/{id}")
    public BaseResponse<Donation> findById(@PathVariable(name = "id") Long id) {
        return new SuccessResponse<>(donationService.findById(id));

    }

    @GetMapping("/categories")
    public  BaseResponse<List<String>> getAllCategories() {
        List<String> categories = new ArrayList<>();
        try {
            categories = donationService.getAllCategories();
        } catch (Exception e) {
            return new FailureResponse<>(HttpStatus.NO_CONTENT.value());
        }

        return new SuccessResponse<>(categories);
    }

    @GetMapping("/filters")
    public BaseResponse<Map<String, List<String>>> getAllFilters() {
        return new SuccessResponse<>(donationService.getFilters());
    }

    @PostMapping("/donations")
    public BaseResponse<Donation> add(@Valid @RequestBody Donation donation) {
        if (donation == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }
        donation.setStatus(DonationStages.open);
        final Donation result = donationService.save(donation);
        return new SuccessResponse<>(result);

    }

    @PatchMapping("/donation/update/{id}")
    public BaseResponse<String> updateDonationStatus(@PathVariable(name = "id") Long id, @RequestParam(name = "status") DonationStages status) {

        // Check whether this user exist or not
        donationService.findById(id);

        Integer result = donationService.updateDonationStatus(status, id);
        if (result == 0) {
            return new FailureResponse<>(400);
        }
        return new SuccessResponse<>("Donation updated successfully");
    }

    @DeleteMapping("/donations/{id}")
    public BaseResponse<String> deleteById(@PathVariable(name = "id") Long id) {
        Donation donation = donationService.findById(id);
        donationService.deleteById(id);

        return new SuccessResponse<>("Donation of id " + id + " deleted successfully");
    }

    @GetMapping("/donations/sort")
    public BaseResponse<List<Donation>> findByCategoryAndRegionAndState(@RequestParam(required = false) Map<String, String> params) {
        System.out.println(params + "params");
        return new SuccessResponse<>(donationService.findAll());
    }
}
