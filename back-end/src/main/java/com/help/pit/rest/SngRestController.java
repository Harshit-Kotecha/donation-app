package com.help.pit.rest;

import com.help.pit.entity.BaseResponse;
import com.help.pit.entity.SuccessResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SngRestController {

    @GetMapping("/")
    public BaseResponse<String> root() {
        return new SuccessResponse<>("Welcome to SnG: Share and Grow");
    }
}
