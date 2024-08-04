package com.safefoodtruck.sft.order.domain;

import static com.safefoodtruck.sft.order.domain.OrderStatus.*;
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
import com.safefoodtruck.sft.review.domain.Review;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Orders")
@Getter
@Builder
@ToString
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
    @Builder.Default
    private List<OrderMenu> orderMenuList = new ArrayList<>();

    @Setter
    @OneToOne(mappedBy = "order", cascade = ALL, orphanRemoval = true)
    private Review review;

    @Column(name = "order_request")
    private String request;

    @Column(name = "order_status")
    @ColumnDefault(value = "'pending'")
    private String status;

    @Column(name = "cooking_status")
    @ColumnDefault("'preparing'")
    private String cookingStatus;

    @Column(name = "order_time", columnDefinition = "TIMESTAMP")
    LocalDateTime orderTime;

    @JsonProperty("email")
    public String getCustomerEmail() {
        return customer != null ? customer.getEmail() : null;
    }

    @JsonProperty("store_id")
    public Integer getStoreId() {
        return store != null ? store.getId() : null;
    }

    public void addOrderMenu(OrderMenu orderMenu) {
        orderMenuList.add(orderMenu);
        orderMenu.setOrder(this);
    }

    public void acceptOrder() {
        this.status = ACCEPTED.get();
    }

    public void rejectOrder() {
        this.status = REJECTED.get();
    }

    public void completeOrder() {
        this.cookingStatus = COMPLETED.get();
    }

    public boolean isInValidRequest() {
        return !status.equals(PENDING.get());
    }

    public boolean isAlreadyCompletedOrder() {
        return cookingStatus.equals(COMPLETED.get());
    }
}
