package com.help.pit.dao;

import com.help.pit.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long>, JpaSpecificationExecutor<Donation> {

    List<Donation> findAllByOrderByExpiryTimeInHours();

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET status = :status WHERE id = :id")
    Integer updateDonationStatus(@Param("status") DonationStages status, @Param("id") Long id);

    @Query("FROM Donation WHERE name LIKE %:name%")
    List<Donation> findByName(@Param("name") String name);

    @Query("FROM Donation WHERE LOWER(name) LIKE %:search_key% OR LOWER(category) LIKE %:search_key% OR LOWER(description) LIKE %:search_key% OR LOWER(region) LIKE %:search_key% OR LOWER(district) LIKE %:search_key% OR LOWER(state) LIKE %:search_key%")
    List<Donation> findDonations(@Param("search_key") String searchKey);

    @Query("SELECT DISTINCT(region) FROM Donation")
    List<String> getAllCategories();

    @Query("SELECT DISTINCT :filter FROM Donation")
    List<String> getDistinctItems(@Param("filter") String filter);

    @Query("SELECT region, state, district, category FROM Donation GROUP BY region, state, district, category")
    List<Object> getFilters();

    List<Donation> findByCategoryAndRegionAndState(String category, String region, String state);
}