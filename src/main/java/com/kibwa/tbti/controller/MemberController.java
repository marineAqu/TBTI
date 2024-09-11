package com.kibwa.tbti.controller;

import com.kibwa.tbti.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * 파일명: MemberController
 * 작성자: 김도연
 * 설명: 로그인, 로그아웃, 회원가입 등 API 컨트롤러
 **/

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/api/sign-up")
    public HashMap<String, Object> signupFun(@RequestParam("uid") String uid, @RequestParam("password") String password,
                                             @RequestParam("user_name") String name){

        memberService.newMemberSave(uid, password, name);

        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

    @GetMapping("/api/uid_duplication")
    public HashMap<String, Object> uidDuplication(@RequestParam("uid") String uid) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        if(memberService.uidDuplication(uid)) response.put("check", "fail");
        else response.put("check", "ok");

        return response;
    }

    @GetMapping("/api/user_name_duplication")
    public HashMap<String, Object> userNameDuplication(@RequestParam("user_name") String userName) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");

        if(memberService.userNameDuplication(userName)) response.put("check", "fail");
        else response.put("check", "ok");

        return response;
    }
}
