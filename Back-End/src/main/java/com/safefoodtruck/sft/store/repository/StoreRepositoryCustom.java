package com.safefoodtruck.sft.store.repository;

import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import java.util.Optional;

public interface StoreRepositoryCustom {
    List<Store> findAllOpenStores();
    Optional<Store> findStoreWithMenusAndImagesByOwnerEmail(String email);
}
