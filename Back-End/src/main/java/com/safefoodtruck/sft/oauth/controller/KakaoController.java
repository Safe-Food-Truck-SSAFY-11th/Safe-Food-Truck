package com.safefoodtruck.sft.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.oauth.dto.AlreadySignUpResponseDto;
import com.safefoodtruck.sft.oauth.dto.KakaoMemberResponseDto;
import com.safefoodtruck.sft.oauth.exception.AlreadySignUpException;
import com.safefoodtruck.sft.oauth.service.KakaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/oauth/kakao")
@RestController
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService kakaoService;
    private final ObjectMapper objectMapper;

    @Operation(
        summary = "카카오 회원가입 요청",
        description = "카카오 회원가입 할 때 사용하는 API, 인가 코드를 넘겨줘야함")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "code와 email이 담긴 객체를 넘겨줌, 프론트는 이제 기존 서비스 회원가입을 진행해야함",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "303",
            description = "이미 가입되어 있는 회원임. Access Token을 넘겨주니 이를 저장하고 메인페이지로 이동해야함",
            content = @Content(mediaType = "application/json")
        )
    })
    @PostMapping("/code")
    public ResponseEntity<?> checkCode(@RequestParam("code") String code) {
        KakaoMemberResponseDto kakaoMemberResponseDto = kakaoService.getKakaoUser(code);
        return ResponseEntity.status(HttpStatus.OK).body(kakaoMemberResponseDto);
    }

    @ExceptionHandler(AlreadySignUpException.class)
    public ResponseEntity<?> alreadySignUp(AlreadySignUpException e)
        throws JsonProcessingException {
        AlreadySignUpResponseDto alreadySignUpResponseDto = new AlreadySignUpResponseDto(
            303,
            "이미 소셜회원가입이 된 아이디 입니다.",
            e.getMessage(),
            LocalDateTime.now()
        );

        String responseBody = objectMapper.writeValueAsString(alreadySignUpResponseDto);
        return ResponseEntity.status(303)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
