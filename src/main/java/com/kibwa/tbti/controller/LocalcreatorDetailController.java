package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.service.LocalcreatorDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 파일명: localcreatorDetailController
 * 작성자: 김도연
 **/
@Controller
@RequiredArgsConstructor
public class LocalcreatorDetailController {
    private final LocalcreatorDetailService localcreatorDetailService;
    @GetMapping("/api/localcreator_detail")
    public LocalcreatorDTO localcreator_detail(@RequestParam("storeId") int store_id) {

        LocalcreatorDTO localcreatorDTO = localcreatorDetailService.SearchByStoreId(store_id);
        System.out.print(localcreatorDTO);

        return localcreatorDTO;
    }

    /*
    @GetMapping("/api/search_localcreator")
    public String search_localcreator(@RequestParam("searchInput") String searchInput,
                           Model model) {

        model.addAttribute("localcreatorList", localcreatorDetailService.search_localcreator(searchInput));

        return "search_localcreator";
    }
     */
}
