package com.example.server.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.model.Post;
import com.example.server.repository.FileUploadRepository;

@Service
public class FileUploadService {
    
    @Autowired
    FileUploadRepository fURepo;

    public void uploadBlob(MultipartFile file, String title, String complain) 
            throws SQLException, IOException  {
        fURepo.uploadBlob(file, title, complain);
    }

    public Optional<Post> getPostById(Integer postId){
        return fURepo.getPostById(postId);
    }
}
