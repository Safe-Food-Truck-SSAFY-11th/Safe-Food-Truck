package com.safefoodtruck.sft.store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.member.domain.QMember;
import com.safefoodtruck.sft.menu.domain.QMenu;
import com.safefoodtruck.sft.menu.domain.QMenuImage;
import com.safefoodtruck.sft.store.domain.QStore;
import com.safefoodtruck.sft.store.domain.QStoreImage;
import com.safefoodtruck.sft.store.domain.Store;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class StoreRepositoryCustomImpl implements StoreRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Store> findAllOpenStores() {
		QStore store = QStore.store;

		return jpaQueryFactory.selectFrom(store)
			.leftJoin(store.storeImage).fetchJoin()
			.where(store.isOpen.isTrue())
			.fetch();
	}

	@Override
	public Optional<Integer> findStoreIdByOwnerEmail(String email) {
		QStore store = QStore.store;

		Integer storeId = jpaQueryFactory.select(store.id)
			.from(store)
			.where(store.owner.email.eq(email))
			.fetchOne();

		return Optional.ofNullable(storeId);
	}

	@Override
	public Optional<Store> findStoreWithMenusAndImagesBySafetyLicenseNumber(
		final String safetyLicenseNumber) {
		QStore store = QStore.store;
		QMenu menu = QMenu.menu;
		QMenuImage menuImage = QMenuImage.menuImage;
		QMember owner = QMember.member;

		return Optional.ofNullable(jpaQueryFactory.selectFrom(store)
			.leftJoin(store.storeImage).fetchJoin()
			.leftJoin(store.owner, owner).fetchJoin()
			.leftJoin(store.menuList, menu).fetchJoin()
			.leftJoin(menu.menuImage, menuImage).fetchJoin()
			.where(store.safetyLicenseNumber.eq(safetyLicenseNumber))
			.fetchOne());
	}

	@Override
	public Optional<Store> findStoreWithMenusAndImagesByStoreId(Integer storeId) {
		QStore store = QStore.store;
		QMenu menu = QMenu.menu;
		QMenuImage menuImage = QMenuImage.menuImage;
		QMember owner = QMember.member;

		return Optional.ofNullable(jpaQueryFactory.selectFrom(store)
			.leftJoin(store.storeImage).fetchJoin()
			.leftJoin(store.owner, owner).fetchJoin()
			.leftJoin(store.menuList, menu).fetchJoin()
			.leftJoin(menu.menuImage, menuImage).fetchJoin()
			.where(store.id.eq(storeId))
			.fetchOne());
	}

	@Override
	public Optional<Store> findStoreWithMenusAndImagesByOwnerEmail(String email) {
		QStore store = QStore.store;
		QStoreImage storeImage = QStoreImage.storeImage;
		QMenu menu = QMenu.menu;
		QMenuImage menuImage = QMenuImage.menuImage;

		return Optional.ofNullable(jpaQueryFactory.selectFrom(store)
			.leftJoin(store.storeImage, storeImage).fetchJoin()
			.leftJoin(store.menuList, menu).fetchJoin()
			.leftJoin(menu.menuImage, menuImage).fetchJoin()
			.where(store.owner.email.eq(email))
			.fetchOne());
	}

}
