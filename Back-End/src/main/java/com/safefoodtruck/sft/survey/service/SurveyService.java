package com.safefoodtruck.sft.survey.service;

import com.safefoodtruck.sft.survey.dto.InsertSurveysRequestDto;
import java.util.List;

public interface SurveyService {
    void insertSurveys(String userEmail, List<InsertSurveysRequestDto> insertSurveysRequestDtoList);
}
