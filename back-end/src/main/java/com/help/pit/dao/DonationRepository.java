package com.help.pit.dao;

import com.help.pit.entity.AllUsersDTO;
import com.help.pit.entity.Donation;
import com.help.pit.entity.User;
import com.help.pit.utils.DonationStage;
import com.help.pit.utils.IntermediateDonationStage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long>, JpaSpecificationExecutor<Donation> {

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET status = :status WHERE id = :id")
    Integer updateDonationStatus(@Param("status") DonationStage status, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET intermediateStatus = :status WHERE id = :id")
    Integer updateInterDonationStatus(@Param("status") IntermediateDonationStage intermediateStatus, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET status = :status, receiverUser = :receiver_user WHERE id = :id")
    Integer processDonation(@Param("status") DonationStage status, @Param("id") Long donationId, @Param("receiver_user") User receiverUser);

    List<Donation> findByNameAndIsDeletedFalse(@Param("name") String name);

    Optional<Donation> findByIdAndIsDeletedFalse(Long id);

    @Query("FROM Donation WHERE isDeleted = FALSE AND (LOWER(name) LIKE %:search_key% OR LOWER(category) LIKE %:search_key% OR LOWER(description) LIKE %:search_key% OR LOWER(region) LIKE %:search_key% OR LOWER(district) LIKE %:search_key% OR LOWER(state) LIKE %:search_key% OR LOWER(address) LIKE %:search_key% OR LOWER(description) LIKE %:search_key%)")
    Page<Donation> findDonations(@Param("search_key") String searchKey, Pageable pageable);

    @Query("SELECT DISTINCT(category) FROM Donation WHERE isDeleted = false")
    List<String> getAllCategories();

    @Transactional
    @Modifying
    @Query("""
            UPDATE Donation
            SET
            	isDeleted = TRUE,
            	receiverUser = null
            WHERE
            	id = :id
            	AND user.id = :user_id
            """)
    Integer softDeleteDonation(@Param("user_id") Integer userId, @Param("id") Long donationId);

    Page<Donation> findByUserAndIsDeletedFalseOrderById(User user, Pageable pageable);

    @EntityGraph(attributePaths = {"receiverUser", "user"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("SELECT new com.help.pit.entity.AllUsersDTO(d.receiverUser, d.user, d.intermediateStatus, d.status) " +
            "FROM Donation d " +
            "LEFT JOIN d.receiverUser ru " +  // LEFT JOIN for receiverUser
            "JOIN d.user u " +               // Regular JOIN for user
            "WHERE d.id = :id AND d.isDeleted = false")
    AllUsersDTO findUsersByDonationId(@Param("id") Long id);


    List<Donation> findAllByReceiverUserAndStatus(User user, DonationStage stage);

    @Modifying
    @Transactional
    @Query("""
            DELETE FROM Donation d
            WHERE
            	d.user = :user
            """)
    void deleteDonationsByUser(User user);

    @Modifying
    @Transactional
    @Query("""
            UPDATE Donation d
                SET d.receiverUser = null,
                    d.intermediateStatus = null,
                    d.status = :stage
            WHERE
                d.isDeleted = false
            AND
            	d.receiverUser = :user
            AND
                d.status != :closed
            """)
    void updateReceiverUser(User user, DonationStage stage, DonationStage closed);

    List<Donation> findByUser(User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM Donation WHERE user = :user")
    void deleteAllByUser(User user);
}