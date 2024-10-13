package com.safefoodtruck.sft.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.domain.StoreImage;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StoreImageRepository extends JpaRepository<StoreImage, Integer> {

	StoreImage findByStore(Store store);

	@Modifying
	@Query("UPDATE StoreImage si "
		+ "SET si.savedUrl = :savedUrl, si.savedPath = :savedPath "
		+ "WHERE si.store.id = :storeId")
	void updateStoreImageByStoreId(
		@Param("storeId") Integer storeId,
		@Param("savedUrl") String savedUrl,
		@Param("savedPath") String savedPath);
}
