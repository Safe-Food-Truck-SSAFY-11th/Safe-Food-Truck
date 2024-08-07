package com.safefoodtruck.sft.store.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStore is a Querydsl query type for Store
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStore extends EntityPathBase<Store> {

    private static final long serialVersionUID = 1980237624L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStore store = new QStore("store");

    public final StringPath description = createString("description");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath isOpen = createBoolean("isOpen");

    public final StringPath latitude = createString("latitude");

    public final StringPath longitude = createString("longitude");

    public final ListPath<com.safefoodtruck.sft.menu.domain.Menu, com.safefoodtruck.sft.menu.domain.QMenu> menuList = this.<com.safefoodtruck.sft.menu.domain.Menu, com.safefoodtruck.sft.menu.domain.QMenu>createList("menuList", com.safefoodtruck.sft.menu.domain.Menu.class, com.safefoodtruck.sft.menu.domain.QMenu.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath offDay = createString("offDay");

    public final ListPath<com.safefoodtruck.sft.order.domain.Order, com.safefoodtruck.sft.order.domain.QOrder> orderList = this.<com.safefoodtruck.sft.order.domain.Order, com.safefoodtruck.sft.order.domain.QOrder>createList("orderList", com.safefoodtruck.sft.order.domain.Order.class, com.safefoodtruck.sft.order.domain.QOrder.class, PathInits.DIRECT2);

    public final com.safefoodtruck.sft.member.domain.QMember owner;

    public final StringPath safetyLicenseNumber = createString("safetyLicenseNumber");

    public final QStoreImage storeImage;

    public final StringPath storeType = createString("storeType");

    public QStore(String variable) {
        this(Store.class, forVariable(variable), INITS);
    }

    public QStore(Path<? extends Store> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStore(PathMetadata metadata, PathInits inits) {
        this(Store.class, metadata, inits);
    }

    public QStore(Class<? extends Store> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.owner = inits.isInitialized("owner") ? new com.safefoodtruck.sft.member.domain.QMember(forProperty("owner"), inits.get("owner")) : null;
        this.storeImage = inits.isInitialized("storeImage") ? new QStoreImage(forProperty("storeImage"), inits.get("storeImage")) : null;
    }

}

