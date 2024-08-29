package com.help.pit.service;

import com.help.pit.dao.DonationStages;
import com.help.pit.entity.Donation;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DonationService {
    List<Donation> findAll();

    Donation findById(Long id);

    Donation save(Donation donation);

    void deleteById(Long id);

    Integer updateDonationStatus(@Param("status") DonationStages status, @Param("id") Long id);

    List<Donation> filterByName(String name);
}
