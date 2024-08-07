package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreLocationResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreNoticeResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreRegistResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;

public interface StoreService {

	StoreRegistResponseDto registStore(StoreRegistRequestDto storeRegistRequestDto);

	StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto);

	StoreFindResponseDto findMyStore();

	StoreFindResponseDto findStoreById(Integer storeId);

	MenuListResponseDto findStoreMenus(Integer storeId);

	void deleteStore();

	boolean updateStoreStatus();

	boolean getStoreStatus();

	StoreInfoListResponseDto findOpenStores();

	StoreLocationResponseDto updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto);

	Double findStoreAverageStar(Integer storeId);

	StoreNoticeResponseDto updateStoreNotice(String notice);

	StoreNoticeResponseDto findStoreNotice(Integer storeId);

	StoreNoticeResponseDto deleteStoreNotice();
}
