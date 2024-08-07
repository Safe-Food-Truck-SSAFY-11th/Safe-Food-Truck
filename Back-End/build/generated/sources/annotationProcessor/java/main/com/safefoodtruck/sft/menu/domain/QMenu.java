package com.safefoodtruck.sft.menu.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMenu is a Querydsl query type for Menu
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMenu extends EntityPathBase<Menu> {

    private static final long serialVersionUID = 1494741902L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMenu menu = new QMenu("menu");

    public final StringPath description = createString("description");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QMenuImage menuImage;

    public final StringPath name = createString("name");

    public final ListPath<com.safefoodtruck.sft.order.domain.OrderMenu, com.safefoodtruck.sft.order.domain.QOrderMenu> orderMenuList = this.<com.safefoodtruck.sft.order.domain.OrderMenu, com.safefoodtruck.sft.order.domain.QOrderMenu>createList("orderMenuList", com.safefoodtruck.sft.order.domain.OrderMenu.class, com.safefoodtruck.sft.order.domain.QOrderMenu.class, PathInits.DIRECT2);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final com.safefoodtruck.sft.store.domain.QStore store;

    public QMenu(String variable) {
        this(Menu.class, forVariable(variable), INITS);
    }

    public QMenu(Path<? extends Menu> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMenu(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMenu(PathMetadata metadata, PathInits inits) {
        this(Menu.class, metadata, inits);
    }

    public QMenu(Class<? extends Menu> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.menuImage = inits.isInitialized("menuImage") ? new QMenuImage(forProperty("menuImage"), inits.get("menuImage")) : null;
        this.store = inits.isInitialized("store") ? new com.safefoodtruck.sft.store.domain.QStore(forProperty("store"), inits.get("store")) : null;
    }

}

