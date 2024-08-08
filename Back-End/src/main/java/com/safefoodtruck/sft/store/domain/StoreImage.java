package com.safefoodtruck.sft.store.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.store.dto.StoreImageDto;
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
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
	@JoinColumn(name = "store_id")
	private Store store;

	@Column(name = "saved_url")
	private String savedUrl;

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

	public void setStore(Store store) {
		this.store = store;
		store.setStoreImage(this);
	}
}
