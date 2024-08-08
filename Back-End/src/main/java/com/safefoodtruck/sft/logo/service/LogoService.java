package com.safefoodtruck.sft.logo.service;

import com.safefoodtruck.sft.logo.dto.request.LogoCreateRequestDto;
import com.safefoodtruck.sft.logo.dto.response.LogoCreateResponseDto;

public interface LogoService {
    LogoCreateResponseDto createLogo(LogoCreateRequestDto logoCreateRequestDto);
}
