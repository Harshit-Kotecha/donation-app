package com.help.pit.dao;

import com.help.pit.entity.Leaderboard;
import com.help.pit.entity.LeaderboardDTO;
import com.help.pit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Leaderboard SET score = :score WHERE id = :id")
    Integer updateScore(Integer score, Integer id);

    Leaderboard findByUser(User user);

    @Query("""
             SELECT new com.help.pit.entity.LeaderboardDTO(l.id, u.fullName, l.score)
             FROM Leaderboard l
             JOIN l.user u
             ORDER BY l.score DESC
            """)
    List<LeaderboardDTO> getAll();

    @Modifying
    @Transactional
    void deleteByUser(User user);
}
