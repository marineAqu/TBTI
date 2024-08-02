package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorSearchDTO;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * 파일명: SearchService
 * 작성자: 김도연
 * 설명: 검색 서비스
 **/

@Service
@RequiredArgsConstructor
public class SearchService {
    private final LocalcreatorRepository localcreatorRepository;
    private final StorageS3Service storageS3Service;

    public List<LocalcreatorSearchDTO> search_localcreator(String searchInput) {

        List<LocalcreatorSearchProjection> localcreatorList = localcreatorRepository.findByStoreNameLike(searchInput);
        List<LocalcreatorSearchDTO> localcreatorSearchDTO = localcreatorList.stream()
                .map(projection -> {
                    LocalcreatorSearchDTO dto = LocalcreatorSearchDTO.toLocalcreatorSearchDTO(projection);
                    dto.setImg(storageS3Service.getImageURL(projection.getStoreName(), projection.getHiddenCategory()));
                    return dto;
                })
                .toList();

        return localcreatorSearchDTO;
    }

    public List<LocalcreatorSearchProjection> search_region(String searchRegion) {

        return localcreatorRepository.findByAddressCategory1Like(searchRegion);
    }
}
