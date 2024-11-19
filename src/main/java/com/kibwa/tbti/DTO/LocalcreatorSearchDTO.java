package com.kibwa.tbti.DTO;
import com.kibwa.tbti.entity.LocalCreatorWithAvgRatingEntity;
import lombok.*;

/**
 * 파일명: LocalcreatorSearchDTO
 * 작성자: 김도연
 **/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LocalcreatorSearchDTO {
    int StoreId;
    String StoreName;
    String DetailAddress;
    String Category;
    String Contact;
    String AddressCategory1;
    String[] img;

    private Double avgRating;

    public static LocalcreatorSearchDTO toLocalcreatorSearchDTO(LocalcreatorSearchProjection localcreatorSearchProjection){
        LocalcreatorSearchDTO localcreatorSearchDTO = new LocalcreatorSearchDTO();

        localcreatorSearchDTO.setStoreId(localcreatorSearchProjection.getStoreId());
        localcreatorSearchDTO.setStoreName(localcreatorSearchProjection.getStoreName());
        localcreatorSearchDTO.setDetailAddress(localcreatorSearchProjection.getDetailAddress());
        localcreatorSearchDTO.setCategory(localcreatorSearchProjection.getCategory());
        localcreatorSearchDTO.setContact(localcreatorSearchProjection.getContact());
        localcreatorSearchDTO.setAddressCategory1(localcreatorSearchProjection.getAddressCategory1());

        return localcreatorSearchDTO;
    }

    public static LocalcreatorSearchDTO toOrderLocalcreatorSearchDTO(LocalCreatorWithAvgRatingEntity localCreatorWithAvgRatingEntity){
        LocalcreatorSearchDTO localcreatorSearchDTO = new LocalcreatorSearchDTO();

        localcreatorSearchDTO.setAvgRating(localCreatorWithAvgRatingEntity.getAvgRating());
        localcreatorSearchDTO.setStoreId(localCreatorWithAvgRatingEntity.getStoreId());
        localcreatorSearchDTO.setStoreName(localCreatorWithAvgRatingEntity.getStoreName());
        localcreatorSearchDTO.setDetailAddress(localCreatorWithAvgRatingEntity.getDetailAddress());
        localcreatorSearchDTO.setCategory(localCreatorWithAvgRatingEntity.getCategory());
        localcreatorSearchDTO.setContact(localCreatorWithAvgRatingEntity.getContact());
        localcreatorSearchDTO.setAddressCategory1(localCreatorWithAvgRatingEntity.getAddressCategory1());

        return localcreatorSearchDTO;
    }
}
