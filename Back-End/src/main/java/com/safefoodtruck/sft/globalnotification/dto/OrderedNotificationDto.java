package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class OrderedNotificationDto {
    private final String message = "주문이 접수되었어요!";
    private LocalDateTime timestamp;

    public OrderedNotificationDto() {
        this.timestamp = LocalDateTime.now();
    }
}
