package com.kibwa.tbti.controller;

import com.kibwa.tbti.DTO.LocalcreatorDTO;
import com.kibwa.tbti.service.LocalcreatorDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * 파일명: localcreatorDetailController
 * 작성자: 김도연
 **/
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LocalcreatorDetailController {
    private final LocalcreatorDetailService localcreatorDetailService;
    @GetMapping("/api/localcreator_detail")
    public HashMap<String, Object> localcreator_detail(@RequestParam("storeId") int store_id) {

        LocalcreatorDTO localcreatorDTO = localcreatorDetailService.SearchByStoreId(store_id);
        System.out.print("localcreator_detail get api controller:");
        System.out.print(localcreatorDTO);

        HashMap<String, Object> response = new HashMap<>();
        response.put("localcreator", localcreatorDTO);
        //response.put("temp", 1);

        return response;
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
