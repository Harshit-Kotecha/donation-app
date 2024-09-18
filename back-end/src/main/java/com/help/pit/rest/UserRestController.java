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

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public BaseResponse<User> register(@Valid @RequestBody User user) {
        if (user == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return new SuccessResponse<>(userService.register(user));
    }
}
