package com.help.pit.service;

import com.help.pit.dao.LikeRepository;
import com.help.pit.entity.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService extends BaseServiceImpl{

    @Autowired
    private LikeRepository likeRepository;

    public Like save(Like like) {
        return likeRepository.save(like);
    }
}
