package com.safefoodtruck.sft.security.config;

import com.safefoodtruck.sft.security.CustomUserDetailsService;
import com.safefoodtruck.sft.security.filter.JwtAuthFilter;
import com.safefoodtruck.sft.security.handler.CustomAccessDeniedHandler;
import com.safefoodtruck.sft.security.handler.CustomAuthenticationEntryPoint;
import com.safefoodtruck.sft.security.util.JwtUtil;
import java.util.Arrays;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
        "/", "/api/members"
    };

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드 설정
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 헤더 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

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
                    //.requestMatchers(AUTH_PERMIT_PATH_LIST).permitAll()
                    //@PreAuthrization을 사용할 것이기 때문에 모든 경로에 대한 인증처리는 Pass
                    .anyRequest().permitAll()
            );

        return http.build();
    }
}
