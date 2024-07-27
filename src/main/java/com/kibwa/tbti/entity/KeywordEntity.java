package com.kibwa.tbti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 파일명: KeywordEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "keyword")
public class KeywordEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int keywordId;

    @Column
    private String keyword;

    @Column
    private int storeId;

    //@JoinColumn(name = "storeId", referencedColumnName = "storeId", insertable = false, updatable = false)
    //private int storeId;
}
