package com.kibwa.tbti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
/**
 * 파일명: ReviewEntity
 * 작성자: 김도연
 **/
@Entity
@Setter
@Getter
@Table(name = "review")
public class ReviewEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int reviewId;

    @Column
    private String review_content;

    @Column
    private double rate;
}
