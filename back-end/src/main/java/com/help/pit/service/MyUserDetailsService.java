package com.help.pit.service;

import com.help.pit.dao.UserRepository;
import com.help.pit.entity.User;
import com.help.pit.entity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if(user == null) {
            System.out.println("User not found --->" + email);
            throw new UsernameNotFoundException("user not found");
        }

        return new UserPrincipal(user);
    }
}
