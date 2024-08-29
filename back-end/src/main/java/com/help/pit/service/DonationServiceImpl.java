package com.help.pit.service;

import com.help.pit.dao.DonationRepository;
import com.help.pit.dao.DonationStages;
import com.help.pit.entity.Donation;
import com.help.pit.rest.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DonationServiceImpl implements DonationService {

    private DonationRepository donationRepository;

    @Override
    public List<Donation> findAll() {
        return donationRepository.findAll();
    }

    @Override
    public Donation findById(Long id) {
        Optional<Donation> result = donationRepository.findById(id);
        Donation donation;
        if (result.isPresent()) {
            donation = result.get();
        } else {
            throw new ResourceNotFoundException("Donation not found with id " + id);
        }
        return donation;
    }

    @Transactional
    @Override
    public Donation save(Donation donation) {
        return donationRepository.save(donation);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        donationRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Integer updateDonationStatus(DonationStages status, Long id) {
        return donationRepository.updateDonationStatus(status, id);
    }

    @Override
    public List<Donation> filterByName(String name) {
        return donationRepository.findByName(name);
    }
}
