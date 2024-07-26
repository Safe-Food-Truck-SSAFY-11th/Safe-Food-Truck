package com.safefoodtruck.sft.oauth.service;

import com.safefoodtruck.sft.oauth.dto.KakaoMemberResponseDto;

public interface KakaoService {
    KakaoMemberResponseDto getKakaoUser(String code);
}
