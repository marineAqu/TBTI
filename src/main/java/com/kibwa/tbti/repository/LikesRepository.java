package com.kibwa.tbti.repository;


import com.kibwa.tbti.entity.LikesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 파일명: LikesRepository
 * 작성자: 김도연
 **/

public interface LikesRepository extends JpaRepository<LikesEntity, Integer> {
}
