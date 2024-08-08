package com.safefoodtruck.sft.store.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.menu.domain.QMenu;
import com.safefoodtruck.sft.menu.domain.QMenuImage;
import com.safefoodtruck.sft.store.domain.QStore;
import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
    public Optional<Store> findStoreWithMenusAndImagesByOwnerEmail(String email) {
        QStore store = QStore.store;
        QMenu menu = QMenu.menu;
        QMenuImage menuImage = QMenuImage.menuImage;

        return Optional.ofNullable(jpaQueryFactory.selectFrom(store)
            .leftJoin(store.storeImage).fetchJoin()
            .leftJoin(store.menuList, menu).fetchJoin()
            .leftJoin(menu.menuImage, menuImage).fetchJoin()
            .where(store.owner.email.eq(email))
            .fetchOne());
    }
}
