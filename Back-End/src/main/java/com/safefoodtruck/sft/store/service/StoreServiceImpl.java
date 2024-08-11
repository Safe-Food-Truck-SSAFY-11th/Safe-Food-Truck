package com.safefoodtruck.sft.store.service;

import static com.safefoodtruck.sft.common.message.ValidationMessage.*;
import static com.safefoodtruck.sft.review.domain.QReview.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.Tuple;
import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.review.repository.ReviewRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.domain.StoreImage;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreNoticeRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreNoticeResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreImageRepository;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

	private final StoreRepository storeRepository;
	private final MemberRepository memberRepository;
	private final StoreImageRepository storeImageRepository;
	private final ReviewRepository reviewRepository;
	private final NotificationService notificationService;

	@Override
	public void registStore(StoreRegistRequestDto storeRegistRequestDto) {
		Member owner = findLoginOwner();
		Store store = Store.of(owner, storeRegistRequestDto);
		store.setOwner(owner);
		Store savedStore = storeRepository.save(store);

		Optional.ofNullable(storeRegistRequestDto.storeImageDto())
			.ifPresent(storeImageDto -> {
				StoreImage storeImage = StoreImage.builder()
					.store(savedStore)
					.savedUrl(storeImageDto.savedUrl())
					.savedPath(storeImageDto.savedPath())
					.build();
				storeImageRepository.save(storeImage);
			});
	}

	@Override
	public StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto) {
		Store store = findLoginStore();
		store.update(storeUpdateRequestDto);

		Optional.ofNullable(storeImageRepository.findByStore(store))
			.ifPresent(storeImage -> {
				storeImage.updateStoreImage(storeUpdateRequestDto.storeImageDto());
				storeImageRepository.save(storeImage);
			});

		return StoreUpdateResponseDto.fromEntity(storeRepository.save(store));
	}

	@Override
	public StoreFindResponseDto findMyStore() {
		Store store = findLoginStore();
		Integer averageStar = findStoreAverageStar(store.getId()).intValue();
		return StoreFindResponseDto.fromEntity(store, averageStar);
	}

	@Override
	public StoreFindResponseDto findStoreById(Integer storeId) {
		Store store = findStore(storeId);
		Integer averageStar = findStoreAverageStar(storeId).intValue();
		return StoreFindResponseDto.fromEntity(store, averageStar);
	}

	@Override
	public MenuListResponseDto findStoreMenus(Integer storeId) {
		Store store = findStore(storeId);
		List<MenuResponseDto> menuResponseDtos = store.getMenuList().stream()
			.map(MenuResponseDto::fromEntity)
			.toList();

		return new MenuListResponseDto(menuResponseDtos.size(), menuResponseDtos);
	}

	@Override
	public void deleteStore() {
		Integer storeId = storeRepository.findStoreIdByOwnerEmail(MemberInfo.getEmail())
			.orElseThrow(StoreNotFoundException::new);
		storeRepository.deleteById(storeId);
	}

	@Override
	public Boolean updateStoreStatus() {
		Store store = findLoginStore();
		store.toggleOpenStatus();
		Boolean status = store.getIsOpen();
		if (Boolean.TRUE.equals(status)) {
			notificationService.favoriteSendNotify(store.getId(), store.getName());
		}
		return status;
	}

	@Override
	public boolean getStoreStatus() {
		return findLoginStore().getIsOpen();
	}

	@Override
	public StoreInfoListResponseDto findOpenStores() {
		List<Store> openStores = storeRepository.findAllOpenStores();

		Map<Integer, Double> averageStarsMap = reviewRepository.findAverageStarsForAllStores().stream()
			.collect(Collectors.toMap(
				tuple -> tuple.get(review.order.store.id),
				StoreServiceImpl::apply,
				(existing, replacement) -> {
					throw new IllegalStateException("중복 키 발생 : " + existing);
				}
			));


		List<StoreInfoResponseDto> storeInfoResponseDtos = openStores.stream()
			.map(store -> StoreInfoResponseDto.fromEntity(store, averageStarsMap.getOrDefault(store.getId(), 0.0).intValue()))
			.toList();

		return new StoreInfoListResponseDto(storeInfoResponseDtos.size(), storeInfoResponseDtos);
	}

	@Override
	public void updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto) {
		Store store = findLoginStore();
		store.updateStoreLocation(storeLocationRequestDto);
		storeRepository.save(store);
	}

	@Override
	public void updateStoreNotice(StoreNoticeRegistRequestDto storeNoticeRegistRequestDto) {
		// if (storeNoticeRegistRequestDto.connectedEmailList() == null) {
		// 	throw new NullListException();
		// }
		Store store = findLoginStore();
		store.updateNotice(storeNoticeRegistRequestDto.notice());
		storeRepository.save(store);
		// notificationService.changedNoticeNotify(store.getOwner().getEmail(), storeNoticeRegistRequestDto.connectedEmailList());
	}

	@Override
	public StoreNoticeResponseDto findStoreNotice(Integer storeId) {
		return StoreNoticeResponseDto.fromEntity(findStore(storeId));
	}

	@Override
	public void deleteStoreNotice() {
		Store store = findLoginStore();
		store.deleteNotice();
		storeRepository.save(store);
	}

	@Override
	public String checkDuplicateSafetyLicenseNumber(final String safetyLicenseNumber) {
		boolean exists = storeRepository.findStoreWithMenusAndImagesBySafetyLicenseNumber(safetyLicenseNumber)
			.isPresent();
		return exists ? DUPLICATE.get() : POSSIBLE.get();
	}

	private Store findLoginStore() {
		return storeRepository.findStoreWithMenusAndImagesByOwnerEmail(MemberInfo.getEmail())
			.orElseThrow(StoreNotFoundException::new);
	}

	private Store findStore(Integer storeId) {
		return storeRepository.findStoreWithMenusAndImagesByStoreId(storeId)
			.orElseThrow(StoreNotFoundException::new);
	}

	public Double findStoreAverageStar(Integer storeId) {
		return Optional.ofNullable(reviewRepository.findAverageStarByStoreId(storeId)).orElse(0.0);
	}

	private Member findLoginOwner() {
		return memberRepository.findByEmail(MemberInfo.getEmail())
			.orElseThrow(NotFoundMemberException::new);
	}

	private static Double apply(Tuple tuple) {
		return tuple.get(review.star.avg());
	}}
