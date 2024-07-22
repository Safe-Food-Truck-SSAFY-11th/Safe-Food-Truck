package com.safefoodtruck.sft.member.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private static final int IS_RESIGN = 0;

    @Override
    public void signUp(MemberSignUpRequestDto signUpMemberDto) {
        String password = passwordEncoder.encode(signUpMemberDto.getPassword());
        String role = signUpMemberDto.getBusinessNumber() == null ? "customer" : "ceo";
        memberRepository.save(new Member(signUpMemberDto.getEmail(),
                password,
                signUpMemberDto.getName(),
                signUpMemberDto.getNickname(),
                signUpMemberDto.getGender(),
                signUpMemberDto.getBirth(),
                signUpMemberDto.getPhoneNumber(),
                signUpMemberDto.getBusinessNumber(),
                role,
                LocalDateTime.now(),
                IS_RESIGN
                ));
    }
}
