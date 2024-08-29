package com.help.pit.entity;

import org.springframework.http.HttpStatus;

public class FailureResponse<T> extends BaseResponse<T> {

    public FailureResponse(T data, String message, int statusCode) {
        super.setStatusCode(statusCode);
        super.setSuccess(false);
        super.setMessage(message);
        super.setData(data);
    }

    public FailureResponse(T data, int statusCode) {
        this(data, "Request failed", statusCode);
    }

    public FailureResponse(int statusCode) {
        this(null, statusCode);
    }
}
