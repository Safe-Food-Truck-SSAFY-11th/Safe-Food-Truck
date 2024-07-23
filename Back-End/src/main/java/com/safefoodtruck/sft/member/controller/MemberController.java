package com.safefoodtruck.sft.member.controller;

import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.service.MemberService;
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
    public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("회원가입 성공!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {
        String accessToken = memberService.login(memberLoginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @GetMapping("/tete")
    @PreAuthorize("hasRole('ROLE_ceo')")
    public String tete() {
        return "FDFD";
    }
}
