package com.safefoodtruck.sft.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberLoginRequestDto {
    private String id;
    private String password;
}
