package com.safefoodtruck.sft.survey.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSurvey is a Querydsl query type for Survey
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSurvey extends EntityPathBase<Survey> {

    private static final long serialVersionUID = 2123134852L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSurvey survey = new QSurvey("survey");

    public final StringPath dong = createString("dong");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath latitude = createString("latitude");

    public final StringPath longitude = createString("longitude");

    public final com.safefoodtruck.sft.member.domain.QMember member;

    public final StringPath sido = createString("sido");

    public final StringPath sigungu = createString("sigungu");

    public final StringPath storeType = createString("storeType");

    public QSurvey(String variable) {
        this(Survey.class, forVariable(variable), INITS);
    }

    public QSurvey(Path<? extends Survey> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSurvey(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSurvey(PathMetadata metadata, PathInits inits) {
        this(Survey.class, metadata, inits);
    }

    public QSurvey(Class<? extends Survey> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.safefoodtruck.sft.member.domain.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

