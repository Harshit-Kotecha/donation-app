package com.help.pit.service;

import com.help.pit.dao.UserRepository;
import com.help.pit.entity.SecurityTokens;
import com.help.pit.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

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
    public SecurityTokens verify(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            String accessToken = jwtService.generateToken(user.getName(), user.getId());
            return new SecurityTokens(accessToken);
        } else {
            throw new UsernameNotFoundException("email or password is not valid");
        }
    }
}
