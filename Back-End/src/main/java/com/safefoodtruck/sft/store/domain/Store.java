package com.safefoodtruck.sft.store.domain;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import org.hibernate.annotations.DynamicInsert;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.menu.domain.Menu;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Table(name = "store")
@Builder
@ToString
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
public class Store {

    public Store(Member owner, String name, String storeType, String offDay, String description,
        String latitude, String longitude, String safetyLicenseNumber, boolean isOpen) {
        this.owner = owner;
        this.name = name;
        this.storeType = storeType;
        this.offDay = offDay;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.safetyLicenseNumber = safetyLicenseNumber;
        this.isOpen = isOpen;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id")
    private int id;

    @Column(name = "store_name")
    private String name;

    @Column(name = "store_type")
    private String storeType;

    @Column(name = "off_day")
    private String offDay;

    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "safety_license_number")
    private String safetyLicenseNumber;

    @Column(name = "is_open")
    private boolean isOpen;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member owner;

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "store_id")
    private StoreImage storeImage;

    @OneToMany(mappedBy = "store", cascade = ALL, orphanRemoval = true)
    private List<Menu> menuList = new ArrayList<>();

    public void addMenu(Menu menu) {
        menuList.add(menu);
        menu.addStore(this);
    }

    public static Store of(Member owner, StoreRegistRequestDto storeRegistRequestDto) {
        return new Store(owner, storeRegistRequestDto.name(), storeRegistRequestDto.storeType(),
            storeRegistRequestDto.offDay(), storeRegistRequestDto.description(),
            storeRegistRequestDto.latitude(), storeRegistRequestDto.longitude(),
            storeRegistRequestDto.safetyLicenseNumber(), storeRegistRequestDto.isOpen());
    }
}
