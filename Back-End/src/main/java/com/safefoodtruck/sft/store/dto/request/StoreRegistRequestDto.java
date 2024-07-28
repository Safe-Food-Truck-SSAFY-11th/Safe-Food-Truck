package com.safefoodtruck.sft.store.dto.request;

import java.util.List;

import com.safefoodtruck.sft.menu.domain.Menu;

public record StoreRegistRequestDto(String name, String category, List<Menu> menus, String offDay, String description, String latitude, String longitude, boolean isClean, boolean isOpen) {
}
