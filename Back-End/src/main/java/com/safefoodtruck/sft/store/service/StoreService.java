package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.menu.dto.response.MenuListResponseDto;
import com.safefoodtruck.sft.store.dto.StoreImageDto;
import com.safefoodtruck.sft.store.dto.request.StoreAILogoRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreNoticeRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreFindResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoListResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreNoticeResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;

public interface StoreService {

	void registStore(StoreRegistRequestDto storeRegistRequestDto);

	StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto);

	StoreFindResponseDto findMyStore();

	StoreFindResponseDto findStoreById(Integer storeId);

	MenuListResponseDto findStoreMenus(Integer storeId);

	void deleteStore();

	Boolean updateStoreStatus();

	boolean getStoreStatus();

	StoreInfoListResponseDto findOpenStores();

	void updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto);

	Double findStoreAverageStar(Integer storeId);

	void updateStoreNotice(StoreNoticeRegistRequestDto notice);

	StoreNoticeResponseDto findStoreNotice(Integer storeId);

	void deleteStoreNotice();

	String checkDuplicateSafetyLicenseNumber(String safetyLicenseNumber);

	void updateStoreAILogo (StoreAILogoRequestDto storeAILogoRequestDto);
}
