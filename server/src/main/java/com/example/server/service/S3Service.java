package com.example.server.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    @Value("${do.storage.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public String upload(MultipartFile file) throws IOException{
        // User data
        Map<String, String> userDate = new HashMap<>();
        userDate.put("name", "Kenneth");
        userDate.put("uploadTime", new Date().toString());
        userDate.put("originalFileName", file.getOriginalFilename());
        
        // Metadata 
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        metadata.setUserMetadata(userDate);

        String key = UUID.randomUUID().toString().substring(0,8);
 
        StringTokenizer tk = new StringTokenizer(file.getOriginalFilename(), ".");
        
        int count = 0;
        String fileNameExt = "";
        String finalFileUpload = "";
        while(tk.hasMoreTokens()){
            if (count == 1){
                fileNameExt = tk.nextToken();
                break;
            }
                count++;
            }
        // Check if its a blob
        if(fileNameExt.equals("blob"))
        finalFileUpload = fileNameExt + ".png";
        System.out.println(finalFileUpload);
        
        // Need transporter object (putRequest) to transfer to DigitalOcean 
        PutObjectRequest putRequest = 
            new PutObjectRequest(
            bucketName, 
            "myobject/%s.%s".formatted(key, finalFileUpload), 
            file.getInputStream(), 
            metadata
            );
        
        // Define access control rights to : PublicRead (anyone with internet can access)
        putRequest.withCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(putRequest);
        
        System.out.println(key);
        
        return "myobject/%s.%s".formatted(key, finalFileUpload);
    }
    
}
