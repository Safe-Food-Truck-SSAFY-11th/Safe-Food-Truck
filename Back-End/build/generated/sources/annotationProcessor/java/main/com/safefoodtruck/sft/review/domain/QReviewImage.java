package com.safefoodtruck.sft.review.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReviewImage is a Querydsl query type for ReviewImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReviewImage extends EntityPathBase<ReviewImage> {

    private static final long serialVersionUID = 491345467L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReviewImage reviewImage = new QReviewImage("reviewImage");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QReview review;

    public final StringPath savedPath = createString("savedPath");

    public final StringPath savedUrl = createString("savedUrl");

    public QReviewImage(String variable) {
        this(ReviewImage.class, forVariable(variable), INITS);
    }

    public QReviewImage(Path<? extends ReviewImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReviewImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReviewImage(PathMetadata metadata, PathInits inits) {
        this(ReviewImage.class, metadata, inits);
    }

    public QReviewImage(Class<? extends ReviewImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.review = inits.isInitialized("review") ? new QReview(forProperty("review"), inits.get("review")) : null;
    }

}

