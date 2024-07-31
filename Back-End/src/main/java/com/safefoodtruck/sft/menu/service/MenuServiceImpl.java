package com.safefoodtruck.sft.menu.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.menu.dto.response.MenuListRegistResponseDto;
import java.util.List;

import java.util.Optional;
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
	private final MemberRepository memberRepository;

	@Override
	public MenuListRegistResponseDto registMenu(MenuListRegistRequestDto menuListRegistRequestDto) {
		Store store = findStore();

		List<MenuRegistResponseDto> menuRegistResponseDtos = menuListRegistRequestDto.menuRegistRequestDtos().stream()
			.map(dto -> {
				Menu menu = Menu.of(dto.name(), dto.price(), dto.description());
				menu.addStore(store);
				Menu savedMenu = menuRepository.save(menu);
				return MenuRegistResponseDto.fromEntity(savedMenu);
			})
			.toList();

		return new MenuListRegistResponseDto(menuRegistResponseDtos);
	}

	@Override
	public Store findStore() {
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email);
		Optional<Store> store = storeRepository.findByOwner(owner);
		if(store.isEmpty()) {
			throw new StoreNotFoundException();
		}

		return store.get();
	}
}
