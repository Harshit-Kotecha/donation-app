package com.help.pit.rest;

import com.help.pit.entity.*;
import com.help.pit.service.UserService;
import com.help.pit.utils.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public BaseResponse<User> register(@Valid @RequestBody User user) throws BadRequestException {
        if (user == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }
        String unencryptedPassword = user.getPassword();
        user.setPassword(bCryptPasswordEncoder.encode(unencryptedPassword));

        // Check if user already exists or not
        Integer k = userService.getUserId(user.getUsername());
        if (k != null) {
            throw new BadRequestException("User already exists");
        }

        User newUser = userService.register(user);
        newUser.setPassword(unencryptedPassword);
        newUser.setAccessToken(userService.generateToken(newUser));
        return new SuccessResponse<>(newUser);
    }

    @PostMapping("/login")
    public BaseResponse<SecurityTokens> login(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null) {
            throw new ResourceNotFoundException("Request body is mandatory");
        }
        Integer id = userService.getUserId(user.getUsername());
        user.setId(id);
        return new SuccessResponse<>(userService.verifyAndGenerateToken(user));
    }

    @GetMapping("/my-profile")
    public BaseResponse<UserDTO> getUserData(@RequestHeader("Authorization") String token) throws Exception {
        Integer id = userService.extractUserId(token);
        if (id == null) {
            throw new Exception("Please log in again");
        }
        return new SuccessResponse<>(userService.getUserById(id));
    }
}
