package com.kibwa.tbti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

/**
 * 파일명: LikesEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "likes")
public class LikesEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int likesId;

    @Column
    private Timestamp createAt;

    @Column
    private int storeId;

    @Column
    private int memberId;

    //@JoinColumn(name = "storeId", referencedColumnName = "storeId", insertable = false, updatable = false)
    //private int storeId;
}
