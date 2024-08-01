package com.safefoodtruck.sft.notification.repository;

import com.safefoodtruck.sft.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}
