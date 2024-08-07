package com.safefoodtruck.sft.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberImage is a Querydsl query type for MemberImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberImage extends EntityPathBase<MemberImage> {

    private static final long serialVersionUID = -1170715209L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberImage memberImage = new QMemberImage("memberImage");

    public final StringPath email = createString("email");

    public final QMember member;

    public final StringPath savedPath = createString("savedPath");

    public final StringPath savedUrl = createString("savedUrl");

    public QMemberImage(String variable) {
        this(MemberImage.class, forVariable(variable), INITS);
    }

    public QMemberImage(Path<? extends MemberImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberImage(PathMetadata metadata, PathInits inits) {
        this(MemberImage.class, metadata, inits);
    }

    public QMemberImage(Class<? extends MemberImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

