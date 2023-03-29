package com.example.server.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.model.Post;
import com.example.server.service.FileUploadService;
import com.example.server.service.S3Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
public class FileUploadController {
    
    @Autowired
    S3Service s3Svc;

    @Autowired
    FileUploadService fUSvc;
    private static final String BASE64_PREFIX_DECODER = "data:image/png;base64,";

    @PostMapping(path="/upload-ng", consumes=MediaType.MULTIPART_FORM_DATA_VALUE
                                , produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin(origins = "*")
    // MultipartFile is the object, title and complain are the textbox 
    public ResponseEntity<String> upload(@RequestPart MultipartFile imageFile,
                                        @RequestPart String title,
                                        @RequestPart String complain) throws SQLException{
        String key;
        JsonObject jsonPayload = null;
        System.out.printf("title: %s", title);
        System.out.printf("complain: %s", complain);
        
        try {
        // To DO database
        key = this.s3Svc.upload(imageFile);
        // To mySQL database
        fUSvc.uploadBlob(imageFile, title, complain);

        jsonPayload = Json.createObjectBuilder()
            .add("image-key", key)
            .build();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(jsonPayload.toString());
    }

    @PostMapping(path="/upload-tf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadTF(@RequestPart MultipartFile myfile, @RequestPart String name,
        Model model){
        String key = "";
        try {
            key = s3Svc.upload(myfile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        model.addAttribute("name", name);
        model.addAttribute("file", myfile);
        model.addAttribute("key", key);
        
        return "upload";
    }

    // @GetMapping(path="/get-image/{postId}")
    // public String retrieveImage(@PathVariable Integer postId, Model model){
    //     Optional<Post> opt= fUSvc.getPostById(postId);
    //     Post p = opt.get();
    //     String encodedString = Base64.getEncoder().encodeToString(p.getImage());
    //     model.addAttribute("title", p.getTitle());
    //     model.addAttribute("complain", p.getComplain());
    //     model.addAttribute("file", BASE64_PREFIX_DECODER + encodedString);
    //     return "blob";
    // }

    @GetMapping(path="/get-image/{postId}")
    @CrossOrigin()
    public ResponseEntity<String> retrieveImage(@PathVariable Integer postId, Model model){
        Optional<Post> opt= fUSvc.getPostById(postId);
        Post p = opt.get();
        String encodedString = Base64.getEncoder().encodeToString(p.getImage());
        JsonObject payload = Json.createObjectBuilder()
            .add("image", BASE64_PREFIX_DECODER + encodedString)
            .build();
        return ResponseEntity.ok(payload.toString());
    }
}
