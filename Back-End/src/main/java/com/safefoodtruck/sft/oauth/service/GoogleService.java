package com.safefoodtruck.sft.oauth.service;

import com.safefoodtruck.sft.oauth.dto.GoogleMemberResponseDto;

public interface GoogleService {
    GoogleMemberResponseDto getGoogleUser(String accessToken);
}
