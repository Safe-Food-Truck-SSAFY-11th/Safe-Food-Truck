package com.safefoodtruck.sft.favorites.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFavorites is a Querydsl query type for Favorites
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFavorites extends EntityPathBase<Favorites> {

    private static final long serialVersionUID = 1689724024L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFavorites favorites = new QFavorites("favorites");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.safefoodtruck.sft.member.domain.QMember member;

    public final com.safefoodtruck.sft.store.domain.QStore store;

    public QFavorites(String variable) {
        this(Favorites.class, forVariable(variable), INITS);
    }

    public QFavorites(Path<? extends Favorites> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFavorites(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFavorites(PathMetadata metadata, PathInits inits) {
        this(Favorites.class, metadata, inits);
    }

    public QFavorites(Class<? extends Favorites> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.safefoodtruck.sft.member.domain.QMember(forProperty("member"), inits.get("member")) : null;
        this.store = inits.isInitialized("store") ? new com.safefoodtruck.sft.store.domain.QStore(forProperty("store"), inits.get("store")) : null;
    }

}

