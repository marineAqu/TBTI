package com.kibwa.tbti.principal;

import com.kibwa.tbti.entity.MembersEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;

@Getter
public class PrincipalDetails implements UserDetails {

    private MembersEntity membersEntity;

    public PrincipalDetails(MembersEntity membersEntity) {
        this.membersEntity = membersEntity;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "ROLE_USER";
            }
        });
        return authorities;
    }

    @Override
    public String getPassword() {
        return membersEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return membersEntity.getUid();
    }

    public String getNickName() {
        return membersEntity.getUserName();
    }

    public int getId(){
        return membersEntity.getMemberId();
    }

    // 계정이 만료 되었는지 (true: 만료X)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화(사용가능)인지 (true: 활성화)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
