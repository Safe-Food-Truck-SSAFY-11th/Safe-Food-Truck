package com.safefoodtruck.sft.store.domain;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.store.dto.StoreImageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "store_image")
@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StoreImage {

	@Id
	@Column(name = "store_id")
	private Integer id;

	@OneToOne
	@MapsId
	@Setter
	@JoinColumn(name = "store_id")
	private Store store;

	@NotNull
	@Column(name = "saved_url")
	private String savedUrl;

	@NotNull
	@Column(name = "saved_path")
	private String savedPath;

	@JsonProperty("menu_id")
	public Integer getStoreId() {
		return store != null ? store.getId() : null;
	}

	public void updateStoreImage(StoreImageDto storeImageDto) {
		this.store = storeImageDto.store();
		this.savedUrl = storeImageDto.savedUrl();
		this.savedPath = storeImageDto.savedPath();
	}

	public static StoreImage of(StoreImageDto storeImageDto) {
		return StoreImage.builder()
			.store(storeImageDto.store())
			.savedUrl(storeImageDto.savedUrl())
			.savedPath(storeImageDto.savedPath())
			.build();
	}
}
