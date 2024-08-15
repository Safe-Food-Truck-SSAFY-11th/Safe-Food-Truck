package com.safefoodtruck.sft.notification.controller;

import com.safefoodtruck.sft.common.dto.ErrorResponseDto;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.exception.NotFoundNotificationException;
import com.safefoodtruck.sft.notification.exception.NotSameUserException;
import com.safefoodtruck.sft.notification.repository.NotificationRepository;
import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.security.util.JwtUtil;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "알림 조회", description = "알림을 조회할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "알림을 정상적으로 조회하였습니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "알림을 조회하는데 실패하였습니다.",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> selectNotification() {
        String userEmail = MemberInfo.getEmail();
        List<SelectNotificationResponseDto> notificationList = notificationService.selectNotifications(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body(notificationList);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "알림 삭제", description = "알림을 삭제할 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "알림이 정상적으로 삭제되었습니다.",
            content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500",
            description = "Error Message로 전달함",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> deleteNotification(@PathVariable("id") Integer id) {
        String userEmail = MemberInfo.getEmail();
        notificationService.deleteNotification(id, userEmail);
        return ResponseEntity.status(HttpStatus.OK).body("알림 삭제 완료!");
    }

    @ExceptionHandler({NotFoundNotificationException.class, NotSameUserException.class})
    public ResponseEntity<?> notificationExceptionHandler(Exception e) {
        log.error("Notification 에러: {}", e.getMessage());
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
