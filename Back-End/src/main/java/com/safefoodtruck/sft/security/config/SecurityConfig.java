package com.safefoodtruck.sft.security.config;

import com.test.security.util.JwtUtil;
import com.test.security.util.securityUtil.CustomAccessDeniedHandler;
import com.test.security.util.securityUtil.CustomAuthenticationEntryPoint;
import com.test.security.util.securityUtil.CustomUserDetailsService;
import com.test.security.util.securityUtil.JwtAuthFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@AllArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;

    private static final String[] AUTH_PERMIT_PATH_LIST = {
        "/", "/auth/sign-up"
    };

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf((csrfConfig) ->
                csrfConfig.disable()
            )
            .cors(Customizer.withDefaults())

            //세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS
            ))

            //FormLogin, BasicHttp 비활성화
            .formLogin((form) -> form.disable())
            .httpBasic(AbstractHttpConfigurer::disable)

            //JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
            .addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil),
                UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling((exceptionHandling) -> exceptionHandling
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler))

            // 권한 규칙 작성
            .authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
                    .requestMatchers(AUTH_PERMIT_PATH_LIST).permitAll()
                    //@PreAuthrization을 사용할 것이기 때문에 모든 경로에 대한 인증처리는 Pass
                    .anyRequest().permitAll()
            );

        return http.build();
    }
}
