package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;

public interface NotificationService {
    void sendNotification(SendNotificationRequestDto sendNotificationRequestDto);
}
