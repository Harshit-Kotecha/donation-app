package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaderboardDTO {
    private Integer id;

    @JsonProperty("full_name")
    private String fullName;

    private Integer score;
}
