package com.safefoodtruck.sft.oauth.dto;

import lombok.Data;

@Data
public class KakaoMemberResponseDto {
    private String code;
    private String email;
}
