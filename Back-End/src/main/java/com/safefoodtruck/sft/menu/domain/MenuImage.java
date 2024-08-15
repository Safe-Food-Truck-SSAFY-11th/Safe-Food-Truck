package com.safefoodtruck.sft.menu.domain;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.menu.dto.MenuImageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "menu_image")
@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuImage {

	@Id
	@Column(name = "menu_id")
	private Integer id;

	@OneToOne
	@MapsId
	@Setter
	@JoinColumn(name = "menu_id", nullable = false)
	private Menu menu;

	@Column(name = "saved_url")
	private String savedUrl;

	@Column(name = "saved_path")
	private String savedPath;

	@JsonProperty("menu_id")
	public Integer getMenuId() {
		return menu != null ? menu.getId() : null;
	}


	public static MenuImage of(MenuImageDto menuImageDto) {
		return MenuImage.builder()
			.menu(menuImageDto.menu())
			.savedUrl(menuImageDto.savedUrl())
			.savedPath(menuImageDto.savedPath())
			.build();
	}

	public void updateMenuImage(MenuImageDto menuImageDto) {
		this.menu = menuImageDto.menu();
		this.savedUrl = menuImageDto.savedUrl();
		this.savedPath = menuImageDto.savedPath();
	}
}
