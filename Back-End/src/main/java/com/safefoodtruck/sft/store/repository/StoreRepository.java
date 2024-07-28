package com.safefoodtruck.sft.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.store.domain.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
	Optional<Store> findByOwner(Member member);
}
