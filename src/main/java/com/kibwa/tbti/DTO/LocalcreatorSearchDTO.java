package com.kibwa.tbti.DTO;
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
}
