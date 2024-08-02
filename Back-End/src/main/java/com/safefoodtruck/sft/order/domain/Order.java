package com.safefoodtruck.sft.order.domain;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;

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
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "Orders")
@Getter
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer id;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "email")
    private Member customer;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "order", cascade = ALL, orphanRemoval = true)
    private List<OrderMenu> orderMenuList = new ArrayList<>();

    @NotNull
    @Column(name = "is_accepted")
    private Boolean isAccepted;

    @NotNull
    @Column(name = "order_time", columnDefinition = "TIMESTAMP")
    LocalDateTime orderTime;

    @NotNull
    @Column(name = "order_request")
    private String request;

    @NotNull
    @Column(name = "is_done")
    @ColumnDefault("0")
    private Boolean isDone;

    public void addOrderMenu(OrderMenu orderMenu) {
        orderMenuList.add(orderMenu);
        orderMenu.setOrder(this);
    }

    public static Order createOrder(Member customer, Store store, String request, List<OrderMenu> orderMenuList) {
        Order order = new Order();

        order.customer = customer;
        order.store = store;
        order.orderMenuList = orderMenuList;
        order.isAccepted = false;
        order.orderTime = LocalDateTime.now();
        order.request = request;
        order.isDone = false;

        return order;
    }

    public Integer getAmount() {
        Integer totalPrice = 0;
        for (OrderMenu orderMenu : orderMenuList) {
            totalPrice += orderMenu.getTotalPrice();
        }

        return totalPrice;
    }
}
