package com.safefoodtruck.sft.schedule.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.safefoodtruck.sft.notification.exception.NotSameUserException;
import com.safefoodtruck.sft.schedule.domain.Schedule;
import com.safefoodtruck.sft.schedule.dto.ScheduleDto;
import com.safefoodtruck.sft.schedule.dto.request.ScheduleInsertRequestDto;
import com.safefoodtruck.sft.schedule.dto.response.ScheduleSelectResponseDto;
import com.safefoodtruck.sft.schedule.exception.InvalidRangeDayException;
import com.safefoodtruck.sft.schedule.exception.NotInsertedStoreException;
import com.safefoodtruck.sft.schedule.repository.ScheduleRepository;
import com.safefoodtruck.sft.store.domain.Store;
import com.safefoodtruck.sft.store.repository.StoreRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final StoreRepository storeRepository;

    @Override
    public void insertSchedule(String ownerEmail,
        ScheduleInsertRequestDto scheduleInsertRequestDto) {
        Integer day = scheduleInsertRequestDto.getDay();
        if (day < 0 || day > 6) throw new InvalidRangeDayException();

        Store store = storeRepository.findStoreWithMenusAndImagesByOwnerEmail(ownerEmail)
            .orElseThrow(NotInsertedStoreException::new);
        Schedule schedule = scheduleRepository.findByStoreAndDay(store,
            scheduleInsertRequestDto.getDay());

        if (schedule != null) {
            schedule.updateSchedule(scheduleInsertRequestDto);
        } else {
            schedule = Schedule.builder()
                .store(store)
                .scheduleInsertRequestDto(scheduleInsertRequestDto)
                .build();
        }
        scheduleRepository.save(schedule);
    }

    @Override
    public ScheduleSelectResponseDto selectSchedule(Integer storeId) {
        List<ScheduleDto> scheduleList = scheduleRepository.findSchedules(storeId);
        return new ScheduleSelectResponseDto(scheduleList);
    }

    @Override
    public void deleteSchedule(String ownerEmail, Integer scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(NotInsertedStoreException::new);
        Integer storeId = schedule.getStore().getId();
        Integer loginStoreId = storeRepository.findStoreWithMenusAndImagesByOwnerEmail(ownerEmail)
            .orElseThrow(NotInsertedStoreException::new).getId();

        if (!storeId.equals(loginStoreId)) {
            throw new NotSameUserException();
        }
        scheduleRepository.delete(schedule);
    }
}
