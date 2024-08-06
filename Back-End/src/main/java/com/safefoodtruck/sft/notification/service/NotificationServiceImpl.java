package com.safefoodtruck.sft.notification.service;

import com.safefoodtruck.sft.globalnotification.dto.SampleSseResponse;
import com.safefoodtruck.sft.globalnotification.service.GlobalNotificationService;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.domain.Notification;
import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.exception.NotFoundNotificationException;
import com.safefoodtruck.sft.notification.exception.NotSameUserException;
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

    private final GlobalNotificationService globalNotificationService;

    @Override
    public void sendNotification(SendNotificationRequestDto sendNotificationRequestDto) {
        String targetEmail = sendNotificationRequestDto.getTargetEmail();
        Member member = memberRepository.findByEmail(targetEmail);

        notificationRepository.save(Notification.builder()
            .member(member)
            .info(sendNotificationRequestDto.getInfo())
            .build());

        SampleSseResponse sample = SampleSseResponse.builder()
            .name("JANG")
            .message("NEW MESSAGE")
            .build();

        globalNotificationService.notify(targetEmail, sample, "SSE 테스트 입니당");
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

    @Override
    public void deleteNotification(Integer id, String userEmail) {
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(NotFoundNotificationException::new);

        if (!notification.getMember().getEmail().equals(userEmail)) {
            throw new NotSameUserException();
        }
        notificationRepository.delete(notification);
    }
}
