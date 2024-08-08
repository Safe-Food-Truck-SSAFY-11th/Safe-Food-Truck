package com.safefoodtruck.sft.store.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
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
    public Optional<Store> findStoreWithMenusAndImagesByOwnerEmail(String email) {
        QStore store = QStore.store;
        return Optional.ofNullable(jpaQueryFactory.selectFrom(store)
            .leftJoin(store.storeImage).fetchJoin()
            .leftJoin(store.menuList).fetchJoin()
            .where(store.owner.email.eq(email))
            .fetchOne());
    }
}
