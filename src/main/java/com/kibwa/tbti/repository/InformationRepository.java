package com.kibwa.tbti.repository;

import com.kibwa.tbti.entity.InformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * 파일명: InformationRepository
 * 작성자: 김도연
 **/
public interface InformationRepository extends JpaRepository<InformationEntity, Integer>{
     Optional<InformationEntity> findByStoreId(@Param("storeId") int storeId);
}
