package com.safefoodtruck.sft.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.domain.MenuImage;
import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuImageRepository;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

	private final StoreRepository storeRepository;
	private final MenuRepository menuRepository;
	private final MenuImageRepository menuImageRepository;

	@Override
	public MenuListResponseDto registMenu(MenuListRegistRequestDto menuListRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Store store = storeRepository.findByOwnerEmail(email).orElseThrow(StoreNotFoundException::new);

		List<MenuResponseDto> menuResponseDtos = menuListRegistRequestDto.menuRegistRequestDtos().stream()
			.map(dto -> {
				Menu menu = Menu.of(dto.name(), dto.price(), dto.description());
				menu.setStore(store);

				MenuImage savedMenuImage = menuImageRepository.save(MenuImage.of(dto.menuImageDto()));
				menu.setMenuImage(savedMenuImage);

				Menu savedMenu = menuRepository.save(menu);
				return MenuResponseDto.fromEntity(savedMenu);
			})
			.toList();

		return MenuListResponseDto.builder()
			.count(menuResponseDtos.size())
			.menuResponseDtos(menuResponseDtos)
			.build();
	}

	@Override
	public MenuResponseDto findMenu(Integer menuId) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(MenuNotFoundException::new);
		return MenuResponseDto.fromEntity(menu);
	}

	@Override
	public MenuResponseDto updateMenu(Integer menuId, MenuUpdateRequestDto menuUpdateRequestDto) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(MenuNotFoundException::new);
		menu.update(menuUpdateRequestDto);

		MenuImage savedMenuImage = menuImageRepository.save(
			MenuImage.of(menuUpdateRequestDto.menuImageDto()));
		menu.setMenuImage(savedMenuImage);

		Menu savedMenu = menuRepository.save(menu);

		return MenuResponseDto.fromEntity(savedMenu);
	}

	@Override
	public void deleteMenu(Integer menuId) {
		menuRepository.deleteById(menuId);
	}
}
