package com.kibwa.tbti.DTO;

/**
 * 파일명: localcreatorRepository
 * 작성자: 김도연
 * 설명: api/search_localcreator를 위한 상호명, 상세주소, 분류, 연락처, 주소1분류를 담는 DTO
 **/

public interface LocalcreatorSearchProjection {
    int getStoreId();
    String getStoreName();
    String getDetailAddress();
    String getCategory();
    String getContact();
    String getAddressCategory1();
}
