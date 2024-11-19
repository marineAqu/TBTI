package com.kibwa.tbti.entity;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "localcreator_with_avg_rating")
public class LocalCreatorWithAvgRatingEntity {
    //사용자 평균 리뷰를 위한 view

    @Id
    private Integer storeId;
    private String storeName;
    private String category;
    private String contact;
    private Double avgRating;
    private String detailAddress;
    private String addressCategory1;
}