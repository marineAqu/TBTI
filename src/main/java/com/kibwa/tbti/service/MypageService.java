package com.kibwa.tbti.service;

import com.kibwa.tbti.entity.ReviewEntity;
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

    public void deleteReview(int reviewId) {
        reviewRepository.deleteByReviewId(reviewId);
    }

    public void modifyReview(int reviewId, String reviewContent) {
        ReviewEntity reviewEntity = reviewRepository.findByReviewId(reviewId);

        reviewEntity.setReviewContent(reviewContent);

        reviewRepository.save(reviewEntity);
    }
}
