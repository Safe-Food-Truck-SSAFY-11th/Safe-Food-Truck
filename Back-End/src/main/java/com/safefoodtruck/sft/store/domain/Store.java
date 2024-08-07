package com.safefoodtruck.sft.store.domain;

import static com.safefoodtruck.sft.store.domain.StoreMessage.*;
import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.order.domain.Order;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "store", indexes = {
    @Index(name = "idx_store_is_open", columnList = "is_open"),
    @Index(name = "idx_store_email", columnList = "email")
})
@Getter
@Builder
@ToString
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store {

    public Store(Member owner, StoreRegistRequestDto storeRegistRequestDto) {
        this.owner = owner;
        this.name = storeRegistRequestDto.name();
        this.storeType = storeRegistRequestDto.storeType();
        this.offDay = storeRegistRequestDto.offDay();
        this.description = storeRegistRequestDto.description();
        this.safetyLicenseNumber = storeRegistRequestDto.safetyLicenseNumber();
        this.isOpen = storeRegistRequestDto.isOpen();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Integer id;

    @NotNull
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member owner;

    @NotNull
    @Column(name = "store_name")
    private String name;

    @NotNull
    @Column(name = "store_type")
    private String storeType;

    @NotNull
    @Column(name = "off_day")
    private String offDay;

    @NotNull
    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @NotNull
    @Column(name = "safety_license_number", unique = true)
    private String safetyLicenseNumber;

    @NotNull
    @Column(name = "is_open")
    private Boolean isOpen;

    @Column(name = "notice")
    private String notice;

    @OneToOne(mappedBy = "store", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private StoreImage storeImage;

    @OneToMany(mappedBy = "store",fetch = LAZY, cascade = ALL, orphanRemoval = true)
    @Builder.Default
    private List<Menu> menuList = new ArrayList<>();

    @OneToMany(mappedBy = "store", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    @Builder.Default
    private List<Order> orderList = new ArrayList<>();

    public static Store of(Member owner, StoreRegistRequestDto storeRegistRequestDto) {
        return Store.builder()
            .owner(owner)
            .name(storeRegistRequestDto.name())
            .storeType(storeRegistRequestDto.storeType())
            .offDay(storeRegistRequestDto.offDay())
            .description(storeRegistRequestDto.description())
            .safetyLicenseNumber(storeRegistRequestDto.safetyLicenseNumber())
            .isOpen(storeRegistRequestDto.isOpen())
            .notice(DEFAULT_STORE_NOTICE)
            .build();
    }

    public void setOwner(Member owner) {
        this.owner = owner;
        owner.setStore(this);
    }

    public void update(StoreUpdateRequestDto storeUpdateRequestDto) {
        this.name = storeUpdateRequestDto.name();
        this.storeType = storeUpdateRequestDto.storeType();
        this.offDay = storeUpdateRequestDto.offDay();
        this.description = storeUpdateRequestDto.description();
    }

    public void updateStatus() {
        this.isOpen = !this.isOpen;
    }

    public void updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto) {
        this.latitude = storeLocationRequestDto.latitude();
        this.longitude = storeLocationRequestDto.longitude();
    }

    public void addMenu(Menu menu) {
        menuList.add(menu);
    }

    public void setStoreImage(StoreImage storeImage) {
        this.storeImage = storeImage;
        storeImage.setStore(this);
    }

    public void addOrderList(Order order) {
        orderList.add(order);
        order.setStore(this);
    }

    public void updateNotice(String notice) {
        this.notice = notice;
    }

    public void deleteNotice() {
        this.notice = DEFAULT_STORE_NOTICE;
    }
}
