package com.safefoodtruck.sft.logo.dto.request;

import lombok.Data;

@Data
public class LogoCreateRequestDto {
    private String storeName;
    private String storeType;
    private String logoStyle;
}
