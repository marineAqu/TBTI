package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.entity.ReviewEntity;
import com.kibwa.tbti.service.LocalcreatorDetailService;
import com.kibwa.tbti.service.StorageS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * 파일명: localcreatorDetailController
 * 작성자: 김도연
 * 설명: 로컬크리에이터 상세 정보 페이지 api 컨트롤러
 **/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LocalcreatorDetailController {
    private final LocalcreatorDetailService localcreatorDetailService;
    private final StorageS3Service storageS3Service;

    @GetMapping("/api/localcreator_detail")
    public HashMap<String, Object> localcreator_detail(@RequestParam("storeId") int store_id) {

        LocalcreatorDTO localcreatorDTO = localcreatorDetailService.SearchByStoreId(store_id);
        System.out.print("localcreator_detail get api controller:");
        System.out.print(localcreatorDTO);

        localcreatorDTO.setImg(storageS3Service.getImageURL(localcreatorDTO.getStoreName(), localcreatorDTO.getHiddenCategory()));

        HashMap<String, Object> response = new HashMap<>();
        response.put("localcreator", localcreatorDTO);

        return response;
    }

    @PostMapping("/api/post_review")
    public HashMap<String, Object> post_review( //@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestParam("storeId") int store_id,
                                               @RequestParam("reviewContent") String reviewContent,
                                               @RequestParam("starPoint") double starPoint) {

        //TODO: 로그인, 회원가입 기능 추가 후 AuthenticationPrincipal 주석 해제 및 userDetails.getUsername()으로 사용자 아이디 가져오기
        localcreatorDetailService.postReview(store_id, reviewContent, starPoint);

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

    @GetMapping("/api/get_review")
    public HashMap<String, Object> get_review(@RequestParam("storeId") int store_id) {
        List<ReviewEntity> reviewEntityList = localcreatorDetailService.getReview(store_id);

        System.out.print("get_review get api controller:"+reviewEntityList.toString());
        HashMap<String, Object> response = new HashMap<>();
        response.put("reviewEntityList", reviewEntityList);

        return response;
    }


    @PostMapping("/api/save_like")
    public HashMap<String, Object> save_like( //@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestParam("storeId") int store_id) {

        //TODO: 로그인, 회원가입 기능 추가 후 AuthenticationPrincipal 주석 해제 및 userDetails.getUsername()으로 사용자 아이디 가져오기
        localcreatorDetailService.save_like(store_id);

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

}
