package com.help.pit.service;


import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import jakarta.validation.Valid;

public interface UserService {
    public User register(User user);

   public SecurityTokens verify(User user);
}
