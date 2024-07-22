package com.safefoodtruck.sft.member.service;

import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;

public interface MemberService {
    public void signUp(MemberSignUpRequestDto signUpMemberDto);
}
