package com.safefoodtruck.sft.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuRegistResponseDto;
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

	private final MenuRepository menuRepository;
	private final StoreRepository storeRepository;

	@Override
	public List<MenuRegistResponseDto> registMenu(int storeId, MenuListRegistRequestDto menuListRegistRequestDto) {
		Store store = storeRepository.findById(storeId)
			.orElseThrow(StoreNotFoundException::new);

		return menuListRegistRequestDto.menuRegistRequestDtos().stream()
			.map(dto -> {
				Menu menu = Menu.of(dto.name(), dto.price(), dto.description());
				menu.addStore(store);
				Menu savedMenu = menuRepository.save(menu);
				return new MenuRegistResponseDto(savedMenu.getId(), savedMenu.getName(), savedMenu.getPrice(), savedMenu.getDescription());
			})
			.toList();
	}
}
