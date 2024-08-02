package com.safefoodtruck.sft.survey.dto;

import lombok.Data;

@Data
public class SelectSurveysResponseDto {
    private String storeType;
    private Long surveyCount;

    public SelectSurveysResponseDto(String storeType, Long surveyCount) {
        this.storeType = storeType;
        this.surveyCount = surveyCount;
    }
}
