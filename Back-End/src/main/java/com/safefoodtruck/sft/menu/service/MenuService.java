package com.safefoodtruck.sft.menu.service;

import com.safefoodtruck.sft.menu.dto.request.MenuListRegistRequestDto;
import com.safefoodtruck.sft.menu.dto.response.MenuRegistResponseDto;
import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;

public interface MenuService {
	List<MenuRegistResponseDto> registMenu(MenuListRegistRequestDto menuListRegistRequestDto);
	Store findStore();
}
