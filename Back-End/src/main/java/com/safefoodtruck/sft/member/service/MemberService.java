package com.safefoodtruck.sft.member.service;

import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;

public interface MemberService {
    String signUp(MemberSignUpRequestDto signUpMemberDto, String signUpMethod);
    String login(MemberLoginRequestDto memberLoginRequestDto);
}
