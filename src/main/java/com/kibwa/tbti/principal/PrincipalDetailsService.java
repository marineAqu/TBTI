package com.kibwa.tbti.principal;

import com.kibwa.tbti.entity.MembersEntity;
import com.kibwa.tbti.repository.MembersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
@Service
@Transactional
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final MembersRepository membersRepository;

    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        MembersEntity membersEntity = membersRepository.findByUid(uid);

        if(membersEntity != null) {
            System.out.println("User found with username: " + uid);
            return new PrincipalDetails(membersEntity);
        }

        throw new UsernameNotFoundException("User not found with username: " + uid);
    }
}
