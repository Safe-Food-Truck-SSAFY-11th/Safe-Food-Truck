package com.safefoodtruck.sft.menu.domain;

import static jakarta.persistence.FetchType.LAZY;

import com.safefoodtruck.sft.menu.dto.request.MenuUpdateRequestDto;
import com.safefoodtruck.sft.store.domain.Store;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "menu")
@Getter
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu {

	public Menu(String name, Integer price, String description) {
		this.name = name;
		this.price = price;
		this.description = description;
	}

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

	@NotNull
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "store_id")
	private Store store;

//	@OneToOne(mappedBy = "menu", fetch = LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
//	private MenuImage menuImage;

	public void addStore(Store store) {
		this.store = store;
		store.addMenu(this);
	}

//	public void addMenuImage(MenuImage menuImage) {
//		this.menuImage = menuImage;
//	}

	public static Menu of(String name, Integer price, String description) {
		return new Menu(name, price, description);
	}

	public void update(MenuUpdateRequestDto menuUpdateRequestDto) {
		this.name = menuUpdateRequestDto.name();
		this.price = menuUpdateRequestDto.price();
		this.description = menuUpdateRequestDto.description();
	}
}
