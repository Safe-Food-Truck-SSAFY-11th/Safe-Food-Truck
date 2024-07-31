package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreLocationResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreRegistResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;

public interface StoreService {

	StoreRegistResponseDto registStore(StoreRegistRequestDto storeRegistRequestDto);

	StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto);

	Store findStore();

	Store findStore(int storeId);

	void deleteStore();

	boolean updateStoreStatus();

	boolean getStoreStatus();

	StoreInfoListResponseDto findOpenStores();

	StoreLocationResponseDto updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto);


}
