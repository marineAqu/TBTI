package com.kibwa.tbti.service;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

/*@ExtendWith(MockitoExtension.class)
public class LocalcreatorDetailServiceTest {

    @Mock
    private LocalcreatorRepository localcreatorRepository;

    @InjectMocks
    private LocalcreatorDetailService localcreatorDetailService;

    @Test
    public void 로컬크리에이터_상세조회() throws Exception {
        // Arrange
        int storeId = 1;
        LocalcreatorEntity mockEntity = new LocalcreatorEntity();
        mockEntity.setStoreId(storeId);
        mockEntity.setStoreName("브레드 메밀");

        //when
        when(localcreatorRepository.findByStoreId(storeId)).thenReturn(mockEntity);

        // Act
        LocalcreatorDTO result = localcreatorDetailService.SearchByStoreId(storeId);

        // Assert
        assertEquals("브레드 메밀", result.getStoreName());
        System.out.print(result);
        assertEquals(storeId, result.getStoreId(), "로컬크리에이터_상세조회 테스트 실패");
    }

    @Test
    public void 로컬크리에이터_리스트조회() throws Exception {
        // Arrange
        String query = "브레드";
        List<LocalcreatorEntity> emptyEntities = List.of();

        //when
        when(localcreatorRepository.findByStoreNameLike(query)).thenReturn(emptyEntities);
        // Act
        List<LocalcreatorDTO> result = localcreatorDetailService.search_localcreator(query);

        // Assert
        assertNotNull(result, "로컬크리에이터_리스트조회 테스트 실패");
        System.out.print(result);
    }
}*/
/*

public class LocalcreatorDetailServiceTest {

    LocalcreatorRepository localcreatorRepository;
    LocalcreatorDetailService localcreatorDetailService;

    @BeforeEach
    public void beforeEach() {
        localcreatorRepository = org.mockito.Mockito.mock(LocalcreatorRepository.class);
        localcreatorDetailService = new LocalcreatorDetailService(localcreatorRepository);
    }

    @AfterEach
    public void afterEach() {
        localcreatorRepository.deleteAll();
    }

    @Test
    public void 로컬크리에이터_상세조회() throws Exception {
        // Arrange
        int storeId = 1;
        LocalcreatorEntity mockEntity = new LocalcreatorEntity();
        mockEntity.setStoreId(storeId);
        mockEntity.setStoreName("브레드 메밀");

        //when
        LocalcreatorEntity findEntity = localcreatorRepository.findByStoreId(storeId);

        // Act
        LocalcreatorDTO result = localcreatorDetailService.SearchByStoreId(storeId);

        // Assert
        assertEquals("브레드 메밀", result.getStoreName());
        System.out.print(result);
        assertEquals(storeId, result.getStoreId(), "로컬크리에이터_상세조회 테스트 실패");
    }

//    @Test
//    public void 로컬크리에이터_리스트조회() throws Exception {
//        // Arrange
//        String query = "브레드";
//        List<LocalcreatorEntity> emptyEntities = List.of();
//
//        //when
//        when(localcreatorRepository.findByStoreNameLike(query)).thenReturn(emptyEntities);
//
//        // Act
//        List<LocalcreatorDTO> result = localcreatorDetailService.search_localcreator(query);
//
//        // Assert
//        assertNotNull(result, "로컬크리에이터_리스트조회 테스트 실패");
//        System.out.print(result);
//    }
}
*/