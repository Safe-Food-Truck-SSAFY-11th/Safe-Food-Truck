package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class RegistReviewNotificationDto {
    private Integer storeId;
    private final String message = "리뷰가 달렸어요!";
    private LocalDateTime timestamp;

    public RegistReviewNotificationDto(Integer storeId) {
        this.storeId = storeId;
        this.timestamp = LocalDateTime.now();
    }
}
