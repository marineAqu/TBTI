package com.kibwa.tbti.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 파일명: localcreatorDetailController
 * 작성자: 김도연
 **/
@Controller
public class LocalcreatorDetailController {

    @GetMapping("/api/localcreator_detail")
    public String homePage(Model model) {
//
//        MemlistEntity user = memberService.findByMember(uid);
//
//        model.addAttribute("user", user);
//
//        //이하 김도연 작성: 날짜를 계산하여 하루 단위로 다른 오늘의 주제를 띄움
//        long daysDifference = ChronoUnit.DAYS.between(LocalDate.of(2023, 11, 19), LocalDate.now());
//
//        TodaytopicEntity todaytopicEntity= todaytopicRepository.findByNo(daysDifference);
//        model.addAttribute("topic", todaytopicEntity.getTopic());

        return "localcreator_detail";
    }
}
