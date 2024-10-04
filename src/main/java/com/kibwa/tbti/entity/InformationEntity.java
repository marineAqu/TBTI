package com.kibwa.tbti.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * 파일명: InformationEntity
 * 작성자: 김도연
 **/

@Entity
@Setter
@Getter
@Table(name = "information")
public class InformationEntity {
    @Id
    private int storeId;

    @Column
    private String allowsReserve;

    @Column
    private String allowsPets;

    @Column
    private String kidsAvailable;

    @Column
    private String serviceOptions;

    @Column
    private String hasParking;

    @Column
    private String distanceToStation;

    @Column
    private String hasWifi;

    @Column
    private String perCost;

    @Column
    private String wheelchairAccess;

    @Column
    private String tags;

    @Column
    private String description;
}
