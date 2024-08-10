package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class LiveStartNotificationDto {
    private String storeName;
    private Integer storeId;
    private final String message = "방송을 시작했어요";
    private LocalDateTime timestamp;

    public LiveStartNotificationDto(String storeName, Integer storeId) {
        this.storeName = storeName;
        this.storeId = storeId;
        this.timestamp = LocalDateTime.now();
    }
}
