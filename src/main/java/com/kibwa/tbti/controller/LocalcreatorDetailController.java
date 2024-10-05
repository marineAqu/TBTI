package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.DTO.ReviewDTO;
import com.kibwa.tbti.entity.InformationEntity;
import com.kibwa.tbti.principal.PrincipalDetails;
import com.kibwa.tbti.service.LocalcreatorDetailService;
import com.kibwa.tbti.service.StorageS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
    public HashMap<String, Object> localcreator_detail(@RequestParam("storeId") int store_id, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        HashMap<String, Object> response = new HashMap<>();

        LocalcreatorDTO localcreatorDTO = localcreatorDetailService.SearchByStoreId(store_id);
        localcreatorDTO.setImg(storageS3Service.getImageURL(localcreatorDTO.getStoreName(), localcreatorDTO.getHiddenCategory()));

        response.put("localcreator", localcreatorDTO);
        if(principalDetails != null) response.put("username", principalDetails.getNickName());

        return response;
    }

    @PostMapping("/api/post_review")
    public HashMap<String, Object> post_review(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                @RequestParam("storeId") int store_id,
                                               @RequestParam("reviewContent") String reviewContent,
                                               @RequestParam("starPoint") double starPoint) {

        localcreatorDetailService.postReview(store_id, reviewContent, starPoint, principalDetails.getId());

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

    @GetMapping("/api/get_review")
    public HashMap<String, Object> get_review(@RequestParam("storeId") int store_id) {
        List<ReviewDTO> reviewEntityList = localcreatorDetailService.getReview(store_id);

        HashMap<String, Object> response = new HashMap<>();
        response.put("reviewList", reviewEntityList);

        return response;
    }


    @PostMapping("/api/save_like")
    public HashMap<String, Object> save_like( @AuthenticationPrincipal PrincipalDetails principalDetails,
                                                @RequestParam("storeId") int store_id) {

        HashMap<String, Object> response = new HashMap<>();

        if(principalDetails == null) {
            response.put("status", "fail");
            response.put("message", "로그인 후 이용해주세요.");
            return response;
        }

        localcreatorDetailService.save_like(store_id, principalDetails.getId());

        response.put("status", "success");
        return response;
    }

    @GetMapping("/api/get_detail_info")
    public HashMap<String, Object> get_detail(@RequestParam("storeId") int store_id) {
        HashMap<String, Object> response = new HashMap<>();

        Optional<InformationEntity> information = localcreatorDetailService.getInfo(store_id);

        if(information.isPresent()) {
            response.put("status", "success");
            response.put("information", information.get());
        }
        else response.put("status", "fail");

        return response;
    }

}
