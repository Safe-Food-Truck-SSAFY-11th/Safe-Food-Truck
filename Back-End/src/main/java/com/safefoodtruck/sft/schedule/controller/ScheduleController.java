package com.safefoodtruck.sft.schedule.controller;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.schedule.dto.request.ScheduleInsertRequestDto;
import com.safefoodtruck.sft.schedule.dto.response.ScheduleSelectResponseDto;
import com.safefoodtruck.sft.schedule.exception.InvalidRangeDayException;
import com.safefoodtruck.sft.schedule.exception.NotInsertedStoreException;
import com.safefoodtruck.sft.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/schedules")
@RestController
@RequiredArgsConstructor
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/{storeId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "스케줄 조회", description = "스케줄을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "스케줄이 정상적으로 조회되었습니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> selectSchedule(@PathVariable("storeId") Integer storeId) {
        ScheduleSelectResponseDto scheduleList = scheduleService.selectSchedule(storeId);
        return ResponseEntity.status(HttpStatus.OK).body(scheduleList);
    }

    @PostMapping()
    @PreAuthorize("hasAnyRole('ROLE_owner', 'ROLE_vip_owner')")
    @Operation(summary = "스케줄 등록", description = "스케줄을 등록할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "스케줄이 정상적으로 등록되었습니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> insertSchedule(
        @RequestBody ScheduleInsertRequestDto scheduleInsertRequestDto
    ) {
        String ownerEmail = MemberInfo.getEmail();
        scheduleService.insertSchedule(ownerEmail, scheduleInsertRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("스케줄 등록 성공");
    }

    @ExceptionHandler({NotInsertedStoreException.class, InvalidRangeDayException.class})
    public ResponseEntity<?> notificationExceptionHandler(Exception e) {
        log.error("Schedule 에러: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_JSON)
            .body(new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage(),
                    LocalDateTime.now()
                )
            );
    }
}
