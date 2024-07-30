package com.safefoodtruck.sft.member.service;

import com.safefoodtruck.sft.member.dto.MemberDto;
import com.safefoodtruck.sft.member.dto.MemberLoginRequestDto;
import com.safefoodtruck.sft.member.dto.MemberSelectResponseDto;
import com.safefoodtruck.sft.member.dto.MemberSignUpRequestDto;
import com.safefoodtruck.sft.member.dto.MemberUpdateRequestDto;

public interface MemberService {
    String signUp(MemberSignUpRequestDto signUpMemberDto, String signUpMethod);
    String login(MemberLoginRequestDto memberLoginRequestDto);
    MemberSelectResponseDto selectMember(String email);
    String checkDuplicateEmail(String email);
    String checkDuplicateNickname(String nickname);
    void updateMember(MemberUpdateRequestDto memberUpdateRequestDto);
    void updateIsResign(String email);
    void joinVip(String email);
    void deactivateVip(String email);
}
