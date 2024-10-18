package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.help.pit.utils.DonationStage;
import com.help.pit.utils.IntermediateDonationStage;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import org.hibernate.type.descriptor.jdbc.TinyIntJdbcType;

import java.math.BigInteger;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedEntityGraph(name = "Donation.users", attributeNodes = {@NamedAttributeNode("receiverUser"), @NamedAttributeNode("user")})
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

    @Enumerated(EnumType.STRING)
    @Column(name = "intermediate_status")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @JsonIgnore
    private IntermediateDonationStage intermediateStatus;

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

    @Column(name = "likes", updatable = false)
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

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_user_id", referencedColumnName = "id")
    @JsonIgnore
    private User receiverUser;

    @Transient
    @JsonProperty("has_user_liked")
    private Boolean hasUserLiked;
}
