package com.safefoodtruck.sft.notification.service;

import static com.safefoodtruck.sft.common.util.EventType.*;

import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.safefoodtruck.sft.favorites.domain.Favorites;
import com.safefoodtruck.sft.favorites.repository.FavoritesRepository;
import com.safefoodtruck.sft.globalnotification.dto.AcceptedNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.ChangeNoticeNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.CompletedNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.FavoriteNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.LiveStartNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.OrderedNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.RegistReviewNotificationDto;
import com.safefoodtruck.sft.globalnotification.dto.RejcetedNotificationDto;
import com.safefoodtruck.sft.globalnotification.service.GlobalNotificationService;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.notification.domain.Notification;
import com.safefoodtruck.sft.notification.dto.SelectNotificationResponseDto;
import com.safefoodtruck.sft.notification.dto.SendNotificationRequestDto;
import com.safefoodtruck.sft.notification.exception.NotFoundNotificationException;
import com.safefoodtruck.sft.notification.exception.NotSameUserException;
import com.safefoodtruck.sft.notification.repository.NotificationRepository;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@EnableAsync
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    private final GlobalNotificationService globalNotificationService;
    private final FavoritesRepository favoritesRepository;
    private final StoreRepository storeRepository;

    @Override
    public void sendNotification(SendNotificationRequestDto sendNotificationRequestDto) {
        String targetEmail = sendNotificationRequestDto.getTargetEmail();
        Member member = memberRepository.findByEmail(targetEmail).orElseThrow(
                NotFoundMemberException::new);

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(sendNotificationRequestDto.getInfo())
                .build());
    }


    @Override
    @Transactional
    public List<SelectNotificationResponseDto> selectNotifications(String userEmail) {
        Member member = memberRepository.findByEmail(userEmail).orElseThrow(
                NotFoundMemberException::new);
        return member.getNotificationList().stream()
                .map(notification -> {
                    SelectNotificationResponseDto dto = modelMapper.map(notification,
                            SelectNotificationResponseDto.class);
                    dto.setEmail(notification.getMember().getEmail());
                    return dto;
                }).toList();
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

    @Async
    @Transactional
    @Override
    public void favoriteSendNotify(Integer storeId, String storeName) {
        List<Favorites> favoriteList = favoritesRepository.findAllByStoreId(storeId);
        for (Favorites favorite : favoriteList) {
            Member member = favorite.getMember();
            String targetEmail = member.getEmail();
            String info = storeName + " 푸드트럭이 오픈하였습니다.";

            notificationRepository.save(Notification.builder()
                    .member(member)
                    .info(info)
                    .build());

            globalNotificationService.sendToClient(targetEmail,
                    new FavoriteNotificationDto(storeName), "open", CUSTOMER.getEventType());
        }
    }

    @Async
    @Transactional
    @Override
    public void acceptedSendNotify(String orderEmail, String storeName, Integer orderId) {
        Member member = memberRepository.findByEmail(orderEmail).orElseThrow(
                NotFoundMemberException::new);
        String info = storeName + " 푸드트럭에서 주문을 수락하였습니다.";

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(info)
                .build());

        globalNotificationService.sendToClient(orderEmail,
                new AcceptedNotificationDto(storeName, orderId), "accepted", CUSTOMER.getEventType());
    }

    @Async
    @Transactional
    @Override
    public void rejectedSendNotify(String orderEmail, String storeName) {
        Member member = memberRepository.findByEmail(orderEmail).orElseThrow(
                NotFoundMemberException::new);
        String info = storeName + " 푸드트럭에서 주문을 거절하였습니다.";

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(info)
                .build());

        globalNotificationService.sendToClient(orderEmail,
                new RejcetedNotificationDto(storeName), "rejected", CUSTOMER.getEventType());
    }

    @Async
    @Transactional
    @Override
    public void completedSendNotify(String orderEmail, String storeName) {
        Member member = memberRepository.findByEmail(orderEmail).orElseThrow(
                NotFoundMemberException::new);
        String info = storeName + " 푸드트럭에서 조리를 완료하였습니다.";

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(info)
                .build());

        globalNotificationService.sendToClient(orderEmail,
                new CompletedNotificationDto(storeName), "completed", CUSTOMER.getEventType());
    }

    @Async
    @Transactional
    @Override
    public void orderedSendNotify(String ownerEmail) {
        Member member = memberRepository.findByEmail(ownerEmail).orElseThrow(NotFoundMemberException::new);
        String info = "주문이 접수되었어요!";

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(info)
                .build());

        globalNotificationService.sendToClient(ownerEmail,
                new OrderedNotificationDto(), "ordered", OWNER.getEventType());
    }

    @Async
    @Transactional
    @Override
    public void changedNoticeNotify(String ownerEmail, Set<String> connectedEmailList) {
        for (String connectedEmail : connectedEmailList) {
            if (ownerEmail.equals(connectedEmail)) continue;
            globalNotificationService.sendToClient(connectedEmail,
                    new ChangeNoticeNotificationDto(), "changed", NOTICE.getEventType());
        }
    }

    @Async
    @Transactional
    @Override
    public void liveStartNotify(Integer storeId) {
        List<Favorites> favoriteList = favoritesRepository.findAllByStoreId(storeId);
        String storeName = storeRepository.findById(storeId)
                .orElseThrow(StoreNotFoundException::new).getName();
        for (Favorites favorite : favoriteList) {
            Member member = favorite.getMember();
            String targetEmail = member.getEmail();
            String info = storeName + " 푸드트럭이 방송을 시작하였습니다.";

            notificationRepository.save(Notification.builder()
                    .member(member)
                    .info(info)
                    .build());

            globalNotificationService.sendToClient(targetEmail,
                    new LiveStartNotificationDto(storeName, storeId), "live start", LIVE.getEventType());
        }
    }

    @Async
    @Transactional
    @Override
    public void registReviewNotify(String ownerEmail, Integer storeId) {
        Member member = memberRepository.findByEmail(ownerEmail).orElseThrow();
        String info = "리뷰가 달렸어요!";

        notificationRepository.save(Notification.builder()
                .member(member)
                .info(info)
                .build());

        globalNotificationService.sendToClient(ownerEmail,
                new RegistReviewNotificationDto(storeId), "review", OWNER.getEventType());
    }
}
