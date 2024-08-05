package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.review.repository.ReviewRepository;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.domain.StoreImage;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreLocationResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreRegistResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreImageRepository;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

	private final StoreRepository storeRepository;
	private final MemberRepository memberRepository;
	private final StoreImageRepository storeImageRepository;
	private final ReviewRepository reviewRepository;

	@Override
	public StoreRegistResponseDto registStore(StoreRegistRequestDto storeRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email);
		Store store = Store.of(owner, storeRegistRequestDto);

		store.setOwner(owner);
		Store savedStore = storeRepository.save(store);

		if(storeRegistRequestDto.storeImageDto() != null) {
			StoreImage storeImage = StoreImage.builder()
				.store(savedStore)
				.savedUrl(storeRegistRequestDto.storeImageDto().savedUrl())
				.savedPath(storeRegistRequestDto.storeImageDto().savedPath())
				.build();

			StoreImage savedStoreImage = storeImageRepository.save(storeImage);
			store.setStoreImage(savedStoreImage);
		}

		return StoreRegistResponseDto.fromEntity(email, savedStore);
	}

	@Override
	public StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto) {
		Store store = findLoginStore();
		store.update(storeUpdateRequestDto);

		StoreImage storeImage = storeImageRepository.findByStore(store);
		storeImage.updateStoreImage(storeUpdateRequestDto.storeImageDto());

		storeRepository.save(store);
		storeImageRepository.save(storeImage);

		return StoreUpdateResponseDto.fromEntity(store);
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
	public boolean updateStoreStatus() {
		Store store = findLoginStore();
		store.updateStatus();

		return store.getIsOpen();
	}

	@Override
	public boolean getStoreStatus() {
		Store store = findLoginStore();

		return store.getIsOpen();
	}

	@Override
	public StoreInfoListResponseDto findOpenStores() {
		List<Store> openStores = storeRepository.findOpenStores();
		log.info("Open stores count: {}", openStores.size());
		List<StoreInfoResponseDto> storeInfoResponseDtos = new ArrayList<>();

		for (Store openStore : openStores) {
			try {
				Double averageStar = findStoreAverageStar(openStore.getId());
				log.info("Store ID: {}, Average Star: {}", openStore.getId(), averageStar);

				StoreInfoResponseDto storeInfoResponseDto = StoreInfoResponseDto.fromEntity(openStore, averageStar.intValue());
				storeInfoResponseDtos.add(storeInfoResponseDto);

				log.info("Store info: {}", storeInfoResponseDto.toString());
			} catch (Exception e) {
				log.error("Error processing store with ID {}: {}", openStore.getId(), e.getMessage());
			}
		}

		return StoreInfoListResponseDto.builder()
			.count(storeInfoResponseDtos.size())
			.storeInfoResponseDtos(storeInfoResponseDtos)
			.build();
	}

	@Override
	public StoreLocationResponseDto updateStoreLocation(
		StoreLocationRequestDto storeLocationRequestDto) {
		Store store = findLoginStore();
		store.updateStoreLocation(storeLocationRequestDto);

		return StoreLocationResponseDto.fromEntity(store);
	}

	public Store findLoginStore() {
		String email = MemberInfo.getEmail();
		log.info("login-email {}", email);
		return storeRepository.findByOwnerEmail(email)
			.orElseThrow(StoreNotFoundException::new);
	}

	public Double findStoreAverageStar(Integer storeId) {
		Double averageStar = reviewRepository.findAverageStarByStoreId(storeId);
		return (averageStar != null) ? averageStar : 0.0;
	}
}
