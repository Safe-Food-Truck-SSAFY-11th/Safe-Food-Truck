package com.safefoodtruck.sft.schedule.repository;

import com.safefoodtruck.sft.schedule.domain.Schedule;
import com.safefoodtruck.sft.store.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    Schedule findByStoreAndDay(Store store, Integer day);
}
