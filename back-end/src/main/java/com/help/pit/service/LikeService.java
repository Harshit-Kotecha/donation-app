package com.help.pit.service;

import com.help.pit.dao.LikeRepository;
import com.help.pit.entity.Donation;
import com.help.pit.entity.Likes;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService extends BaseServiceImpl {

    @Autowired
    private LikeRepository likeRepository;

    Likes save(Likes likes) {
        return likeRepository.save(likes);
    }

    @Transactional
    public String updateLikes(Likes likes) {
        String msg;

        Optional<Likes> userLiked = getUserLiked(likes);
        if (userLiked.isPresent()) {
            likeRepository.delete(userLiked.get());
            msg = "Donation disliked successfully!";
        } else {
            likeRepository.save(likes);
            msg = "Donation liked successfully";
        }

        return msg;
    }

    public Boolean hasUserLiked(Likes likes) {
        return getUserLiked(likes).isPresent();
    }

    public Integer likesCount(Long id) {
        return likeRepository.countLikes(id);
    }

    public void deleteLikesByUser(Integer id) {
        likeRepository.deleteByUserId(id);
    }

    private Optional<Likes> getUserLiked(Likes likes) {
        Specification<Likes> specification = ((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Predicate predicate = cb.equal(root.get("donationId"), likes.getDonationId());
            predicates.add(predicate);

            predicate = cb.equal(root.get("userId"), likes.getUserId());
            predicates.add(predicate);

            return cb.and(predicates.toArray(new Predicate[0]));
        });

        return likeRepository.findOne(specification);
    }
}
