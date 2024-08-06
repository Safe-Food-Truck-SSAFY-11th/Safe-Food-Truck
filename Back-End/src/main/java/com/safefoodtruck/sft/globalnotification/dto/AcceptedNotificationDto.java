package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AcceptedNotificationDto {
    private String storeName;
    private final String message = "주문을 수락했어요!";
    private LocalDateTime timestamp;

    public AcceptedNotificationDto(String storeName) {
        this.storeName = storeName;
        this.timestamp = LocalDateTime.now();
    }
}
