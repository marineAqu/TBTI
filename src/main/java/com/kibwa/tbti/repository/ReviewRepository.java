package com.kibwa.tbti.repository;

import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 파일명: ReviewRepository
 * 작성자: 김도연
 **/

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
    void deleteByReviewId(int reviewId);
    ReviewEntity findByReviewId(int reviewId);

    List<ReviewEntity> findByStoreId(int storeId);
}
