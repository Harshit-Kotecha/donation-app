package com.help.pit.service;

import com.help.pit.dao.DonationStages;
import com.help.pit.entity.Donation;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface DonationService {
    List<Donation> findAll();

    List<Donation> findAllByOrderByExpiresAtDesc();

    Donation findById(Long id);

    Donation save(Donation donation);

    void deleteById(Long id);

    Integer updateDonationStatus(@Param("status") DonationStages status, @Param("id") Long id);

    List<Donation> filterByName(String name);

    List<String> getAllCategories();

    Map<String, List<String>> getFilters();

//    List<Object> getFilters();

    List<Donation> findByCategoryAndRegionAndState(String category, String region, String state);

    List<Donation> findDonations(@Param("search_key") String searchKey);

}
