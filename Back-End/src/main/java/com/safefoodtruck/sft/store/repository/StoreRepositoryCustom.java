package com.safefoodtruck.sft.store.repository;

import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;

public interface StoreRepositoryCustom {
    List<Store> findAllOpenStores();

}
