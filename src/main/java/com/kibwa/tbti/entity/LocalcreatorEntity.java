package com.kibwa.tbti.entity;


import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * 파일명: localcreatorEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "localcreator")
public class LocalcreatorEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int storeId;

    @Column
    private String storeName;

    @Column
    private String detailAddress;

    @Column
    private String category;

    @Column
    private String contact;

    @Column
    private String website;

    @Column
    private String addressCategory1;

    @Column
    private String addressCategory2;

    @Column
    private double rating;

    @Column
    private char hiddenCategory;

    @Column
    private String business_hours;

    @ManyToOne
    @JoinColumn(name = "storeId", referencedColumnName = "storeId", insertable = false, updatable = false)
    private DescriptionEntity description;
}
