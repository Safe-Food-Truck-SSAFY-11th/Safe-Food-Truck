package com.safefoodtruck.sft.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberDto {
    private String email;
    String password;
    String name;
    String nickname;
    int gender;
    String birth;
    String phoneNumber;
    String businessNumber;
    String role;
    String regDate;
    int isResign;
}
