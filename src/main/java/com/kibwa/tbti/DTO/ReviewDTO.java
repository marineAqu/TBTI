package com.kibwa.tbti.DTO;

import com.kibwa.tbti.entity.ReviewEntity;
import lombok.*;
import java.text.SimpleDateFormat;

/**
 * 파일명: ReviewDTO
 * 작성자: 김도연
 **/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewDTO {
    private int reviewId;
    private String reviewContent;
    private double rate;
    private String createAt;
    private String memberName;

    public static ReviewDTO toreviewDTO(ReviewEntity reviewEntity){
        ReviewDTO ReviewDTO = new ReviewDTO();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일 작성");

        ReviewDTO.setReviewId(reviewEntity.getReviewId());
        ReviewDTO.setReviewContent(reviewEntity.getReviewContent());
        ReviewDTO.setRate(reviewEntity.getRate());
        ReviewDTO.setCreateAt(simpleDateFormat.format(reviewEntity.getCreateAt()));
        ReviewDTO.setMemberName(reviewEntity.getMembers().getUserName());

        return ReviewDTO;
    }
}
