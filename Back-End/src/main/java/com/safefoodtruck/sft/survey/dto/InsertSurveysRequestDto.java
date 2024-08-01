package com.safefoodtruck.sft.survey.dto;

import lombok.Data;

@Data
public class InsertSurveysRequestDto {
    private String email;
    private String storeType;
    private String dong;
    private String sigungu;
    private String latitude;
    private String longitude;
}
