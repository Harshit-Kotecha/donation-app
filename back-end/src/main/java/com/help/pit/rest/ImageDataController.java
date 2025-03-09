package com.help.pit.rest;

import com.help.pit.entity.ImageData;
import com.help.pit.service.ImageDataService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/image")
public class ImageDataController {

    @Autowired
    private ImageDataService imageDataService;

    @PostMapping()
    private ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        if (file == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No image attached");
        }
        return imageDataService.uploadImage(file);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImageByName(@PathVariable("id") Long id) throws BadRequestException {
        byte[] image = imageDataService.getImageByName(id);
        log.debug("image {}", imageDataService.getInfoByImageByName(id).getType());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);

    }
}
