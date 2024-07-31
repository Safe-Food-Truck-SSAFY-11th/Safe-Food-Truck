package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreRegistResponseDto;
import com.safefoodtruck.sft.store.dto.response.StoreUpdateResponseDto;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

	private final StoreRepository storeRepository;
	private final MemberRepository memberRepository;

	@Override
	public StoreRegistResponseDto registStore(StoreRegistRequestDto storeRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email);
		Store store = Store.of(owner, storeRegistRequestDto);
		storeRepository.save(store);

		return StoreRegistResponseDto.fromEntity(email, store);
	}

	@Override
	public StoreUpdateResponseDto updateStore(StoreUpdateRequestDto storeUpdateRequestDto) {
		Store store = findStore();
		store.update(storeUpdateRequestDto);
		return StoreUpdateResponseDto.fromEntity(store);
	}


	@Override
	public Store findStore() {
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email);
		Optional<Store> store = storeRepository.findByOwner(owner);
		if(store.isEmpty()) {
			throw new StoreNotFoundException();
		}

		return store.get();
	}

	@Override
	public Store findStore(int storeId) {
		Optional<Store> store = storeRepository.findById(storeId);
		if(store.isEmpty()) {
			throw new StoreNotFoundException();
		}

		return store.get();
	}

	@Override
	public void deleteStore() {
		String email = MemberInfo.getEmail();
		Optional<Integer> storeIdByOwnerEmail = storeRepository.findStoreIdByOwnerEmail(email);
		if(storeIdByOwnerEmail.isEmpty()) {
			throw new StoreNotFoundException();
		}

		int storeId = storeIdByOwnerEmail.get();
		storeRepository.deleteById(storeId);
	}

	@Override
	public boolean getStoreStatus() {
		Store store = findStore();
		return store.isOpen();
	}

	@Override
	public boolean updateStoreStatus() {
		Store store = findStore();
		store.updateStatus();
		return store.isOpen();
	}

}
