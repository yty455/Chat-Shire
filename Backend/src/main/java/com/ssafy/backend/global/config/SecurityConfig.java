package com.ssafy.backend.global.config;


import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.jwt.filter.JwtAuthenticationProcessingFilter;
import com.ssafy.backend.global.jwt.service.JwtService;
import com.ssafy.backend.oauth2.OAuth2LoginFailureHandler;
import com.ssafy.backend.oauth2.OAuth2LoginSuccessHandler;
import com.ssafy.backend.oauth2.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * 인증은 CustomJsonUsernamePasswordAuthenticationFilter에서 authenticate()로 인증된 사용자로 처리
 * JwtAuthenticationProcessingFilter는 AccessToken, RefreshToken 재발급
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //    private final LoginService loginService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    protected SecurityFilterChain config(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource());
        http
                .formLogin().disable() // 기본 제공되는 FormLogin 사용 X
                .httpBasic().disable() // httpBasic 사용 X
                .csrf().disable() // csrf 보안 사용 X -> 서버에 인증 정보를 요청하지 않고 JWT로 할거니까
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/gs-guide-websocket/**").permitAll() // 웹소켓 테스트
                .antMatchers("/topic/**").permitAll() // 웹소켓 테스트
                .antMatchers("/hello/**").permitAll() // 웹소켓 테스트
                .antMatchers("/app.js").permitAll() // 웹소켓 테스트
                .antMatchers("/webjars/**").permitAll() // 웹소켓 테스트
                .antMatchers("/main.css").permitAll() // 웹소켓 테스트
                .antMatchers("/home/**").permitAll()
                .antMatchers("/skills").permitAll() // 회원가입 추가정보 받을때 언어스킬 목록 출력
                .antMatchers("/oauth2/sign-up/**").permitAll()
                .antMatchers("/distributed/start").permitAll()
                // 아이콘, css, js 관련
                // 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 인증없이 모두 접근 가능, h2-console에 접근 가능
                .antMatchers("/", "/v3/api-docs/**", "/swagger-ui/**", "/css/**", "/images/**", "/js/**", "/favicon.ico",
                        "/h2-console/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**/*").permitAll() // options 무시
                .antMatchers("/couple-certification", "/auto-login", "/invitation/share/*", "/user-logout").permitAll() // 커플 인증 요청 접근 가능
                .anyRequest().authenticated() // 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/login")
                .and()
                .redirectionEndpoint()
                .baseUri("/login/oauth2/code/github")
                .and()
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
        http.addFilterAfter(jwtAuthenticationProcessingFilter(), LogoutFilter.class);
        return http.build();

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        //허용할 url 설정
        configuration.addAllowedOrigin("http://j9e205.p.ssafy.io");
        //허용할 헤더 설정
        configuration.addAllowedHeader("*");
        //허용할 http method
        configuration.addAllowedMethod("*");
        // 클라이언트가 접근 할 수 있는 서버 응답 헤더
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Authorization-Refresh");
        //사용자 자격 증명이 지원되는지 여부
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        return new JwtAuthenticationProcessingFilter(jwtService, userRepository);
    }
}