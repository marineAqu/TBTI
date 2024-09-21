package com.kibwa.tbti.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    //CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

        //cors 실행
        http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setMaxAge(3600L);
                        return config;
                    }
                }));

        http.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
                        // 마이페이지는 인증된 사용자만 허용 (접근 시 로그인 페이지로 돌아감)
                        //.requestMatchers("/mypage").authenticated()
                        .anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable); // CSRF 보호 비활성화

        http.formLogin(login -> login
                .loginPage("/login")
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
    public PasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder(); //비밀번호 암호화
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

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
