package com.kibwa.tbti.service;

import com.kibwa.tbti.ChatService;
import com.kibwa.tbti.entity.MembersEntity;
import com.kibwa.tbti.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MembersRepository membersRepository;
    private final ChatService chatService; // ChatService 의존성 주입

    // 새로운 회원 저장
    public void newMemberSave(String uid, String password, String username) {
        MembersEntity membersEntity = new MembersEntity();
        membersEntity.setUid(uid);
        membersEntity.setPassword(passwordEncoder.encode(password));
        membersEntity.setUserName(username);
        membersEntity.setIsActive('Y');
        membersRepository.save(membersEntity);
    }

    // TBTI 테스트 결과 저장
    public void tbtiTestSave(String uid, String tbtiType) {
        MembersEntity membersEntity = membersRepository.findByUid(uid);
        membersEntity.setPreviousTbtiType(membersEntity.getTbtiType());
        membersEntity.setTbtiType(tbtiType);
        membersRepository.save(membersEntity);
    }

    public String getTbtiType(String uid) {
        return membersRepository.findByUid(uid).getTbtiType();
    }

    // 아이디 중복 검사
    public boolean uidDuplication(String uid) {
        return membersRepository.existsByUid(uid);
    }

    // 사용자명 중복 검사
    public boolean userNameDuplication(String userName) {
        return membersRepository.existsByUserName(userName);
    }

    // AI에 메시지 전송 (uid, tbtiType, userMessage)
    public void sendToAI(String uid, String userMessage) {
        // 사용자 정보 가져오기
        MembersEntity membersEntity = membersRepository.findByUid(uid);
        String tbtiType = membersEntity.getTbtiType();

        // 로그로 확인
        System.out.println("Sending to AI - uid: " + uid + ", tbtiType: " + tbtiType + ", userMessage: " + userMessage);

        // AI로 메시지 전송
        chatService.sendMessageToAI(uid, tbtiType, userMessage);
    }
}
