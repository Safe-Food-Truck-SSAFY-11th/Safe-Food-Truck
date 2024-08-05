package com.safefoodtruck.sft.store.repository;

import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

	@Query("SELECT s.id FROM Store s WHERE s.owner.email = :email")
	Optional<Integer> findStoreIdByOwnerEmail(@Param("email") String email);

	List<Store> findByIsOpen(Boolean isOpen);

	Optional<Store> findByOwnerEmail(String email);
}