package com.safefoodtruck.sft.menu.repository;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.menu.domain.QMenu;
import com.safefoodtruck.sft.menu.domain.QMenuImage;
import com.safefoodtruck.sft.menu.dto.MenuImageDto;
import com.safefoodtruck.sft.menu.dto.response.MenuResponseDto;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MenuRepositoryCustomImpl implements MenuRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public MenuResponseDto findMenuResponseDtoByMenuId(Integer menuId) {
		QMenu menu = QMenu.menu;
		QMenuImage menuImage = QMenuImage.menuImage;

		return queryFactory
			.select(Projections.constructor(MenuResponseDto.class,
				menu.id.as("menuId"),
				menu.name,
				menu.price,
				menu.description,
				Projections.constructor(MenuImageDto.class,
					menuImage.menu,
					menuImage.savedUrl,
					menuImage.savedPath
				)
			))
			.from(menu)
			.leftJoin(menu.menuImage, menuImage)
			.where(menu.id.eq(menuId))
			.fetchOne();
	}
}
