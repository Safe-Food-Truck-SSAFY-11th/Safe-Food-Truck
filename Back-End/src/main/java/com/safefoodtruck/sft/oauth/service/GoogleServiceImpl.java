package com.safefoodtruck.sft.oauth.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.dto.MemberDto;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.oauth.dto.GoogleMemberResponseDto;
import com.safefoodtruck.sft.oauth.exception.AlreadySignUpException;
import com.safefoodtruck.sft.security.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GoogleServiceImpl implements GoogleService {

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;

    @Override
    public GoogleMemberResponseDto getGoogleUser(String accessToken) {
        GoogleMemberResponseDto googleMemberResponseDto = getGoogleUserInfo(accessToken);

        Optional<Member> member = memberRepository.findByEmail(googleMemberResponseDto.getEmail());
        if (member.isPresent()) {
            MemberDto memberDto = mapper.map(member.get(), MemberDto.class);
            String token = jwtUtil.createAccessToken(memberDto);
            throw new AlreadySignUpException(token);
        }
        return googleMemberResponseDto;
    }

    private GoogleMemberResponseDto getGoogleUserInfo(String accessToken) {
        //HTTP 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        //Http 요청 보내기
        HttpEntity<MultiValueMap<String, String>> googleRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v1/userinfo",
                HttpMethod.GET,
                googleRequest,
                String.class
        );

        //Http 응답 (JSON)
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        GoogleMemberResponseDto googleMemberResponseDto = new GoogleMemberResponseDto();
        googleMemberResponseDto.setEmail(jsonNode.get("email").asText());
        return googleMemberResponseDto;
    }
}
