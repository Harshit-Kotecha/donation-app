package com.help.pit.service;


import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import com.help.pit.entity.UserProjection;

import java.util.List;

public interface UserService extends BaseService {
    User register(User user);

   SecurityTokens verifyAndGenerateToken(User user);

    String generateToken(String email);

    UserProjection findByUsernameBy(String name);
}
