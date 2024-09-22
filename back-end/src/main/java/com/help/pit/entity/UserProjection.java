package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigInteger;

public interface UserProjection {
    @JsonProperty(namespace = "full_name")
    String getFullName();

    BigInteger getPhoneNumber();
}
