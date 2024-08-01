package com.safefoodtruck.sft.store.domain;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;

import com.safefoodtruck.sft.member.domain.Member;
import com.safefoodtruck.sft.menu.domain.Menu;
import com.safefoodtruck.sft.store.dto.request.StoreLocationRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreRegistRequestDto;
import com.safefoodtruck.sft.store.dto.request.StoreUpdateRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "store")
@Getter
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor
public class Store {

    public Store(Member owner, StoreRegistRequestDto storeRegistRequestDto) {
        this.owner = owner;
        this.name = storeRegistRequestDto.name();
        this.storeType = storeRegistRequestDto.storeType();
        this.offDay = storeRegistRequestDto.offDay();
        this.description = storeRegistRequestDto.description();
        this.latitude = storeRegistRequestDto.latitude();
        this.longitude = storeRegistRequestDto.longitude();
        this.safetyLicenseNumber = storeRegistRequestDto.safetyLicenseNumber();
        this.isOpen = storeRegistRequestDto.isOpen();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Integer id;

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

    @Column(name = "safety_license_number", unique = true)
    private String safetyLicenseNumber;

    @Column(name = "is_open")
    private boolean isOpen;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member owner;

    @OneToOne(mappedBy = "store", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    private StoreImage storeImage;

    @OneToMany(mappedBy = "store", cascade = ALL, orphanRemoval = true)
    private List<Menu> menuList = new ArrayList<>();

    public static Store of(Member owner, StoreRegistRequestDto storeRegistRequestDto) {
        return new Store(owner, storeRegistRequestDto);
    }

    public void update(StoreUpdateRequestDto storeUpdateRequestDto) {
        this.name = storeUpdateRequestDto.name();
        this.storeType = storeUpdateRequestDto.storeType();
        this.offDay = storeUpdateRequestDto.offDay();
        this.description = storeUpdateRequestDto.description();
//        this.storeImage = storeUpdateRequestDto.storeImage();
    }

    public void updateStatus() {
        if(isOpen) {
            isOpen = false;
            return;
        }
        isOpen = true;
    }

    public void updateStoreLocation(StoreLocationRequestDto storeLocationRequestDto) {
        this.latitude = storeLocationRequestDto.latitude();
        this.longitude = storeLocationRequestDto.longitude();
    }

    public void addMenu(Menu menu) {
        menuList.add(menu);
    }
}
