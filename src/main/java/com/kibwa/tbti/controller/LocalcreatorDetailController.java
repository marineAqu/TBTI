package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.service.LocalcreatorDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
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
    @GetMapping("/api/localcreator_detail")
    public HashMap<String, Object> localcreator_detail(@RequestParam("storeId") int store_id) {

        LocalcreatorDTO localcreatorDTO = localcreatorDetailService.SearchByStoreId(store_id);
        System.out.print("localcreator_detail get api controller:");
        System.out.print(localcreatorDTO);

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


        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

}
