package com.safefoodtruck.sft.menu.service;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.domain.MenuImage;
import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.request.MenuRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import com.safefoodtruck.sft.menu.exception.MenuNotFoundException;
import com.safefoodtruck.sft.menu.repository.MenuImageRepository;
import com.safefoodtruck.sft.menu.repository.MenuRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

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
		Store store = storeRepository.findStoreWithMenusAndImagesByOwnerEmail(email)
			.orElseThrow(StoreNotFoundException::new);

		List<Menu> menus = menuListRegistRequestDto.menuRegistRequestDtos()
			.stream()
			.map(dto -> createMenu(store, dto))
			.toList();

		List<Menu> savedMenus = menuRepository.saveAll(menus);

		List<MenuImage> menuImages = savedMenus.stream()
			.flatMap(menu -> menu.getMenuImage() != null ? Stream.of(menu.getMenuImage()) :
				Stream.empty())
			.toList();

		if (!menuImages.isEmpty()) {
			menuImageRepository.saveAll(menuImages);
		}

		List<MenuResponseDto> menuResponseDtos = savedMenus.stream()
			.map(MenuResponseDto::fromEntity)
			.toList();

		return MenuListResponseDto.builder()
			.count(menuResponseDtos.size())
			.menuResponseDtos(menuResponseDtos)
			.build();
	}

	private Menu createMenu(Store store, MenuRegistRequestDto dto) {
		Menu menu = Menu.of(dto.name(), dto.price(), dto.description());
		menu.setStore(store);

		if (dto.menuImageDto() != null) {
			MenuImage menuImage = MenuImage.of(dto.menuImageDto());
			menu.setMenuImage(menuImage);
		}

		return menu;
	}

	@Override
	public MenuResponseDto findMenu(Integer menuId) {
		return menuRepository.findMenuResponseDtoByMenuId(menuId);
	}

	@Override
	public MenuResponseDto updateMenu(Integer menuId, MenuUpdateRequestDto menuUpdateRequestDto) {
		Menu menu = menuRepository.findById(menuId).orElseThrow(MenuNotFoundException::new);
		menu.update(menuUpdateRequestDto);

		MenuImage menuImage = menuImageRepository.findByMenu(menu);
		menuImage.updateMenuImage(menuUpdateRequestDto.menuImageDto());

		Menu savedMenu = menuRepository.save(menu);
		menuImageRepository.save(menuImage);

		return MenuResponseDto.fromEntity(savedMenu);
	}

	@Override
	public void deleteMenu(Integer menuId) {
		menuRepository.deleteById(menuId);
	}
}
