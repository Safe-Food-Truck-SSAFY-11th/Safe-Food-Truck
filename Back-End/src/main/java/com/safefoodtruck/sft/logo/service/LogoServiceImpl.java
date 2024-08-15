package com.safefoodtruck.sft.logo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safefoodtruck.sft.logo.dto.request.LogoCreateRequestDto;
import com.safefoodtruck.sft.logo.dto.response.LogoCreateResponseDto;
import com.safefoodtruck.sft.logo.util.KakaoLogoRequestUtil;
import com.safefoodtruck.sft.logo.util.PapagoTransRequestUtil;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@EnableAsync
public class LogoServiceImpl implements LogoService {

    @Value("${kakao-logo-app-key}")
    private String appKey;

    @Value("${PAPAGO_CLIENT_0ID}")
    private String PAPAGO_CLIENT_0ID;

    @Value("${PAPAGO_CLIENT_SECRET}")
    private String PAPAGO_CLIENT_SECRET;

    @Override
    public LogoCreateResponseDto createLogo(LogoCreateRequestDto logoCreateRequestDto) {
        //HTTP 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + appKey);
        headers.add("Content-Type", "application/json");

        //HTTP 바디 생성
        String prompt = makePrompt(logoCreateRequestDto);
        Map<String, Object> body = KakaoLogoRequestUtil.makeHttpBody(prompt);

        //Http 요청 보내기
        HttpEntity<Map<String, Object>> kakaoRequest = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
            "https://api.kakaobrain.com/v2/inference/karlo/t2i",
            HttpMethod.POST,
            kakaoRequest,
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

        log.info("RESPONSE = " + jsonNode);

        return new LogoCreateResponseDto(jsonNode.get("images").get(0).get("image").asText());
    }

    private String makePrompt(LogoCreateRequestDto logoCreateRequestDto) {

        //HTTP 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-NCP-APIGW-API-KEY-ID", PAPAGO_CLIENT_0ID);
        headers.add("X-NCP-APIGW-API-KEY", PAPAGO_CLIENT_SECRET);
        headers.add("Content-Type", "application/json");

        //HTTP 바디 생성
        Map<String, Object> body = PapagoTransRequestUtil.makeHttpBody(logoCreateRequestDto.getLogoStyle());

        //Http 요청 보내기
        HttpEntity<Map<String, Object>> transRequest = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
            "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation",
            HttpMethod.POST,
            transRequest,
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

        log.info("TRANSRATE RESULT = " + jsonNode);

        return jsonNode.get("message").get("result").get("translatedText").asText();
    }
}