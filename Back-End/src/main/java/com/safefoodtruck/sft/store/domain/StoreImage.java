package com.safefoodtruck.sft.store.domain;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

@Table(name = "store_image")
@Entity
@Getter
@ToString
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class StoreImage {

	public StoreImage(String originalName, String savedName, String savedPath) {
		this.originalName = originalName;
		this.savedName = savedName;
		this.savedPath = savedPath;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_image_id")
	private long id;

	@Column(name = "original_name")
	private String originalName;

	@Column(name = "saved_name")
	private String savedName;

	@Column(name = "saved_path")
	private String savedPath;

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "store_id")
	private Store store;

	public static StoreImage of(String originalName, String savedName, String savedPath) {
		return new StoreImage(originalName, savedName, savedPath);
	}

	public void addStore(Store store) {
		this.store = store;
	}
}
