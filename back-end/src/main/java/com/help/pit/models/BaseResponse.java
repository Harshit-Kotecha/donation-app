package com.help.pit.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseResponse<T> {
    @JsonProperty("status_code")
    private int statusCode;
    private boolean success;
    private String message;
    private T data;
}
