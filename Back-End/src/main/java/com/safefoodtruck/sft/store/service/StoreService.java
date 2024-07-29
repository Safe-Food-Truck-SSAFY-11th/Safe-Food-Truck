package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoDto;

public interface StoreService {

	StoreInfoDto getStoreInfo(int storeId);

	Store registStore(StoreRegistRequestDto storeRegistRequestDto);

	Store findStore();
}
