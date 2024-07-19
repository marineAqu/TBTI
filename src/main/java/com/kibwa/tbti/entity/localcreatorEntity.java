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
public class localcreatorEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int store_id;

    @Column
    private String store_name;

    @Column
    private String detail_address;

    @Column
    private String category;

    @Column
    private String contact;

    @Column
    private String website;

    @Column
    private String address_category_1;

    @Column
    private String address_category_2;

    @Column
    private long rating;

    @Column
    private char hidden_category;
}
