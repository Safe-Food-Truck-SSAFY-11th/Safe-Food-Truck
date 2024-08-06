package com.safefoodtruck.sft.store.repository;

import com.safefoodtruck.sft.store.domain.Store;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer>, StoreRepositoryCustom {
	Optional<Integer> findStoreIdByOwnerEmail(String email);

	@EntityGraph(attributePaths = {"storeImage", "menuList", "owner"})
	Optional<Store> findByOwnerEmail(String email);
}