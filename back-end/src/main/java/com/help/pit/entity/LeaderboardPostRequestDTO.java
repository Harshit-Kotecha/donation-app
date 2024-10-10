package com.help.pit.entity;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardPostRequestDTO {
    private Integer id;
    private Integer stars;
}
