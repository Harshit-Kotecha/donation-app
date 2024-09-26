package com.help.pit.service;

import com.help.pit.entity.User;
import com.help.pit.utils.DonationStage;
import com.help.pit.entity.Donation;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DonationService extends BaseService{
    List<Donation> findAll(Specification<Donation> specification);

    List<Donation> findAll();

    Donation findById(Long id);

    Donation save(Donation donation);

    void deleteById(Long id);

    Integer updateDonationStatus(@Param("status") DonationStage status, @Param("id") Long id);

    List<Donation> filterByName(String name);

    List<String> getAllCategories();

    List<Donation> findDonations(@Param("search_key") String searchKey);

    Integer softDeleteDonation(@Param("user_id") Integer userId, @Param("id") Long id);

    List<Donation> findByUser(User user);
}
