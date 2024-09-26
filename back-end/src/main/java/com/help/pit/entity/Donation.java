package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.help.pit.utils.DonationStage;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.math.BigInteger;
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
    @Min(18)
    @Max(120)
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
    private DonationStage status = DonationStage.open;

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
    private Integer likes = 0;

    @Column(name = "has_expiry")
    @JsonProperty("has_expiry")
    private Boolean hasExpiry;

    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreationTimestamp
    private OffsetDateTime createdAt;

    @Column(name = "expires_at")
    @JsonProperty("expires_at")
    private OffsetDateTime expiresAt;

//    @Column(name = "created_by", updatable = false, nullable = false)
//    @JsonProperty(value = "created_by", access = JsonProperty.Access.READ_ONLY)
//    @JsonIgnore
//    private Integer createdBy;

    @Column(name = "postal_name")
    @JsonProperty("postal_name")
    @NotBlank(message = "Postal name is mandatory")
    private String postalName;

    @Column(name = "region")
    @NotBlank(message = "region is mandatory")
    private String region;

    @Column(name = "district")
    @NotBlank(message = "district is mandatory")
    private String district;

    @Column(name = "state")
    @NotBlank(message = "state is mandatory")
    private String state;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")
    @JsonIgnore
    private Boolean isDeleted = false;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", updatable = false, nullable = false)
    @JsonIgnore
    private User user;

//    @Column(name = "user_id", insertable = false, updatable = false)
//    private Integer userId;
}
