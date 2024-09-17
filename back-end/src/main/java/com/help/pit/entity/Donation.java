package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.help.pit.dao.DonationStage;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.hibernate.type.descriptor.jdbc.TimestampWithTimeZoneJdbcType;

import java.math.BigInteger;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;


@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Column(name = "age")
    @NotNull
    @Min(18) @Max(120)
    private Integer age;

    @Column(name = "address")
    @NotBlank(message = "Address is mandatory")
    private String address;

    @Column(name = "description")
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Column(name = "category")
    @NotBlank(message = "Category is mandatory")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "donation_stages default 'open'")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private DonationStage status;

    @Column(name = "images")
    private List<String> images;

    @Column(name = "email")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    @DecimalMax(value = "9999999999", message = "Phone number must be 10 digits long")
    @DecimalMin(value = "1000000000", message = "Phone number must be 10 digits long")
    private BigInteger phoneNumber;

    @Column(name = "pin_code")
    @JsonProperty("pin_code")
    @Min(100000)
    @Max(999999)
    @NotNull(message = "PinCode is mandatory")
    private Long pinCode;

    @Column(name = "likes")
    private  Integer likes = 0;

    @Column(name = "has_expiry")
    @JsonProperty("has_expiry")
    private Boolean hasExpiry;

    @Column(name = "created_at")
    @JsonProperty("created_at")
    private Instant createdAt;

    @Column(name = "expires_at")
    @JsonProperty("expires_at")
    private Instant expiresAt;

    @Column(name = "postal_name")
    @JsonProperty("postal_name")
    @NotBlank(message = "Postal name is mandatory")
    private String postalName;

    @Column(name = "region")
    private  String region;

    @Column(name = "district")
    private String district;

    @Column(name = "state")
    private  String state;
}
