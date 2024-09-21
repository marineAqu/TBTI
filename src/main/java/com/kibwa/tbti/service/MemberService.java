package com.kibwa.tbti.service;

import com.kibwa.tbti.entity.MembersEntity;
import com.kibwa.tbti.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 파일명: MemberService
 * 작성자: 김도연
 * 설명: 회원가입, 로그인, 로그아웃 등 서비스
 **/

@Service
@RequiredArgsConstructor
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MembersRepository membersRepository;

    public void newMemberSave(String uid, String password, String username) {

        MembersEntity membersEntity = new MembersEntity();
        membersEntity.setUid(uid);
        membersEntity.setPassword(passwordEncoder.encode(password));
        membersEntity.setUserName(username);
        membersEntity.setIsActive('Y');

        membersRepository.save(membersEntity);
    }

    public boolean uidDuplication(String uid) {
        return membersRepository.existsByUid(uid);
    }

    public boolean userNameDuplication(String userName) {
        return membersRepository.existsByUserName(userName);
    }
}
