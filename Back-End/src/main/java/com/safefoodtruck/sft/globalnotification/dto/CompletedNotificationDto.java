package com.safefoodtruck.sft.globalnotification.dto;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CompletedNotificationDto {
    private String storeName;
    private Integer orderId;
    private final String message = "조리완료! 빠르게 픽업하세요";
    private LocalDateTime timestamp;

    public CompletedNotificationDto(String storeName, Integer orderId) {
        this.storeName = storeName;
        this.orderId = orderId;
        this.timestamp = LocalDateTime.now();
    }
}
