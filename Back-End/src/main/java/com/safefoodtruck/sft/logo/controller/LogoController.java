package com.safefoodtruck.sft.logo.controller;

import com.safefoodtruck.sft.logo.dto.request.LogoCreateRequestDto;
import com.safefoodtruck.sft.logo.dto.response.LogoCreateResponseDto;
import com.safefoodtruck.sft.logo.service.LogoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/logos")
@RestController
@RequiredArgsConstructor
@Slf4j
public class LogoController {

    private final LogoService logoService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_vip_owner')")
    public ResponseEntity<?> makeLogo(@RequestBody LogoCreateRequestDto logoCreateRequestDto) {
        LogoCreateResponseDto logoCreateResponseDto = logoService.createLogo(logoCreateRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(logoCreateResponseDto);
    }
}
