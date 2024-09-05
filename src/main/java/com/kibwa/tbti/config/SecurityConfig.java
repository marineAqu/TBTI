package com.kibwa.tbti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
                        // 마이페이지는 인증된 사용자만 허용 (접근 시 로그인 페이지로 돌아감)
                        //.requestMatchers("/mypage").authenticated()
                        .anyRequest().permitAll())
                .csrf(csrf -> csrf.disable()); // CSRF 보호 비활성화

        http.formLogin(login -> login
                .loginPage("/api/login")
                .usernameParameter("uid")
                .passwordParameter("password")
                .loginProcessingUrl("/login_process")
                .successHandler(loginSuccessHandler())
                .permitAll());

        http.logout(logout -> logout
                .logoutUrl("/api/logout")
                .permitAll()
                .logoutSuccessHandler(logoutSuccessHandler()));

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler loginSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        SimpleUrlLogoutSuccessHandler successHandler = new SimpleUrlLogoutSuccessHandler();
        successHandler.setUseReferer(true);
        return successHandler;
    }

}
