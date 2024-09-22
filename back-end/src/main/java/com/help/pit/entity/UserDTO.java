package com.help.pit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @JsonProperty("email")
    private String username;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("phone_number")
    private BigInteger phoneNumber;
}

