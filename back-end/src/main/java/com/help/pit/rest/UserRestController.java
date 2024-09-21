package com.help.pit.rest;

import com.help.pit.entity.*;
import com.help.pit.service.UserService;
import com.help.pit.utils.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public BaseResponse<User> register(@Valid @RequestBody User user) {
        if (user == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }
        String unencryptedPassword = user.getPassword();
        user.setPassword(bCryptPasswordEncoder.encode(unencryptedPassword));
        User newUser = userService.register(user);
        newUser.setPassword(unencryptedPassword);
        newUser.setAccessToken(userService.generateToken(newUser.getUsername()));
        return new SuccessResponse<>(newUser);
    }

    @PostMapping("/login")
    public BaseResponse<SecurityTokens> login(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }

        return new SuccessResponse<>(userService.verifyAndGenerateToken(user));
    }
}
