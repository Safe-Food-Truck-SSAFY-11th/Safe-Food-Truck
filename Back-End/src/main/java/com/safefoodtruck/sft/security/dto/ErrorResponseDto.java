package com.safefoodtruck.sft.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponseDto {

    private int codeNumber;
    private String errorMessage;
    private LocalDateTime time;
}
