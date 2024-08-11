package com.safefoodtruck.sft.store.service;

import static com.safefoodtruck.sft.common.message.ValidationMessage.*;

import com.safefoodtruck.sft.store.dto.StoreImageDto;
import com.safefoodtruck.sft.store.dto.request.StoreAILogoRequestDto;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.exception.NotFoundMemberException;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.domain.Menu;
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
import com.safefoodtruck.sft.store.exception.NullListException;
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
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email)
			.orElseThrow(NotFoundMemberException::new);
		Store store = Store.of(owner, storeRegistRequestDto);

		store.setOwner(owner);
		Store savedStore = storeRepository.save(store);

		if (storeRegistRequestDto.storeImageDto() != null) {
			StoreImage storeImage = StoreImage.builder()
				.store(savedStore)
				.savedUrl(storeRegistRequestDto.storeImageDto().savedUrl())
				.savedPath(storeRegistRequestDto.storeImageDto().savedPath())
				.build();

			StoreImage savedStoreImage = storeImageRepository.save(storeImage);
			savedStoreImage.setStore(store);
		}
	}

	@Override
	public void updateStore(StoreUpdateRequestDto storeUpdateRequestDto) {
		Store store = findLoginStore();
		store.update(storeUpdateRequestDto);

		StoreImage storeImage = storeImageRepository.findByStore(store);
		storeImage.updateStoreImage(storeUpdateRequestDto.storeImageDto());

		storeRepository.save(store);
		storeImageRepository.save(storeImage);
	}

	@Override
	public StoreFindResponseDto findMyStore() {
		Store store = findLoginStore();
		Integer averageStar = findStoreAverageStar(store.getId()).intValue();

		return StoreFindResponseDto.fromEntity(store, averageStar);
	}

	@Override
	public StoreFindResponseDto findStoreById(Integer storeId) {
		Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
		Integer averageStar = findStoreAverageStar(storeId).intValue();
		return StoreFindResponseDto.fromEntity(store, averageStar);
	}

	@Override
	public MenuListResponseDto findStoreMenus(Integer storeId) {
		Store store = storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
		List<Menu> menuList = store.getMenuList();

		List<MenuResponseDto> menuResponseDtos = menuList.stream()
			.map(MenuResponseDto::fromEntity)
			.toList();

		return MenuListResponseDto.builder()
			.count(menuResponseDtos.size())
			.menuResponseDtos(menuResponseDtos)
			.build();
	}

	@Override
	public void deleteStore() {
		String email = MemberInfo.getEmail();
		Optional<Integer> storeIdByOwnerEmail = storeRepository.findStoreIdByOwnerEmail(email);
		if (storeIdByOwnerEmail.isEmpty()) {
			throw new StoreNotFoundException();
		}

		int storeId = storeIdByOwnerEmail.get();
		storeRepository.deleteById(storeId);
	}

	@Override
	public void updateStoreStatus() {
		Store store = findLoginStore();
		store.toggleOpenStatus();
		if (store.getIsOpen().equals(Boolean.TRUE))
			notificationService.favoriteSendNotify(store.getId(), store.getName());
	}

	@Override
	public boolean getStoreStatus() {
		Store store = findLoginStore();
		return store.getIsOpen();
	}

	@Override
	public StoreInfoListResponseDto findOpenStores() {
		List<Store> openStores = storeRepository.findAllOpenStores();

		List<Object[]> averageStarsData = reviewRepository.findAverageStarsForAllStores();
		Map<Integer, Double> averageStarsMap = averageStarsData.stream()
			.collect(Collectors.toMap(data -> (Integer)data[0], data -> (Double)data[1]));

		List<StoreInfoResponseDto> storeInfoResponseDtos = openStores.stream()
			.map(openStore -> {
				Double averageStar = averageStarsMap.getOrDefault(openStore.getId(), 0.0);
				return StoreInfoResponseDto.fromEntity(openStore, averageStar.intValue());
			})
			.toList();

		return StoreInfoListResponseDto.builder()
			.count(storeInfoResponseDtos.size())
			.storeInfoResponseDtos(storeInfoResponseDtos)
			.build();
	}

	@Override
	public void updateStoreLocation(
		StoreLocationRequestDto storeLocationRequestDto) {
		Store store = findLoginStore();
		store.updateStoreLocation(storeLocationRequestDto);
		storeRepository.save(store);
	}

	@Override
	public void updateStoreNotice(StoreNoticeRegistRequestDto storeNoticeRegistRequestDto) {
		if (storeNoticeRegistRequestDto.connectedEmailList() == null) {
			throw new NullListException();
		}
		Store store = findLoginStore();
		String ownerEmail = store.getOwner().getEmail();
		store.updateNotice(storeNoticeRegistRequestDto.notice());
		storeRepository.save(store);
		notificationService.changedNoticeNotify(ownerEmail, storeNoticeRegistRequestDto.connectedEmailList());
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

	@Override
	public void updateStoreAILogo(StoreAILogoRequestDto storeAILogoRequestDto) {
		storeImageRepository.updateStoreImageByStoreId(storeAILogoRequestDto.storeId(),
														storeAILogoRequestDto.savedUrl(),
														storeAILogoRequestDto.savedPath());
	}

	public Store findLoginStore() {
		String email = MemberInfo.getEmail();
		return storeRepository.findStoreWithMenusAndImagesByOwnerEmail(email)
			.orElseThrow(StoreNotFoundException::new);
	}

	public Store findStore(Integer storeId) {
		return storeRepository.findStoreWithMenusAndImagesByStoreId(storeId)
			.orElseThrow(StoreNotFoundException::new);
	}

	public Double findStoreAverageStar(Integer storeId) {
		Double averageStar = reviewRepository.findAverageStarByStoreId(storeId);
		return (averageStar != null) ? averageStar : 0.0;
	}
}
