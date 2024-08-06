package com.safefoodtruck.sft.store.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.safefoodtruck.sft.store.domain.QStore;
import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StoreRepositoryCustomImpl implements
    StoreRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Store> findAllOpenStores() {
        QStore store = QStore.store;

        return jpaQueryFactory.selectFrom(store)
            .leftJoin(store.storeImage).fetchJoin()
            .leftJoin(store.menuList).fetchJoin()
            .leftJoin(store.owner).fetchJoin()
            .where(store.isOpen.isTrue())
            .fetch();
    }
}
