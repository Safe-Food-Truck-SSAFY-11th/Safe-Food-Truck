package com.safefoodtruck.sft.menu.domain;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.order.domain.OrderMenu;
import com.safefoodtruck.sft.store.domain.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu")
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_id")
	private Integer id;

	@NotNull
	@Column(name = "menu_name")
	private String name;

	@NotNull
	@Column(name = "price")
	private Integer price;

	@NotNull
	@Column(name = "description")
	private String description;

	@JsonIgnore
	@NotNull
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "store_id")
	private Store store;

	@OneToOne(mappedBy = "menu", fetch = LAZY, cascade = ALL, orphanRemoval = true)
	private MenuImage menuImage;

	@OneToMany(mappedBy = "menu", cascade = ALL, orphanRemoval = true)
	private List<OrderMenu> orderMenuList = new ArrayList<>();

	@JsonProperty("storeId")
	public Integer getStoreId() {
		return store.getId();
	}

	public void setStore(Store store) {
		this.store = store;
		store.addMenu(this);
	}

	public void setMenuImage(MenuImage menuImage) {
		this.menuImage = menuImage;
		menuImage.setMenu(this);
	}

	public static Menu of(String name, Integer price, String description) {
		return Menu.builder()
			.name(name)
			.price(price)
			.description(description)
			.build();
	}

	public void update(MenuUpdateRequestDto menuUpdateRequestDto) {
		this.name = menuUpdateRequestDto.name();
		this.price = menuUpdateRequestDto.price();
		this.description = menuUpdateRequestDto.description();
	}
}
