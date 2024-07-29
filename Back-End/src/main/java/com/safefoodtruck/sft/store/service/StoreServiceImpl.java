package com.safefoodtruck.sft.store.service;

import com.safefoodtruck.sft.common.util.MemberInfo;
import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.member.repository.MemberRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.response.StoreInfoDto;
import com.safefoodtruck.sft.store.exception.StoreNotFoundException;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

	private final StoreRepository storeRepository;
	private final MemberRepository memberRepository;

	@Override
	public StoreInfoDto getStoreInfo(int storeId) {
		Store store = storeRepository.findById(storeId)
			.orElseThrow(StoreNotFoundException::new);
		return StoreInfoDto.fromEntity(store);
	}

	@Override
	public Store registStore(StoreRegistRequestDto storeRegistRequestDto) {
		String email = MemberInfo.getEmail();
		Member owner = memberRepository.findByEmail(email);
		Store store = Store.of(owner, storeRegistRequestDto);
		storeRepository.save(store);

		return store;
	}



}
