package com.kibwa.tbti.service;

import com.kibwa.tbti.DTO.LocalcreatorSearchDTO;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
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

        System.out.print(localcreatorSearchDTO);

        return localcreatorSearchDTO;
    }

    public HashMap<String, Object> search_region(int regionCode) {
        String searchRegion = "";
        String domInt = "";

        HashMap<String, Object> response = new HashMap<>();

        switch (regionCode){
            case 1:
                searchRegion = "강원특별자치도";
                domInt = "대한민국의 동북부에 위치한 산악과 해변이 아름다운 특별자치도";
                break;
            case 2:
                searchRegion = "대전광역시";
                domInt = "대한민국의 중앙에 위치한 과학기술과 교육의 중심 도시";
                break;
            case 3:
                searchRegion = "전라남도";
                domInt = "대한민국 남서부에 위치한 풍부한 자연과 전통이 살아있는 도시";
                break;
            case 4:
                searchRegion = "부산광역시";
                domInt = "대한민국 남동부에 위치한 국제적인 해양 도시";
                break;
            case 5:
                searchRegion = "서울특별시";
                domInt = "대한민국의 수도이자 경제, 문화, 정치의 중심 도시";
                break;
            case 6:
                searchRegion = "인천광역시";
                domInt = "대한민국 서해안에 위치한 항구 도시이자 국제공항이 있는 도시";
                break;
            case 7:
                searchRegion = "광주광역시";
                domInt = "대한민국 남서부에 위치한 문화와 예술의 도시";
                break;
            case 8:
                searchRegion = "경상북도";
                domInt = "대한민국 동북부에 위치한 역사와 전통이 깊은 도시";
                break;
            case 9:
                searchRegion = "대구광역시";
                domInt = "대한민국 남동부에 위치한 산업과 패션의 중심 도시";
                break;
            case 10:
                searchRegion = "제주특별자치도";
                domInt = "대한민국의 최남단에 위치한 특별자치도";
                break;
            case 11:
                searchRegion = "충청남도";
                domInt = "대한민국 중서부에 위치한 농업과 공업이 발달한 도시";
                break;
            case 12:
                searchRegion = "충청북도";
                domInt = "대한민국 중앙에 위치한 내륙 도로 교통의 중심 도시";
                break;
            case 13:
                searchRegion = "경상남도";
                domInt = "대한민국 남동부에 위치한 공업과 해양 관광이 발달한 도시";
                break;
            case 14:
                searchRegion = "경기도";
                domInt = "대한민국 수도권에 위치한 인구와 산업이 밀집된 도시";
                break;
            case 15:
                searchRegion = "전북특별자치도";
                domInt = "대한민국 서남부에 위치한 전통 문화와 자연이 어우러진 특별자치도";
                break;
            case 16:
                searchRegion = "세종특별자치시";
                domInt = "대한민국의 행정 중심지로 개발된 특별자치시";
                break;
            case 17:
                searchRegion = "울산광역시";
                domInt = "대한민국 남동부에 위치한 자동차와 조선 산업의 중심 도시";
                break;
            default:
                System.out.print("지역 코드 오류");
                break;
        }

        response.put("domInt", domInt);
        response.put("searchRegion", searchRegion);

        List<LocalcreatorSearchProjection> localcreatorList = localcreatorRepository.findByAddressCategory1Like(searchRegion);
        List<LocalcreatorSearchDTO> localcreatorSearchDTO = localcreatorList.stream()
                .map(projection -> {
                    LocalcreatorSearchDTO dto = LocalcreatorSearchDTO.toLocalcreatorSearchDTO(projection);
                    dto.setImg(storageS3Service.getImageURL(projection.getStoreName(), projection.getHiddenCategory()));
                    return dto;
                }).toList();

        response.put("localList", localcreatorSearchDTO);

        return response;
    }
}
