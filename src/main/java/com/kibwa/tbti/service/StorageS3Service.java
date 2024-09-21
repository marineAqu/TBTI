package com.kibwa.tbti.service;

import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URL;

/**
 * 파일명: StorageS3Service
 * 작성자: 김도연
 * 설명: AWS S3 스토리지 서비스
 **/

@Service
@RequiredArgsConstructor
public class StorageS3Service {
    private final AmazonS3 s3Client;

    public String[] getImageURL(String imgName, char hiddenCategory) {
        String[] imgList = new String[3];

        /*
        if(hiddenCategory == '1') category = "nowlocal/";
        else if(hiddenCategory == '2') category = "kstartup/";
        else if(hiddenCategory == '3') category = "kstartup/";
*/

        URL url = s3Client.getUrl("tbti-s3-image", (imgName+"_1.jpg"));
        imgList[0] = ""+url;

        url = s3Client.getUrl("tbti-s3-image", (imgName+"_2.jpg"));
        imgList[1] = ""+url;

        url = s3Client.getUrl("tbti-s3-image", (imgName+"_3.jpg"));
        imgList[2] = ""+url;

        return imgList;
    }
}
