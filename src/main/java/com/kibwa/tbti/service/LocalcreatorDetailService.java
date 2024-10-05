package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.DTO.ReviewDTO;
import com.kibwa.tbti.entity.InformationEntity;
import com.kibwa.tbti.entity.LikesEntity;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.entity.ReviewEntity;
import com.kibwa.tbti.repository.InformationRepository;
import com.kibwa.tbti.repository.LikesRepository;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import com.kibwa.tbti.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    private final InformationRepository informationRepository;

    public LocalcreatorDTO SearchByStoreId(int store_id) {
        LocalcreatorEntity localcreatorEntity = localcreatorRepository.findByStoreId(store_id);

        LocalcreatorDTO localcreatorDTO = LocalcreatorDTO.toLocalcreatorDTO(localcreatorEntity);

        return localcreatorDTO;
    }

    public void postReview(int store_id, String reviewContent, double starPoint, int memberId) {

        ReviewEntity reviewEntity = ReviewEntity.toReviewEntity(reviewContent, starPoint, store_id, memberId);

        reviewRepository.save(reviewEntity);
    }

    public void save_like(int store_id, int member_id) {

        if(likesRepository.findByStoreIdAndMemberId(store_id, member_id).isPresent()) {
            likesRepository.deleteByStoreIdAndMemberId(store_id, member_id);
        }
        else {
            LikesEntity likesEntity = LikesEntity.toLikesEntity(store_id, member_id);
            likesRepository.save(likesEntity);
        }
    }

    public List<ReviewDTO> getReview(int store_id) {
        List<ReviewEntity> reviewEntityList = reviewRepository.findByStoreId(store_id);
        return reviewEntityList.stream()
                .map(projection -> {
                    ReviewDTO dto = ReviewDTO.toreviewDTO(projection);
                    dto.setMemberName(projection.getMembers().getUserName());
                    return dto;
                })
                .toList();
    }

    public Optional<InformationEntity> getInfo(int store_id) {
        return informationRepository.findByStoreId(store_id);
    }
}
