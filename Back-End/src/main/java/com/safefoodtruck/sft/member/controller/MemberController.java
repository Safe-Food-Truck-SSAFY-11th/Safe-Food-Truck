package com.safefoodtruck.sft.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSelectResponseDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.exception.MemberDuplicateException;
import com.safefoodtruck.sft.member.service.MemberService;
import com.safefoodtruck.sft.security.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.time.LocalDateTime;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "회원정보 조회", description = "회원정보 조회시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "회원정보 조회 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    public ResponseEntity<?> selectMember(@RequestHeader(value = "Authorization") String tokenHeader) {
        System.out.println(tokenHeader.substring(7));
        String userEmail = jwtUtil.getId(tokenHeader.substring(7));
        MemberSelectResponseDto memberSelectResponseDto = memberService.selectMember(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(memberSelectResponseDto);
    }

    @GetMapping("/duplication-email/{email}")
    @Operation(summary = "이메일 중복확인", description = "회원가입시 이메일 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 이메일 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<?> isDuplicateEmail(@PathVariable("email") String email) {
        String responseMessage = memberService.checkDuplicateEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @GetMapping("/duplication-nickname/{nickname}")
    @Operation(summary = "닉네임 중복확인", description = "회원가입시 닉네임 중복체크에 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Duplicate: 중복 | Possible: 해당 닉네임 사용가능",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<?> isDuplicateNickname(@PathVariable("nickname") String nickname) {
        String responseMessage = memberService.checkDuplicateNickname(nickname);
        return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
    }

    @PostMapping("/{method}")
    @Operation(summary = "회원가입", description = "회원가입 할 때 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "회원가입에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "PathVariable이 잘못됨. (common, kakao, google) 중 하나여야함",
                    content = @Content(mediaType = "application/json")
            )
    })
    public ResponseEntity<?> signUp(
            @RequestBody MemberSignUpRequestDto memberSignUpRequestDto,
            @PathVariable("method") String signUpMethod
    ) {
        if (!(signUpMethod.equals("common")
                || signUpMethod.equals("kakao")
                || signUpMethod.equals("google"))) {
            return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponseDto(
                            HttpStatus.NOT_FOUND.value(),
                            "잘못된 URI 입니다.",
                            LocalDateTime.now()
                    )
            );
        }

        String accessToken = memberService.signUp(memberSignUpRequestDto, signUpMethod);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인 할 때 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "토큰 값 예시)\n"
                            + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiamFuZzIzQG5hdmVyLmNvbSIsInVzZXJfbmlja25hbW"
                            + "UiOiLsrYzsi53snbTsi7jsnqUiLCJyb2xlIjoiY2VvIiwiaWF0IjoxNzIxNjk3NDU4LCJleHAiOjE3Mj"
                            + "UyOTc0NTh9.qkfDyphrra4cAqlOyIxVjz79mb4D2ECWnkOcGkYTSI8",
                    content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {
        String accessToken = memberService.login(memberLoginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @ExceptionHandler({MemberDuplicateException.class})
    public ResponseEntity<?> memberDuplicateException(Exception e) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorResponseDto(
                                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                e.getMessage(),
                                LocalDateTime.now()
                        )
                );
    }
}
