package com.help.pit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public abstract class BaseResponse<T> {
    @JsonProperty("status_code")
    private int statusCode;
    private boolean success;
    private String message;
    private T data;
}
