package com.safefoodtruck.sft.security.util;

import com.safefoodtruck.sft.member.dto.MemberDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private final Key key;
    private final long accessTokenExpirationTime;

    public JwtUtil(
            @Value("${jwt.secret}") String secretKey,
            @Value("${jwt.expiration_time}") long accessTokenExpirationTime
    ) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpirationTime = accessTokenExpirationTime;
    }

    /**
     * Access Token 생성
     * @param member
     * @return access token string
     */
    public String createAccessToken(MemberDto member) {
        return createToken(member, accessTokenExpirationTime);
    }

    /**
     * JWT 생성
     * @param member
     * @param expirationTime
     * @return JWT string
     */
    private String createToken(MemberDto member, long expirationTime) {
        Claims claims = Jwts.claims();
        claims.put("user_id", member.getEmail());
        claims.put("user_nickname", member.getNickname());
        claims.put("role", member.getRole());

        ZonedDateTime nowTime = ZonedDateTime.now();
        ZonedDateTime tokenValidityTime = nowTime.plusSeconds(expirationTime);

        return Jwts.builder()
                .setClaims(claims) //Claim 설정
                .setIssuedAt(Date.from(nowTime.toInstant())) //JWT 발행 시간 설정
                .setExpiration(Date.from(tokenValidityTime.toInstant())) //JWT 만료 시간 설정
                .signWith(key, SignatureAlgorithm.HS256) //HMAC SHA-256 알고리즘을 사용하여 서명 지정
                .compact(); //설정된 내용대로 JWT를 직렬화하여 최종적인 JWT 문자열 생성
    }

    /**
     * Token에서 ID 추출
     * @param token
     * @return ID string
     */
    public String getId(String token) {
        return parseClaims(token).get("user_id", String.class);
    }

    /**
     * JWT 검증
     * @param token
     * @return IsValidate
     */
    public boolean validateToken(String token) {
        try {
            //Jwts.parserBuilder()를 사용하여 JWT 파서 빌더 인스턴스를 생성
            //.setSigningKey(key)는 서명 검증에 사용할 키를 설정
            //.build()는 파서 인스턴스를 생성
            //.parseClaimsJws(accessToken)는 제공된 accessToken (JWT 문자열)을 파싱하고 서명을 검증합니다.
            // 서명이 유효하면 JWT의 클레임을 포함하는 Jws<Claims> 객체를 반환
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty", e);
        }
        return false;
    }

    /**
     * JWT Claims 추출
     * @param accessToken
     * @return JWT Claims
     */
    public Claims parseClaims(String accessToken) {
        try {
            //Jwts.parserBuilder()를 사용하여 JWT 파서 빌더 인스턴스를 생성
            //.setSigningKey(key)는 서명 검증에 사용할 키를 설정
            //.build()는 파서 인스턴스를 생성
            //.parseClaimsJws(accessToken)는 제공된 accessToken (JWT 문자열)을 파싱하고 서명을 검증합니다.
            // 서명이 유효하면 JWT의 클레임을 포함하는 Jws<Claims> 객체를 반환
            //.getBody()는 파싱된 JWT의 클레임(Claims)을 반환
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
