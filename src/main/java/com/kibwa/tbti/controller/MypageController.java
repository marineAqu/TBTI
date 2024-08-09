package com.kibwa.tbti.controller;

import com.kibwa.tbti.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * 파일명: MypageController
 * 작성자: 김도연
 * 설명: 마이페이지 api 컨트롤러
 **/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MypageController {
    private final MypageService mypageService;
    @GetMapping("/api/myPage")
    public HashMap<String, Object> getMyPage(
            //@AuthenticationPrincipal UserDetails userDetails
    ) {
        return mypageService.getMyPage();
    }

    @PostMapping("/api/delete_review")
    public HashMap<String, Object> deleteReview(@RequestParam("reviewId") int reviewId) {

        mypageService.deleteReview(reviewId);

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

    @PostMapping("/api/modify_review")
    public HashMap<String, Object> modifyReview(@RequestParam("reviewId") int reviewId, @RequestParam("reviewContent") String reviewContent) {

        mypageService.modifyReview(reviewId, reviewContent);

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }
}
