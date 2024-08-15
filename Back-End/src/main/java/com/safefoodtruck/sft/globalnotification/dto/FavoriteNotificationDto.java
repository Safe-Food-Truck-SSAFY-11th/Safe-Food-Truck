package com.safefoodtruck.sft.globalnotification.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FavoriteNotificationDto {
    private String storeName;
    private Integer storeId;
    private final String message = "찜한 가게가 오픈했어요";
    private LocalDateTime timestamp;

    public FavoriteNotificationDto(String storeName, Integer storeId) {
        this.storeName = storeName;
        this.storeId = storeId;
        this.timestamp = LocalDateTime.now();
    }
}
