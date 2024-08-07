package com.safefoodtruck.sft.globalnotification.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FavoriteNotificationDto {
    private String storeName;
    private final String message = "찜한 가게가 오픈했어요";
    private LocalDateTime timestamp;

    public FavoriteNotificationDto(String storeName) {
        this.storeName = storeName;
        this.timestamp = LocalDateTime.now();
    }
}
