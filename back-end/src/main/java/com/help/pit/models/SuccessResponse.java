package com.help.pit.models;

import org.springframework.http.HttpStatus;

public class SuccessResponse<T> extends BaseResponse<T> {
    public SuccessResponse(T data, String message, int statusCode) {
        super.setStatusCode(statusCode);
        super.setSuccess(true);
        super.setMessage(message);
        super.setData(data);
    }

    public SuccessResponse(T data, String message) {
        this(data, message, HttpStatus.OK.value());
    }

    public SuccessResponse(T data) {
        this(data, "Request completed successfully");
    }

    public SuccessResponse() {
        this(null);
    }
}
