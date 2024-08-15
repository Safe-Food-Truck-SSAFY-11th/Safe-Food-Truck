package com.safefoodtruck.sft.notification.dto;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.cglib.core.Local;

@Data
public class SelectNotificationResponseDto {
    private Integer id;
    private String email;
    private String info;
    private LocalDateTime timestamp;
}
