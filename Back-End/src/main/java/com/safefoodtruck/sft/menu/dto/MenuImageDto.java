package com.safefoodtruck.sft.menu.dto;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.domain.MenuImage;

import lombok.Builder;

@Builder
public record MenuImageDto(Menu menu, String savedUrl, String savedPath) {
	public static MenuImageDto fromEntity(MenuImage menuImage) {
		return MenuImageDto.builder()
			.menu(menuImage.getMenu())
			.savedUrl(menuImage.getSavedUrl())
			.savedPath(menuImage.getSavedPath())
			.build();
	}
}
