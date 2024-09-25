package com.help.pit.dao;

import com.help.pit.entity.Donation;
import com.help.pit.utils.DonationStage;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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

    List<Donation> findByNameAndIsDeletedFalse(@Param("name") String name);

    Optional<Donation> findByIdAndIsDeletedFalse(Long id);

    @Query("FROM Donation WHERE isDeleted = FALSE AND (LOWER(name) LIKE %:search_key% OR LOWER(category) LIKE %:search_key% OR LOWER(description) LIKE %:search_key% OR LOWER(region) LIKE %:search_key% OR LOWER(district) LIKE %:search_key% OR LOWER(state) LIKE %:search_key% OR LOWER(address) LIKE %:search_key% OR LOWER(description) LIKE %:search_key%)")
    List<Donation> findDonations(@Param("search_key") String searchKey);

    @Query("SELECT DISTINCT(category) FROM Donation WHERE isDeleted = false")
    List<String> getAllCategories();

    @Query("SELECT createdBy FROM Donation where id = :id")
    String findCreatedBy(Long id);

    @Transactional
    @Modifying
    @Query("""
            UPDATE Donation
            SET
            	isDeleted = TRUE
            WHERE
            	id = :id
            	AND createdBy = :user_id
            """)
    Integer softDeleteDonation(@Param("user_id") Integer userId, @Param("id") Long donationId);

    List<Donation> findByCreatedBy(Integer createdBy);
}