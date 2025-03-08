package com.help.pit.rest;

import com.help.pit.service.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageDataController {

    @Autowired
    private ImageDataService imageDataService;

    @PostMapping()
    private ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        if(file == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No image attached");
        }
        return imageDataService.uploadImage(file);
    }
}
