package com.kibwa.tbti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

/**
 * 파일명: MembersEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "members")
public class MembersEntity {
    @Id // pk 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int memberId;

    @Column
    private String uid;

    @Column
    private String password;

    @Column
    private String userName;

    @Column
    private char isActive;

    @Column
    private Timestamp registeredAt;

    @Column
    private Timestamp lastLogin;
}
