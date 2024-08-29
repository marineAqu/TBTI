package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.entity.LikesEntity;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.entity.ReviewEntity;
import com.kibwa.tbti.repository.LikesRepository;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import com.kibwa.tbti.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 파일명: LocalcreatorDetailService
 * 작성자: 김도연
 * 설명: 로컬크리에이터 상세정보 서비스
 **/

@Service
@RequiredArgsConstructor
public class LocalcreatorDetailService {
    private final LocalcreatorRepository localcreatorRepository;
    private final ReviewRepository reviewRepository;
    private final LikesRepository likesRepository;

    public LocalcreatorDTO SearchByStoreId(int store_id) {
        LocalcreatorEntity localcreatorEntity = localcreatorRepository.findByStoreId(store_id);

        LocalcreatorDTO localcreatorDTO = LocalcreatorDTO.toLocalcreatorDTO(localcreatorEntity);

        return localcreatorDTO;
    }

    public void postReview(int store_id, String reviewContent, double starPoint) {
        //TODO: 회원가입, 로그인 기능 추가 후 하드코딩된 memebrId 수정

        ReviewEntity reviewEntity = ReviewEntity.toReviewEntity(reviewContent, starPoint, store_id, 1);

        reviewRepository.save(reviewEntity);
    }

    public void save_like(int store_id) {

        //TODO: 회원가입, 로그인 기능 추가 후 하드코딩된 memebrId 수정

        if(likesRepository.findByStoreIdAndMemberId(store_id, 1).isPresent()) {
            likesRepository.deleteByStoreIdAndMemberId(store_id, 1);
        }
        else {
            LikesEntity likesEntity = LikesEntity.toLikesEntity(store_id, 1);
            likesRepository.save(likesEntity);
        }
    }

    public List<ReviewEntity> getReview(int store_id) {
        return reviewRepository.findByStoreId(store_id);
    }
}
