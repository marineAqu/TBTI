package com.kibwa.tbti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 파일명: DescriptionEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "description")
public class DescriptionEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int storeId;

    @Column
    private String description;
}
