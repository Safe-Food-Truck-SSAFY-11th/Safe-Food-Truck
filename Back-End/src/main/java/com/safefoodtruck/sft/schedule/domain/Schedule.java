package com.safefoodtruck.sft.schedule.domain;

import com.safefoodtruck.sft.schedule.dto.request.ScheduleInsertRequestDto;
import com.safefoodtruck.sft.store.domain.Store;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "schedule")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "day")
    private Integer day;

    @Column(name = "address")
    private String address;

    @Column(name = "add_address")
    private String addAddress;

    public void updateSchedule(ScheduleInsertRequestDto scheduleInsertRequestDto) {
        this.address = scheduleInsertRequestDto.getAddress();
        this.addAddress = scheduleInsertRequestDto.getAddAddress();
    }

    @Builder
    public Schedule(Store store, ScheduleInsertRequestDto scheduleInsertRequestDto) {
        this.store = store;
        this.day = scheduleInsertRequestDto.getDay();
        this.address = scheduleInsertRequestDto.getAddress();
        this.addAddress = scheduleInsertRequestDto.getAddAddress();
    }
}
