package com.help.pit.service;


import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;

import java.util.Optional;

public interface UserService extends BaseService {
    User register(User user);

    User findById(Integer id);

   SecurityTokens verifyAndGenerateToken(User user);

    String generateToken(User user);

    UserDTO getUserById(Integer id);

    Integer getUserId(String username);

    void deleteById(Integer id);
}
