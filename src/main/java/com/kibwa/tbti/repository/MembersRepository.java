package com.kibwa.tbti.repository;

import com.kibwa.tbti.entity.MembersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 파일명: MembersRepository
 * 작성자: 김도연
 **/

public interface MembersRepository extends JpaRepository<MembersEntity, Integer> {
}
