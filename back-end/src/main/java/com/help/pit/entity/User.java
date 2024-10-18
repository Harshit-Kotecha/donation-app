package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email", unique = true)
    @NotBlank(message = "email is mandatory")
    @JsonProperty("email")
    private String username;

    @Column(name = "full_name")
    @NotBlank(message = "name is mandatory")
    @JsonProperty("full_name")
    private String fullName;

    @Column(name = "password")
    @NotBlank(message = "password is mandatory")
    private String password;

    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    @NotNull(message = "Phone number is mandatory")
    @DecimalMax(value = "9999999999", message = "Phone number must be 10 digits long")
    @DecimalMin(value = "1000000000", message = "Phone number must be 10 digits long")
    private BigInteger phoneNumber;

    @Transient
    @JsonProperty("access_token")
    private String accessToken;
}
