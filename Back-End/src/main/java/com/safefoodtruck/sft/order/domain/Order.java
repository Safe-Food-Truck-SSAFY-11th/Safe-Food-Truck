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
import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.order.dto.request.OrderRegistRequestDto;
import com.safefoodtruck.sft.review.domain.Review;
import com.safefoodtruck.sft.store.domain.Store;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @ColumnDefault("'waiting'")
    private String cookingStatus;

    @Column(name = "order_time", columnDefinition = "TIMESTAMP")
    LocalDateTime orderTime;

    @Column(name = "complete_time", columnDefinition = "TIMESTAMP")
    LocalDateTime completeTime;

    @Column(name = "amount")
    private Integer amount;

    public static Order of(OrderRegistRequestDto orderRegistRequestDto, Member customer) {
        return Order.builder()
            .customer(customer)
            .request(orderRegistRequestDto.request())
            .status(PENDING.get())
            .cookingStatus(WAITING.get())
            .orderTime(LocalDateTime.now())
            .build();
    }

    public void setStore(Store store) {
        this.store = store;
        store.addOrder(this);
    }

    public void addOrderMenu(OrderMenu orderMenu) {
        orderMenuList.add(orderMenu);
        orderMenu.setOrder(this);
        calculateAmount();
    }

    public void complete() {
        completeOrder();
        completeTime = LocalDateTime.now();
    }

    @PostLoad
    @PostPersist
    @PostUpdate
	public void calculateAmount() {
        this.amount = orderMenuList.stream().mapToInt(orderMenu -> orderMenu.getMenu().getPrice() * orderMenu.getCount()).sum();
    }

    public void acceptOrder() {
        this.status = ACCEPTED.get();
        this.cookingStatus = PREPARING.get();
    }

    public void rejectOrder() {
        this.status = REJECTED.get();
    }

    private void completeOrder() {
        this.cookingStatus = COMPLETED.get();
    }

    public boolean isInValidRequest() {
        return !status.equals(PENDING.get());
    }

    public boolean isPreparingOrder() {
        return cookingStatus.equals(PREPARING.get());
    }

    public boolean isAlreadyCompletedOrder() {
        return cookingStatus.equals(COMPLETED.get());
    }
}
