package com.help.pit.service;

import com.help.pit.dao.UserRepository;
import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import com.help.pit.entity.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    @Override
    public UserDTO findByUsernameBy(String name) {
        return userRepository.findUserDTOByUsername(name);
    }

    @Override
    public SecurityTokens verifyAndGenerateToken(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            String accessToken = generateToken(user.getUsername());
            return new SecurityTokens(accessToken);
        } else {
            throw new UsernameNotFoundException("email or password is not valid");
        }
    }
}
