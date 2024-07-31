package com.safefoodtruck.sft.notification.dto;

import lombok.Data;

@Data
public class SendNotificationRequestDto {
    private String targetEmail;
    private String info;
}
