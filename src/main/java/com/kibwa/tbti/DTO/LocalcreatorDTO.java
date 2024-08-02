package com.kibwa.tbti.DTO;

import com.kibwa.tbti.entity.DescriptionEntity;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

/**
 * 파일명: LocalcreatorDTO
 * 작성자: 김도연
 **/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LocalcreatorDTO {
    private int storeId;
    private String storeName;
    private String detailAddress;
    private String category;
    private String contact;
    private String website;
    private String addressCategory1;
    private String addressCategory2;
    private double rating;
    private char hiddenCategory;
    private String business_hours;
    private DescriptionEntity description;
    private String[] img;

    public static LocalcreatorDTO toLocalcreatorDTO(LocalcreatorEntity localcreatorEntity){
        LocalcreatorDTO localcreatorDTO = new LocalcreatorDTO();

        localcreatorDTO.setStoreId(localcreatorEntity.getStoreId());
        localcreatorDTO.setStoreName(localcreatorEntity.getStoreName());
        localcreatorDTO.setDetailAddress(localcreatorEntity.getDetailAddress());
        localcreatorDTO.setCategory(localcreatorEntity.getCategory());
        localcreatorDTO.setContact(localcreatorEntity.getContact());
        localcreatorDTO.setWebsite(localcreatorEntity.getWebsite());
        localcreatorDTO.setAddressCategory1(localcreatorEntity.getAddressCategory1());
        localcreatorDTO.setAddressCategory2(localcreatorEntity.getAddressCategory2());
        localcreatorDTO.setRating(localcreatorEntity.getRating());
        localcreatorDTO.setHiddenCategory(localcreatorEntity.getHiddenCategory());
        localcreatorDTO.setBusiness_hours(localcreatorEntity.getBusiness_hours());
        localcreatorDTO.setDescription(localcreatorEntity.getDescription());

        return localcreatorDTO;
    }
}
