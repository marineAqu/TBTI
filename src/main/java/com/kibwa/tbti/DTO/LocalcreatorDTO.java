package com.kibwa.tbti.DTO;

import com.kibwa.tbti.entity.LocalcreatorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LocalcreatorDTO {
    private int store_id;
    private String store_name;
    private String detail_address;
    private String category;
    private String contact;
    private String website;
    private String address_category_1;
    private String address_category_2;
    private long rating;
    private char hidden_category;

    public static LocalcreatorDTO toLocalcreatorDTO(LocalcreatorEntity localcreatorEntity){
        LocalcreatorDTO localcreatorDTO = new LocalcreatorDTO();

        localcreatorDTO.setCategory(localcreatorEntity.getCategory());
        localcreatorDTO.setContact(localcreatorEntity.getContact());
        localcreatorDTO.setRating(localcreatorEntity.getRating());
        localcreatorDTO.setStore_id(localcreatorEntity.getStoreId());
        localcreatorDTO.setStore_name(localcreatorEntity.getStoreName());
        localcreatorDTO.setWebsite(localcreatorEntity.getWebsite());
        localcreatorDTO.setHidden_category(localcreatorEntity.getHiddenCategory());
        localcreatorDTO.setDetail_address(localcreatorEntity.getDetailAddress());
        localcreatorDTO.setAddress_category_2(localcreatorEntity.getAddressCategory2());
        localcreatorDTO.setAddress_category_1(localcreatorEntity.getAddressCategory1());

        return localcreatorDTO;
    }
}
