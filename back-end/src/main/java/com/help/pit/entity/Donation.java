package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.help.pit.dao.DonationStages;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

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

    @Column(name = "expiry_time", columnDefinition = "int default 0")
    @JsonProperty("expiry_time_in_hours")
    @Min(0)
    private Integer expiryTimeInHours;

    @Column(name = "category")
    @NotBlank(message = "Category is mandatory")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "donation_stages default 'open'")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private DonationStages status;

    @Column(name = "images")
    private List<String> images;

    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    @Min(1000000000)
    @Max(999999999)
    private  Long phoneNumber;

    @Column(name = "pin_code")
    @JsonProperty("pin_code")
    @Min(100000)
    @Max(999999)
    private Long pinCode;

    @Column(name = "likes")
    private  Integer likes;
}
