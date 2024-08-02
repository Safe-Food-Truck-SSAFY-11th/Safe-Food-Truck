package com.safefoodtruck.sft.order.domain;

import static jakarta.persistence.FetchType.LAZY;

import com.safefoodtruck.sft.menu.domain.Menu;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "OrderMenu")
@Getter
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderMenu {

    public OrderMenu(Menu menu, Integer orderPrice, Integer count) {
        this.menu = menu;
        this.orderPrice = orderPrice;
        this.count = count;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_menu_id")
    private Integer orderMenuId;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @Setter
    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Setter
    @NotNull
    @Column(name = "order_price")
    private Integer orderPrice;

    @NotNull
    @Column(name = "count")
    private Integer count;

    public static OrderMenu createOrderMenu(Menu menu, Integer orderPrice, Integer count) {
        return new OrderMenu(menu, orderPrice, count);
    }

    public Integer getTotalPrice() {
        return getOrderPrice() * getCount();
    }
}
