package com.kibwa.tbti.controller;

import com.kibwa.tbti.principal.PrincipalDetails;
import com.kibwa.tbti.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/api/check_login_status")
    public HashMap<String, Object> checkLoginStatus(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        HashMap<String, Object> response = new HashMap<>();

        if(principalDetails != null) response.put("login", true);
        else response.put("login", false);

        return response;
    }

    @GetMapping("/api/tbti_status")
    public HashMap<String, Object> tbtiStatus(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        HashMap<String, Object> response = new HashMap<>();

        if(principalDetails != null) {
            response.put("login", true);
            response.put("uid", principalDetails.getUsername());
            response.put("tbtiType", principalDetails.getTbtiType());
        }
        else response.put("login", false);

        return response;
    }

    @PostMapping("/api/save_tbti")
    public HashMap<String, Object> save_tbti(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody Map<String, String> tbtitype) {
        HashMap<String, Object> response = new HashMap<>();

        if(principalDetails != null) {
            memberService.tbtiTestSave(principalDetails.getUsername(), tbtitype.get("tbtitype"));
            response.put("status", "success");
        }
        else response.put("login", false);

        return response;
    }

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



