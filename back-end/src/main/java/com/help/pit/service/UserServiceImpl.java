package com.help.pit.service;

import com.help.pit.dao.UserRepository;
import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;
import com.help.pit.utils.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl extends BaseServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Integer id) {
        Optional<User> result = userRepository.findById(id);
        if(result.isPresent()) {
            return result.get();
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    @Override
    public String generateToken(User user) {
        return jwtService.generateToken(user);
    }

    @Override
    public UserDTO getUserById(Integer id) {
        return userRepository.findUserDTOById(id);
    }

    @Override
    public Integer getUserId(String username) {
        return userRepository.getUserId(username);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public SecurityTokens verifyAndGenerateToken(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            String accessToken = jwtService.generateToken(user);
            System.out.println(jwtService.extractKey(accessToken, "user_id", Integer.class) + "--------------------token");
            return new SecurityTokens(accessToken);
        } else {
            throw new UsernameNotFoundException("email or password is not valid");
        }
    }
}
