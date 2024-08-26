package com.kibwa.tbti.repository;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * 파일명: localcreatorRepository
 * 작성자: 김도연
 **/

public interface LocalcreatorRepository extends JpaRepository<LocalcreatorEntity, Integer> {
    LocalcreatorEntity findByStoreId(int store_id);

    @Query("SELECT l FROM LocalcreatorEntity l WHERE " +
            "l.storeName LIKE %:keyword% OR " +
            "l.detailAddress LIKE %:keyword% OR " +
            "l.category LIKE %:keyword%")
    List<LocalcreatorSearchProjection> findByStoreNameLike(@Param("keyword") String keyword);

    List<LocalcreatorSearchProjection> findByAddressCategory1Like(@Param("addressCategory1") String addressCategory1);

    List<LocalcreatorSearchProjection> findByAddressCategory2Like(@Param("addressCategory2") String addressCategory2);
}
