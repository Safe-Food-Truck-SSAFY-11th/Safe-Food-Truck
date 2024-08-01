package com.safefoodtruck.sft.notification.dto;

import lombok.Data;

@Data
public class SelectNotificationResponseDto {
    private Integer id;
    private String email;
    private String info;
}
