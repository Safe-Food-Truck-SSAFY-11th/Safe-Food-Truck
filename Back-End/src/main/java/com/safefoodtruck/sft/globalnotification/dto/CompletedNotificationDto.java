package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CompletedNotificationDto {
    private String storeName;
    private final String message = "조리완료! 빠르게 픽업하세요";
    private LocalDateTime timestamp;

    public CompletedNotificationDto(String storeName) {
        this.storeName = storeName;
        this.timestamp = LocalDateTime.now();
    }
}
