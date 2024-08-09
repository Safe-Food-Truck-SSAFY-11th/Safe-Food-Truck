package com.safefoodtruck.sft.globalnotification.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ChangeNoticeNotificationDto {
    private final String MESSAGE = "공지사항이 수정되었어요";
    private LocalDateTime timestamp;

    public ChangeNoticeNotificationDto() {
        this.timestamp = LocalDateTime.now();
    }
}
