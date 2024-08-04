package com.safefoodtruck.sft.store.service;

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

import jakarta.transaction.Transactional;
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
		Store store = findStore();
		store.update(storeUpdateRequestDto);

		StoreImage storeImage = storeImageRepository.findByStore(store);
		storeImage.updateStoreImage(storeUpdateRequestDto.storeImageDto());

		storeRepository.save(store);
		storeImageRepository.save(storeImage);

		return StoreUpdateResponseDto.fromEntity(store);
	}

	@Override
	public Store findStore() {
		String email = MemberInfo.getEmail();
		return storeRepository.findByOwnerEmail(email)
			.orElseThrow(StoreNotFoundException::new);
	}

	@Override
	public Store findStore(Integer storeId) {
		return storeRepository.findById(storeId).orElseThrow(StoreNotFoundException::new);
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
		Store store = findStore();
		store.updateStatus();

		return store.getIsOpen();
	}

	@Override
	public boolean getStoreStatus() {
		Store store = findStore();

		return store.getIsOpen();
	}

	@Override
	public StoreInfoListResponseDto findOpenStores() {
		List<StoreInfoResponseDto> openStores = storeRepository.findOpenStores();
		log.info("openStores : {}", openStores.toArray());

		return new StoreInfoListResponseDto(openStores);
	}

	@Override
	public StoreLocationResponseDto updateStoreLocation(
		StoreLocationRequestDto storeLocationRequestDto) {
		Store store = findStore();
		store.updateStoreLocation(storeLocationRequestDto);

		return StoreLocationResponseDto.fromEntity(store);
	}

}
