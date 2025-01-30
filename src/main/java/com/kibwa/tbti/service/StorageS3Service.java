package com.kibwa.tbti.service;

import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URL;

/**
 * 파일명: StorageS3Service
 * 작성자: 김도연
 * 리눅스 디렉터리 반환 메소드 작성자: 조수현
 * 설명: AWS S3 스토리지 서비스> 리눅스 디렉터리 > AWS S3 스토리지로 변경
 **/

@Service
@RequiredArgsConstructor //AmazonS3 s3Client 생성자 주입
public class StorageS3Service {
    private final AmazonS3 s3Client;

    /** AWS 사용 시 사용한 메소드 주석처리 **/
    /*private final AmazonS3 s3Client;

    public String[] getImageURL(String imgName, char hiddenCategory) {
        String[] imgList = new String[3];

        *//*
        if(hiddenCategory == '1') category = "nowlocal/";
        else if(hiddenCategory == '2') category = "kstartup/";
        else if(hiddenCategory == '3') category = "kstartup/";
*//*

        URL url = s3Client.getUrl("tbti-s3-image", (imgName+"_1.jpg"));
        imgList[0] = ""+url;

        url = s3Client.getUrl("tbti-s3-image", (imgName+"_2.jpg"));
        imgList[1] = ""+url;

        url = s3Client.getUrl("tbti-s3-image", (imgName+"_3.jpg"));
        imgList[2] = ""+url;

        return imgList;
    }*/

    // AWS S3 대신 로컬 파일 경로를 반환하는 방식으로 변경
    /*public String[] getImageURL(String imgName) {
        String[] imgList = new String[3];

        // 로컬 파일 시스템 경로 설정
        String basePath = "http://223.195.109.34/images/"; // 로컬 이미지 경로

        // 이미지 파일 경로 설정
        imgList[0] = basePath + imgName + "_1.jpg";
        imgList[1] = basePath + imgName + "_2.jpg";
        imgList[2] = basePath + imgName + "_3.jpg";

        return imgList;
    }
     */

    public String[] getImageURL(String imgName) {
        String[] imgList = new String[3];

        URL url = s3Client.getUrl("tbti-img", (imgName+"_1.jpg"));
        imgList[0] = ""+url;

        url = s3Client.getUrl("tbti-img", (imgName+"_2.jpg"));
        imgList[1] = ""+url;

        url = s3Client.getUrl("tbti-img", (imgName+"_3.jpg"));
        imgList[2] = ""+url;

        return imgList;
    }
}
