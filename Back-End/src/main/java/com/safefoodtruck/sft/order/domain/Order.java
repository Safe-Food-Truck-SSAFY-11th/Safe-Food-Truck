package com.safefoodtruck.sft.order.domain;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.store.domain.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Orders")
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "email")
    private Member customer;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "order", cascade = ALL, orphanRemoval = true)
    private List<OrderMenu> orderMenuList = new ArrayList<>();

    @Column(name = "is_accepted")
    private Boolean isAccepted;

    @Column(name = "order_time", columnDefinition = "TIMESTAMP")
    LocalDateTime orderTime;

    @Column(name = "order_request")
    private String request;

    @Column(name = "is_done")
    @ColumnDefault("0")
    private Boolean isDone;

    @JsonProperty("email")
    public String getCustomerEmail() {
        return customer != null ? customer.getEmail() : null;
    }

    // Store의 store_id를 JSON에 포함시키기 위한 getter 메서드
    @JsonProperty("store_id")
    public Integer getStoreId() {
        return store != null ? store.getId() : null;
    }
}
