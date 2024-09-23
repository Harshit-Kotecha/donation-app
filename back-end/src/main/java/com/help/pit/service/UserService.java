package com.help.pit.service;


import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;

public interface UserService extends BaseService {
    User register(User user);

   SecurityTokens verifyAndGenerateToken(User user);

    String generateToken(User user);

    UserDTO getUserById(Integer id);

    Integer getUserId(String username);
}
