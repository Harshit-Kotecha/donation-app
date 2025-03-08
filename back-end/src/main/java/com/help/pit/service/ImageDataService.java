package com.help.pit.service;

import com.help.pit.dao.ImageDataRepository;
import com.help.pit.entity.ImageData;
import com.help.pit.utils.ImageUtil;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.util.Optional;

@Service
public class ImageDataService {

    @Autowired
    private ImageDataRepository imageDataRepository;

    @Transactional
    public ResponseEntity<String> uploadImage(MultipartFile file) throws IOException {
        imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes())).build());

        return ResponseEntity.ok("Image uploaded");
    }

    public ImageData getInfoByImageByName(String name) throws BadRequestException {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);

        if(dbImage.isEmpty()) {
            throw new BadRequestException("Image not found by name" + name);
        }

        return ImageData.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .imageData(ImageUtil.decompressImage(dbImage.get().getImageData()))
                .build();
    }

    public byte[] getImage(String name) throws BadRequestException {
        Optional<ImageData> imageData = imageDataRepository.findByName(name);

        if(imageData.isEmpty()) {
            throw new BadRequestException("Image not found by name" + name);
        }

        return ImageUtil.decompressImage(imageData.get().getImageData());
    }
}
