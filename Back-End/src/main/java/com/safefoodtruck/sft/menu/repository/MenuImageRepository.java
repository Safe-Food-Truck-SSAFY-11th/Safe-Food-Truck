package com.safefoodtruck.sft.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.menu.domain.MenuImage;

public interface MenuImageRepository extends JpaRepository<MenuImage, Integer> {
	MenuImage findByMenu(Menu menu);
}
