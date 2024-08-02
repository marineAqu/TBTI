package com.kibwa.tbti.repository;

import com.kibwa.tbti.entity.DescriptionEntity;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * 파일명: DescriptionRepository
 * 작성자: 김도연
 **/

public interface DescriptionRepository extends JpaRepository<DescriptionEntity, Integer> {
    String findByStoreId(@Param("storeId") int storeId);
}
