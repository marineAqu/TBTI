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
        localcreatorDTO.setStore_id(localcreatorEntity.getStore_id());
        localcreatorDTO.setStore_name(localcreatorEntity.getStore_name());
        localcreatorDTO.setWebsite(localcreatorEntity.getWebsite());
        localcreatorDTO.setHidden_category(localcreatorEntity.getHidden_category());
        localcreatorDTO.setDetail_address(localcreatorEntity.getDetail_address());
        localcreatorDTO.setAddress_category_2(localcreatorEntity.getAddress_category_2());
        localcreatorDTO.setAddress_category_1(localcreatorDTO.getAddress_category_1());

        return localcreatorDTO;
    }
}
