package com.safefoodtruck.sft.menu.service;

import java.util.List;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuRegistResponseDto;

public interface MenuService {
	List<MenuRegistResponseDto> registMenu(int storeId, MenuListRegistRequestDto menuListRegistRequestDto);
}
