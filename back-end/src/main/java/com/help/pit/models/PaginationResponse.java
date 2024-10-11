package com.help.pit.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
public class PaginationResponse<T> extends BaseResponse<T>{
    @JsonProperty("total_pages")
    private Integer totalPages;

    @JsonProperty("page_size")
    private Integer pageSize;

    @JsonProperty("total_content")
    private Long totalContent;

    public PaginationResponse(int statusCode, boolean success, String message, T data, Integer totalPages, Integer pageSize, Long totalContent) {
        super(statusCode, success, message, data);
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.totalContent = totalContent;
    }

    public PaginationResponse(Integer totalPages, Integer pageSize, Long totalContent, T data) {
        this(HttpStatus.OK.value(), true, "Request completed successfully", data, totalPages, pageSize, totalContent);
    }
}
