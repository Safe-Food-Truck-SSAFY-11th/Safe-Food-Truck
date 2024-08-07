package com.safefoodtruck.sft.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1847882236L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final DatePath<java.time.LocalDate> birth = createDate("birth", java.time.LocalDate.class);

    public final StringPath businessNumber = createString("businessNumber");

    public final StringPath email = createString("email");

    public final NumberPath<Integer> gender = createNumber("gender", Integer.class);

    public final NumberPath<Integer> isResign = createNumber("isResign", Integer.class);

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final ListPath<com.safefoodtruck.sft.notification.domain.Notification, com.safefoodtruck.sft.notification.domain.QNotification> notificationList = this.<com.safefoodtruck.sft.notification.domain.Notification, com.safefoodtruck.sft.notification.domain.QNotification>createList("notificationList", com.safefoodtruck.sft.notification.domain.Notification.class, com.safefoodtruck.sft.notification.domain.QNotification.class, PathInits.DIRECT2);

    public final ListPath<com.safefoodtruck.sft.order.domain.Order, com.safefoodtruck.sft.order.domain.QOrder> orderList = this.<com.safefoodtruck.sft.order.domain.Order, com.safefoodtruck.sft.order.domain.QOrder>createList("orderList", com.safefoodtruck.sft.order.domain.Order.class, com.safefoodtruck.sft.order.domain.QOrder.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final DateTimePath<java.time.LocalDateTime> regDate = createDateTime("regDate", java.time.LocalDateTime.class);

    public final ListPath<com.safefoodtruck.sft.review.domain.Review, com.safefoodtruck.sft.review.domain.QReview> reviewList = this.<com.safefoodtruck.sft.review.domain.Review, com.safefoodtruck.sft.review.domain.QReview>createList("reviewList", com.safefoodtruck.sft.review.domain.Review.class, com.safefoodtruck.sft.review.domain.QReview.class, PathInits.DIRECT2);

    public final StringPath role = createString("role");

    public final com.safefoodtruck.sft.store.domain.QStore store;

    public final ListPath<com.safefoodtruck.sft.survey.domain.Survey, com.safefoodtruck.sft.survey.domain.QSurvey> surveyList = this.<com.safefoodtruck.sft.survey.domain.Survey, com.safefoodtruck.sft.survey.domain.QSurvey>createList("surveyList", com.safefoodtruck.sft.survey.domain.Survey.class, com.safefoodtruck.sft.survey.domain.QSurvey.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> vipExpiredDate = createDateTime("vipExpiredDate", java.time.LocalDateTime.class);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.store = inits.isInitialized("store") ? new com.safefoodtruck.sft.store.domain.QStore(forProperty("store"), inits.get("store")) : null;
    }

}

