package com.help.pit.service;


import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;

public interface UserService {
    User register(User user);

   SecurityTokens verifyAndGenerateToken(User user);

    String generateToken(String email);
}
