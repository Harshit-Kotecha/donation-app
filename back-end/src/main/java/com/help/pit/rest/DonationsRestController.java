package com.help.pit.rest;

import com.help.pit.dao.DonationStages;
import com.help.pit.entity.*;
import com.help.pit.models.DonationFilters;
import com.help.pit.models.Filters;
import com.help.pit.service.DonationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
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
    public BaseResponse<List<Donation>> findAll(@RequestParam(name = "name", required = false) String name) {
        if (name != null) {
            return new SuccessResponse<>(donationService.filterByName(name));
        }
        return new SuccessResponse<>(donationService.findAll());
    }

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
    public BaseResponse<List<Object>> getAllFilters() {
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
}
