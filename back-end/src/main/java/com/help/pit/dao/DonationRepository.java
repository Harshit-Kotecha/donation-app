package com.help.pit.dao;

import com.help.pit.entity.Donation;
import com.help.pit.models.DonationFilters;
import com.help.pit.models.Filters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET status = :status WHERE id = :id")
    Integer updateDonationStatus(@Param("status") DonationStages status, @Param("id") Long id);

    @Query("FROM Donation WHERE name LIKE %:name%")
    List<Donation> findByName(@Param("name") String name);

    @Query("SELECT DISTINCT(region) FROM Donation")
    List<String> getAllCategories();

//    @Query("SELECT DISTINCT :region FROM Donation")
//    List<String> getDistinctItems(String filter);

    @Query("SELECT region, state, district, category FROM Donation GROUP BY region, state, district, category")
    List<Object> getFilters();
}