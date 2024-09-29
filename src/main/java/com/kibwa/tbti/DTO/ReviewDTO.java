package com.kibwa.tbti.DTO;

import com.kibwa.tbti.entity.ReviewEntity;
import lombok.*;
import java.sql.Timestamp;

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
    private Timestamp createAt;
    private String memberName;

    public static ReviewDTO toreviewDTO(ReviewEntity reviewEntity){
        ReviewDTO ReviewDTO = new ReviewDTO();

        ReviewDTO.setReviewId(reviewEntity.getReviewId());
        ReviewDTO.setReviewContent(reviewEntity.getReviewContent());
        ReviewDTO.setRate(reviewEntity.getRate());
        ReviewDTO.setCreateAt(reviewEntity.getCreateAt());
        ReviewDTO.setMemberName(reviewEntity.getMembers().getUserName());

        return ReviewDTO;
    }
}
