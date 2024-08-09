package com.kibwa.tbti.service;

import com.kibwa.tbti.entity.MembersEntity;
import com.kibwa.tbti.entity.ReviewEntity;
import com.kibwa.tbti.repository.MembersRepository;
import com.kibwa.tbti.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

/**
 * 파일명: MypageService
 * 작성자: 김도연
 * 설명: 마이페이지 서비스
 **/

@Service
@RequiredArgsConstructor
@Transactional
public class MypageService {
    private final ReviewRepository reviewRepository;
    private final MembersRepository membersRepository;

    public void deleteReview(int reviewId) {
        reviewRepository.deleteByReviewId(reviewId);
    }

    public void modifyReview(int reviewId, String reviewContent) {
        ReviewEntity reviewEntity = reviewRepository.findByReviewId(reviewId);

        reviewEntity.setReviewContent(reviewContent);

        reviewRepository.save(reviewEntity);
    }

    public HashMap<String, Object> getMyPage() {
        //TODO: 로그인/로그아웃 기능 구현 후 하드코딩 삭제 및 수정

        HashMap<String, Object> response = new HashMap<>();
        //PrincipalDetails principalDetails = (PrincipalDetails) userDetails;
        //response.put("userDetails", userDetails);

        //구현 후 아래 삭제
        MembersEntity membersEntity = membersRepository.findByUserName("test");
        response.put("uid", membersEntity.getUid());
        response.put("password", membersEntity.getPassword());
        response.put("userName", membersEntity.getUserName());

        return response;
    }
}
