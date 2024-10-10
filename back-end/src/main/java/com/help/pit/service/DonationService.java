package com.help.pit.service;

import com.help.pit.entity.AllUsersDTO;
import com.help.pit.entity.User;
import com.help.pit.utils.DonationStage;
import com.help.pit.entity.Donation;
import com.help.pit.utils.IntermediateDonationStage;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface DonationService extends BaseService{
    List<Donation> findAll(Specification<Donation> specification);

    List<Donation> findAll();

    Donation findById(Long id);

    Donation save(Donation donation);

    void deleteById(Long id);

    Integer updateDonationStatus(@Param("status") DonationStage status, @Param("id") Long id);

    Integer processDonation(@Param("status") DonationStage status, @Param("id") Long donationId, @Param("receiver_user") User receiverUser);

    List<Donation> filterByName(String name);

    List<String> getAllCategories();

    List<Donation> findDonations(@Param("search_key") String searchKey);

    Integer softDeleteDonation(@Param("user_id") Integer userId, @Param("id") Long id);

    List<Donation> findByUser(User user);

    AllUsersDTO findUsersByDonationId(@Param("id") Long id);

    Integer updateUserLiked(@Param("id") Long donationId, @Param("userLiked") Set<User> userLiked);

    Set<User> getUserLiked(@Param("id") Long donationId);

    Integer updateInterDonationStatus(@Param("status") IntermediateDonationStage intermediateStatus, @Param("id") Long id);
}
