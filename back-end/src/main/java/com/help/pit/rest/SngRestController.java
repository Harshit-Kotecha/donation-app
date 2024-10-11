package com.help.pit.rest;

import com.help.pit.models.BaseResponse;
import com.help.pit.models.SuccessResponse;
import com.help.pit.utils.SngConstants;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = SngConstants.origins)
@RestController
public class SngRestController {

    @GetMapping("/")
    public BaseResponse<String> root() {
        return new SuccessResponse<>("Welcome to SnG: Share and Grow");
    }
}
