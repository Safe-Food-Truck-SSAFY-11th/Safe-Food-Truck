package com.safefoodtruck.sft.store.repository;

import java.util.List;
import java.util.Optional;

import com.safefoodtruck.sft.store.domain.Store;

public interface StoreRepositoryCustom {
    List<Store> findAllOpenStores();
    Optional<Integer> findStoreIdByOwnerEmail(String email);
    Optional<Store> findStoreWithMenusAndImagesBySafetyLicenseNumber(String safetyLicenseNumber);
    Optional<Store> findStoreWithMenusAndImagesByStoreId(Integer storeId);
    Optional<Store> findStoreWithMenusAndImagesByOwnerEmail(String email);
}
