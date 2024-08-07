package com.safefoodtruck.sft.review.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = -6274304L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReview review = new QReview("review");

    public final StringPath content = createString("content");

    public final com.safefoodtruck.sft.member.domain.QMember customer;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath isVisible = createBoolean("isVisible");

    public final com.safefoodtruck.sft.order.domain.QOrder order;

    public final ListPath<ReviewImage, QReviewImage> reviewImages = this.<ReviewImage, QReviewImage>createList("reviewImages", ReviewImage.class, QReviewImage.class, PathInits.DIRECT2);

    public final NumberPath<Integer> star = createNumber("star", Integer.class);

    public QReview(String variable) {
        this(Review.class, forVariable(variable), INITS);
    }

    public QReview(Path<? extends Review> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReview(PathMetadata metadata, PathInits inits) {
        this(Review.class, metadata, inits);
    }

    public QReview(Class<? extends Review> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new com.safefoodtruck.sft.member.domain.QMember(forProperty("customer"), inits.get("customer")) : null;
        this.order = inits.isInitialized("order") ? new com.safefoodtruck.sft.order.domain.QOrder(forProperty("order"), inits.get("order")) : null;
    }

}

