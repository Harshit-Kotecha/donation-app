package com.help.pit.dao;

import com.help.pit.entity.Leaderboard;
import com.help.pit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Leaderboard SET score = :score WHERE id = :id")
    Integer updateScore(Integer score, Long id);

    Leaderboard findByUser(User user);
}
