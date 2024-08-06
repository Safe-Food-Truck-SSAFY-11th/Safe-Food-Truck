package com.safefoodtruck.sft.menu.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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

	@JsonIgnore
	@OneToOne
	@MapsId
	@Setter
	@JoinColumn(name = "menu_id")
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
}
