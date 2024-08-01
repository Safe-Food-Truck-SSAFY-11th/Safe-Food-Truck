package com.safefoodtruck.sft.survey.repository;

import com.safefoodtruck.sft.survey.domain.Survey;
import com.safefoodtruck.sft.survey.dto.SelectSurveysResponseDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    @Query(value = "SELECT new com.safefoodtruck.sft.survey.dto.SelectSurveysResponseDto(s.storeType, COUNT(s)) " +
        "FROM Survey s " +
        "WHERE s.sido LIKE %:sido% " +
        "AND s.sigungu LIKE %:sigungu% " +
        "AND s.dong LIKE %:dong% " +
        "GROUP BY s.storeType")
    List<SelectSurveysResponseDto> findSurveysResponse(
        @Param("sido") String sido,
        @Param("sigungu") String sigungu,
        @Param("dong") String dong
    );
}
