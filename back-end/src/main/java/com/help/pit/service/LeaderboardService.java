package com.help.pit.service;

import com.help.pit.dao.LeaderboardRepository;
import com.help.pit.entity.Leaderboard;
import com.help.pit.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LeaderboardService extends BaseServiceImpl {
    @Autowired
    private LeaderboardRepository leaderboardRepository;

    @Transactional
    public Leaderboard save(Leaderboard leaderboard) {
        return leaderboardRepository.save(leaderboard);
    }

    public Leaderboard findById(Long id) {
        Optional<Leaderboard> leaderboard  = leaderboardRepository.findById(id);
        return leaderboard.orElse(null);
    }

    @Transactional
    public Integer updateScore(Integer score, Long id) {
        return leaderboardRepository.updateScore(score, id);
    }

    public Leaderboard findByUser(User user) {
        return leaderboardRepository.findByUser(user);
    }
}
