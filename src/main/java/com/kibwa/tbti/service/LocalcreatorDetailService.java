package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
