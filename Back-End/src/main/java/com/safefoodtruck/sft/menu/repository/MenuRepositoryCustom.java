package com.safefoodtruck.sft.menu.repository;

import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;

public interface MenuRepositoryCustom {
	MenuResponseDto findMenuResponseDtoByMenuId(Integer menuId);
}
