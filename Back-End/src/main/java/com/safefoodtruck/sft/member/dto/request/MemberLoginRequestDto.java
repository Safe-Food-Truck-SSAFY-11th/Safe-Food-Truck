package com.safefoodtruck.sft.member.dto.request;

import lombok.Data;

@Data
public class MemberLoginRequestDto {
    private String email;
    private String password;
}
