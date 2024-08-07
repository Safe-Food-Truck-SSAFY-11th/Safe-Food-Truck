package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class RejcetedNotificationDto {
    private String storeName;
    private final String message = "주문을 거절했어요";
    private LocalDateTime timestamp;

    public RejcetedNotificationDto(String storeName) {
        this.storeName = storeName;
        this.timestamp = LocalDateTime.now();
    }
}
