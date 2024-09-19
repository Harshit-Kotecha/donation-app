package com.help.pit.rest;

import com.help.pit.entity.BaseResponse;
import com.help.pit.entity.SuccessResponse;
import com.help.pit.entity.User;
import com.help.pit.service.UserService;
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
        return new SuccessResponse<>(newUser);
    }

    @PostMapping("/login")
    public BaseResponse<String> login(@Valid @RequestBody User user) {
        if (user == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }

        String isVerified = userService.verify(user);
        System.out.println(isVerified + "login...................");
        return new SuccessResponse<>(isVerified);
    }
}
