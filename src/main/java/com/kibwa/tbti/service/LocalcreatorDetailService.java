package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 파일명: LocalcreatorDetailService
 * 작성자: 김도연
 * 설명: 로컬크리에이터 상세정보 서비스
 **/

@Service
@RequiredArgsConstructor
public class LocalcreatorDetailService {
    private final LocalcreatorRepository localcreatorRepository;

    public LocalcreatorDTO SearchByStoreId(int store_id) {
        LocalcreatorEntity localcreatorEntity = localcreatorRepository.findByStoreId(store_id);

        LocalcreatorDTO localcreatorDTO = LocalcreatorDTO.toLocalcreatorDTO(localcreatorEntity);

        return localcreatorDTO;
    }
}
