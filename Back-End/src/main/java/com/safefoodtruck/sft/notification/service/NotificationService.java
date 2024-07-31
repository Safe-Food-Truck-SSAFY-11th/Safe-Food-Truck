package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import java.util.List;

public interface NotificationService {
    void sendNotification(SendNotificationRequestDto sendNotificationRequestDto);
    List<SelectNotificationResponseDto> selectNotifications(String userEmail);
}
