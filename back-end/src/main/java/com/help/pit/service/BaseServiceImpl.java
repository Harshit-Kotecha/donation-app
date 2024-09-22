package com.help.pit.service;

import org.springframework.beans.factory.annotation.Autowired;

public class BaseServiceImpl implements BaseService{
    @Autowired
    private JwtService jwtService;

    @Override
    public String extractUsername(String bearerToken) {
        String token = bearerToken.substring(7);
        return jwtService.extractUsername(token);
    }
}
