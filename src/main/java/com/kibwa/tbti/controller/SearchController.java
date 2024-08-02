package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorSearchDTO;
import com.kibwa.tbti.DTO.LocalcreatorSearchProjection;
import com.kibwa.tbti.service.SearchService;
import com.kibwa.tbti.service.StorageS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * 파일명: SearchController
 * 작성자: 김도연
 * 설명: 검색 페이지 api 컨트롤러
 **/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {
    private final SearchService searchService;
    private final StorageS3Service storageS3Service;
    @GetMapping("/api/search_localcreator")
    public HashMap<String, Object> search_localcreator(@RequestParam("searchInput") String searchInput) {

        List<LocalcreatorSearchDTO> localcreatorList = searchService.search_localcreator(searchInput);

        HashMap<String, Object> response = new HashMap<>();
        response.put("localcreatorList", localcreatorList);

        return response;
    }

    @GetMapping("api/search_region")
    public HashMap<String, Object> search_region(@RequestParam("searchRegion") String searchRegion) {

        List<LocalcreatorSearchProjection> localcreatorList = searchService.search_region(searchRegion);
        HashMap<String, Object> response = new HashMap<>();
        response.put("localcreatorList", localcreatorList);

        return response;
    }
}
