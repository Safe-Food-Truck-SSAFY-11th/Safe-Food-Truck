package com.safefoodtruck.sft.menu.service;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;

public interface MenuService {
	MenuListResponseDto registMenu(MenuListRegistRequestDto menuListRegistRequestDto);
	MenuListResponseDto findAllMenu(int storeId);
}
