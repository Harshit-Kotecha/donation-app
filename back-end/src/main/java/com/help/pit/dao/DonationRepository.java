package com.help.pit.dao;

import com.help.pit.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Donation SET status = :status WHERE id = :id")
    Integer updateDonationStatus(@Param("status") DonationStages status, @Param("id") Long id);

    @Query("FROM Donation WHERE name LIKE %:name%")
    List<Donation> findByName(@Param("name") String name);

}