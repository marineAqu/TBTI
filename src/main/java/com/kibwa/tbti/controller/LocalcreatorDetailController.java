package com.kibwa.tbti.controller;

import com.kibwa.tbti.entity.LocalcreatorEntity;
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
    public String homePage(@RequestParam("store_id") int store_id,
                           Model model) {

        model.addAttribute("localcreator", localcreatorDetailService.SearchByStoreId(store_id));

        return "localcreator_detail";
    }
}
