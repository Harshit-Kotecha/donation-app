package com.help.pit.service;

public interface BaseService {
    String extractUsername(String bearerToken);

    Integer extractUserId(String bearerToken);
}
