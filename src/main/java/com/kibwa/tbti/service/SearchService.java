package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public List<LocalcreatorSearchProjection> search_localcreator(String searchInput) {
        List<LocalcreatorSearchProjection> localcreatorList = localcreatorRepository.findByStoreNameLike(searchInput);

        return localcreatorList;
    }

    public List<LocalcreatorSearchProjection> search_region(String searchRegion) {
        List<LocalcreatorSearchProjection> localcreatorList = localcreatorRepository.findByAddressCategory1Like(searchRegion);

        return localcreatorList;
    }
}
