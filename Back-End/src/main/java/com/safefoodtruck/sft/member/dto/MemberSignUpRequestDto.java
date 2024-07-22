package com.safefoodtruck.sft.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class MemberSignUpRequestDto {
    private String email;
    String password;
    String name;
    String nickname;
    int gender;
    LocalDate birth;
    String phoneNumber;
    String businessNumber;
    String role;
}
