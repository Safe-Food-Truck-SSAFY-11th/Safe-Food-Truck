package com.safefoodtruck.sft.survey.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.survey.domain.Survey;
import com.safefoodtruck.sft.survey.dto.InsertSurveysRequestDto;
import com.safefoodtruck.sft.survey.dto.SelectSurveysResponseDto;
import com.safefoodtruck.sft.survey.exception.AlreadyRegisteredEmailException;
import com.safefoodtruck.sft.survey.exception.UnSatisfyLengthException;
import com.safefoodtruck.sft.survey.repository.SurveyRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository surveyRepository;
    private final MemberRepository memberRepository;

    @Override
    public void insertSurveys(
        String userEmail,
        List<InsertSurveysRequestDto> insertSurveysRequestDtoList
    ) {
        int size = insertSurveysRequestDtoList.size();
        if (size == 0 || size > 3) {
            throw new UnSatisfyLengthException();
        }

        Member member = memberRepository.findByEmail(userEmail);
        if (!member.getSurveyList().isEmpty()) {
            throw new AlreadyRegisteredEmailException();
        }

        for (InsertSurveysRequestDto insertSurveyRequestDto : insertSurveysRequestDtoList) {
            surveyRepository.save(Survey.builder()
                .member(member)
                .storeType(insertSurveyRequestDto.getStoreType())
                .sido(insertSurveyRequestDto.getSido())
                .sigungu(insertSurveyRequestDto.getSigungu())
                .dong(insertSurveyRequestDto.getDong())
                .latitude(insertSurveyRequestDto.getLatitude())
                .longitude(insertSurveyRequestDto.getLongitude())
                .build());
        }
    }

    @Override
    public List<SelectSurveysResponseDto> selectSurveys(String sigungu, String gugun) {

        return List.of();
    }
}
