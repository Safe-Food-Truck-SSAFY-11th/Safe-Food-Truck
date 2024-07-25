package com.safefoodtruck.sft.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.oauth.dto.AlreadySignUpResponseDto;
import com.safefoodtruck.sft.oauth.dto.KakaoMemberResponseDto;
import com.safefoodtruck.sft.oauth.exception.AlreadySignUpException;
import com.safefoodtruck.sft.oauth.service.KakaoService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/oauth/kakao")
@RestController
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;
    private final ObjectMapper objectMapper;

    @GetMapping("/code")
    public ResponseEntity<?> checkCode(@RequestParam("code") String code) {
        KakaoMemberResponseDto kakaoMemberResponseDto = kakaoService.getKakaoUser(code);
        return ResponseEntity.status(HttpStatus.OK).body(kakaoMemberResponseDto);
    }

    @ExceptionHandler(AlreadySignUpException.class)
    public ResponseEntity<?> alreadySignUp(AlreadySignUpException e)
        throws JsonProcessingException {
        AlreadySignUpResponseDto alreadySignUpResponseDto = new AlreadySignUpResponseDto(
            303,
            "이미 소셜회원가입은 한 아이디 입니다.",
            e.getMessage(),
            LocalDateTime.now()
        );

        String responseBody = objectMapper.writeValueAsString(alreadySignUpResponseDto);
        return ResponseEntity.status(303)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
