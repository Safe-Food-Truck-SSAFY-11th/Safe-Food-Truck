package com.safefoodtruck.sft.survey.repository;

import com.safefoodtruck.sft.survey.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Integer> {
}
