package com.safefoodtruck.sft.menu.service;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;

public interface MenuService {
	MenuListResponseDto registMenu(MenuListRegistRequestDto menuListRegistRequestDto);
	MenuResponseDto findMenu(Integer menuId);
	MenuResponseDto updateMenu(Integer menuId, MenuUpdateRequestDto menuUpdateRequestDto);
	void deleteMenu(Integer menuId);
}
