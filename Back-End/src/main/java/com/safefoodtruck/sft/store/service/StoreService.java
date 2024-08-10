package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreNoticeRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreLocationResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreNoticeResponseDto;

public interface StoreService {

	void registStore(StoreRegistRequestDto storeRegistRequestDto);

	void updateStore(StoreUpdateRequestDto storeUpdateRequestDto);

	StoreFindResponseDto findMyStore();

	StoreFindResponseDto findStoreById(Integer storeId);

	MenuListResponseDto findStoreMenus(Integer storeId);

	void deleteStore();

	boolean updateStoreStatus();

	boolean getStoreStatus();

	StoreInfoListResponseDto findOpenStores();

	StoreLocationResponseDto updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto);

	Double findStoreAverageStar(Integer storeId);

	void updateStoreNotice(StoreNoticeRegistRequestDto notice);

	StoreNoticeResponseDto findStoreNotice(Integer storeId);

	StoreNoticeResponseDto deleteStoreNotice();
}
