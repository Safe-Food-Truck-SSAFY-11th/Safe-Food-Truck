package com.safefoodtruck.sft.member.dto;

import lombok.Data;

@Data
public class MemberUpdateRequestDto {
    private String email;
    private String nickname;
    private String phoneNumber;
    private String password;
}
