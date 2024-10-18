package com.help.pit.service;

import com.help.pit.entity.AllUsersDTO;
import com.help.pit.entity.User;
import com.help.pit.utils.DonationStage;
import com.help.pit.entity.Donation;
import com.help.pit.utils.IntermediateDonationStage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface DonationService extends BaseService{
    Page<Donation> findAll(Specification<Donation> specification, Pageable pageable);

    List<Donation> findAll();

    Donation findById(Long id);

    Donation save(Donation donation);

    void deleteById(Long id);

    Integer updateDonationStatus(@Param("status") DonationStage status, @Param("id") Long id);

    Integer processDonation(@Param("status") DonationStage status, @Param("id") Long donationId, @Param("receiver_user") User receiverUser);

    List<Donation> filterByName(String name);

    List<String> getAllCategories();

    Page<Donation> findDonations(String searchKey, Pageable pageable);

    Integer softDeleteDonation(@Param("user_id") Integer userId, @Param("id") Long id);

    Page<Donation> findByUser(User user, Pageable pageable);

    AllUsersDTO findUsersByDonationId(@Param("id") Long id);

    Integer updateInterDonationStatus(@Param("status") IntermediateDonationStage intermediateStatus, @Param("id") Long id);

    List<Donation> findByReceiverUser(User user);

    void deleteDonationsByUser(User user);
}
