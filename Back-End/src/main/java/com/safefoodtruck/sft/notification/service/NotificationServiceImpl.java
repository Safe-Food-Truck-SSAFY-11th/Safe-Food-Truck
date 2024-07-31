package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.domain.Notification;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService  {

    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    @Override
    public void sendNotification(SendNotificationRequestDto sendNotificationRequestDto) {

        Member member = memberRepository.findByEmail(sendNotificationRequestDto.getTargetEmail());

        notificationRepository.save(Notification.builder()
            .member(member)
            .info(sendNotificationRequestDto.getInfo())
            .build());
    }
}
