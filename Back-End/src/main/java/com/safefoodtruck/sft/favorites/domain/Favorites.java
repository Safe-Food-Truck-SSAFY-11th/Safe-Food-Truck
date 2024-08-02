package com.safefoodtruck.sft.favorites.domain;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.store.domain.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "favorites")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Integer favoriteId;

    @ManyToOne
    @JoinColumn(name = "email")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Builder
    public Favorites(Member member, Store store) {
        this.member = member;
        this.store = store;
    }
}
