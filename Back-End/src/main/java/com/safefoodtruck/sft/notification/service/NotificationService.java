package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import java.util.List;
import java.util.Set;

public interface NotificationService {
    void sendNotification(SendNotificationRequestDto sendNotificationRequestDto);
    List<SelectNotificationResponseDto> selectNotifications(String userEmail);
    void deleteNotification(Integer id, String userEmail);
    void favoriteSendNotify(Integer storeId, String storeName);
    void acceptedSendNotify(String orderEmail, String storeName, Integer orderId);
    void rejectedSendNotify(String orderEmail, String storeName);
    void completedSendNotify(String orderEmail, String storeName);
    void orderedSendNotify(String ownerEmail);
    void changedNoticeNotify(Set<String> connectedEmailList);
}
