package com.safefoodtruck.sft.member.controller;

import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    @Operation(summary = "회원가입", description = "회원가입 할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "회원가입에 성공하였습니다!", content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("회원가입에 성공하였습니다!");
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
}
