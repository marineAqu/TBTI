package com.kibwa.tbti.repository;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 파일명: localcreatorRepository
 * 작성자: 김도연
 **/
public interface LocalcreatorRepository extends JpaRepository<LocalcreatorEntity, Integer> {
    LocalcreatorEntity findByStoreId(int store_id);
}
