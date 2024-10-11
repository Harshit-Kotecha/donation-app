package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class LeaderboardPostRequestDTO {
    private Integer id;
    private Integer stars;
}
