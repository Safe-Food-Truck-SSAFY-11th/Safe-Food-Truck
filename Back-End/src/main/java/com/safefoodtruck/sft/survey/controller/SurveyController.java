package com.safefoodtruck.sft.survey.controller;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.survey.dto.InsertSurveysRequestDto;
import com.safefoodtruck.sft.survey.exception.AlreadyRegisteredEmailException;
import com.safefoodtruck.sft.survey.exception.UnSatisfyLengthException;
import com.safefoodtruck.sft.survey.service.SurveyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/surveys")
@RestController
@RequiredArgsConstructor
@Slf4j
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping
    @Operation(summary = "수요조사 등록", description = "수요주조사 등록할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "수요조사 등록에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "400",
            description = "수요조사 데이터는 무조건 최소 1개 이상 최대 3개 이하로 구성되어야 합니다.",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "요청을 보낸 사용자는 이미 일일 수요조사 등록 횟수(1회)를 초과하였습니다.",
            content = @Content(mediaType = "application/json")
        )
    })
    public ResponseEntity<?> insertSurveys(
        @RequestBody List<InsertSurveysRequestDto> insertSurveysRequestDtoList
    ) {
        String userEmail = MemberInfo.getEmail();
        surveyService.insertSurveys(userEmail, insertSurveysRequestDtoList);
        return ResponseEntity.status(HttpStatus.OK).body("수요조사 등록 성공");
    }

    @ExceptionHandler({AlreadyRegisteredEmailException.class})
    public ResponseEntity<?> alreadyRegisteredEmailExceptionHandler(
        AlreadyRegisteredEmailException e
    ) {
        log.error("Survey 에러: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }

    @ExceptionHandler({UnSatisfyLengthException.class})
    public ResponseEntity<?> unSatisfyLengthExceptionHandler(UnSatisfyLengthException e) {
        log.error("Survey 에러: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }
}
