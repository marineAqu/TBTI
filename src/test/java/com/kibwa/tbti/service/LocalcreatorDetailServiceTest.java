package com.kibwa.tbti.service;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.entity.LocalcreatorEntity;
import com.kibwa.tbti.repository.LocalcreatorRepository;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class LocalcreatorDetailServiceTest {

    @Mock
    private LocalcreatorRepository localcreatorRepository;

    @InjectMocks
    private LocalcreatorDetailService localcreatorDetailService;

    @Test
    public void 로컬크리에이터_상세조회() {
        // Arrange
        int storeId = 1;
        LocalcreatorEntity mockEntity = new LocalcreatorEntity();
        mockEntity.setStoreId(storeId);
        mockEntity.setStoreName("브레드 메밀");

        when(localcreatorRepository.findByStoreId(storeId)).thenReturn(mockEntity);

        // Act
        LocalcreatorDTO result = localcreatorDetailService.SearchByStoreId(storeId);

        // Assert
        assertEquals("브레드 메밀", result.getStoreName());
        assertEquals(storeId, result.getStoreId());
    }
}
