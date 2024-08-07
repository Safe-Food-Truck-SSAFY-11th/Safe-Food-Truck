package com.safefoodtruck.sft.order.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrder is a Querydsl query type for Order
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrder extends EntityPathBase<Order> {

    private static final long serialVersionUID = -116547496L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrder order = new QOrder("order1");

    public final NumberPath<Integer> amount = createNumber("amount", Integer.class);

    public final StringPath cookingStatus = createString("cookingStatus");

    public final com.safefoodtruck.sft.member.domain.QMember customer;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final ListPath<OrderMenu, QOrderMenu> orderMenuList = this.<OrderMenu, QOrderMenu>createList("orderMenuList", OrderMenu.class, QOrderMenu.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> orderTime = createDateTime("orderTime", java.time.LocalDateTime.class);

    public final StringPath request = createString("request");

    public final com.safefoodtruck.sft.review.domain.QReview review;

    public final StringPath status = createString("status");

    public final com.safefoodtruck.sft.store.domain.QStore store;

    public QOrder(String variable) {
        this(Order.class, forVariable(variable), INITS);
    }

    public QOrder(Path<? extends Order> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrder(PathMetadata metadata, PathInits inits) {
        this(Order.class, metadata, inits);
    }

    public QOrder(Class<? extends Order> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new com.safefoodtruck.sft.member.domain.QMember(forProperty("customer"), inits.get("customer")) : null;
        this.review = inits.isInitialized("review") ? new com.safefoodtruck.sft.review.domain.QReview(forProperty("review"), inits.get("review")) : null;
        this.store = inits.isInitialized("store") ? new com.safefoodtruck.sft.store.domain.QStore(forProperty("store"), inits.get("store")) : null;
    }

}

