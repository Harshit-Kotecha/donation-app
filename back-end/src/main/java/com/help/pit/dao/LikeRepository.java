package com.help.pit.dao;

import com.help.pit.entity.Donation;
import com.help.pit.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long>, JpaSpecificationExecutor<Likes> {
    Likes findByDonationId(Long id);

    @Query("SELECT COUNT(*) FROM Likes l WHERE donationId = :id")
    Integer countLikes(Long id);

    @Modifying
    @Transactional
    void deleteByUserId(Integer id);
}
