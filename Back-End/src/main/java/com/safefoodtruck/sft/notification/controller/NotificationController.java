package com.safefoodtruck.sft.notification.controller;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.security.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final JwtUtil jwtUtil;

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

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "알림 보내기", description = "알림을 보낼 때 사용하는 API")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200",
            description = "알림이 정상적으로 전송되었습니다.",
            content = @Content(mediaType = "application/json"))
    })
    public ResponseEntity<?> sendNotification(
        @RequestBody SendNotificationRequestDto sendNotificationRequestDto
    ) {
        notificationService.sendNotification(sendNotificationRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("알림 전송 완료!");
    }
}
