package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.domain.Notification;
import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.repository.NotificationRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @Override
    public void sendNotification(SendNotificationRequestDto sendNotificationRequestDto) {

        Member member = memberRepository.findByEmail(sendNotificationRequestDto.getTargetEmail());

        notificationRepository.save(Notification.builder()
            .member(member)
            .info(sendNotificationRequestDto.getInfo())
            .build());
    }

    @Override
    public List<SelectNotificationResponseDto> selectNotifications(String userEmail) {
        Member member = memberRepository.findByEmail(userEmail);
        return member.getNotificationList().stream()
            .map(notification -> {
                SelectNotificationResponseDto dto = modelMapper.map(notification, SelectNotificationResponseDto.class);
                dto.setEmail(notification.getMember().getEmail());
                return dto;
            })
            .collect(Collectors.toList());
    }
}
