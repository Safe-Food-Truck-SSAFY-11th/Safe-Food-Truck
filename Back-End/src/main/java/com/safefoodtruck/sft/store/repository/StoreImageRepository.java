package com.safefoodtruck.sft.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.domain.StoreImage;

public interface StoreImageRepository extends JpaRepository<StoreImage, Integer> {

	StoreImage findByStore(Store store);
}
