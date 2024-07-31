package com.safefoodtruck.sft.menu.service;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListRegistResponseDto;
import com.safefoodtruck.sft.store.domain.Store;

public interface MenuService {
	MenuListRegistResponseDto registMenu(MenuListRegistRequestDto menuListRegistRequestDto);
	Store findStore();
}
