package com.safefoodtruck.sft.schedule.repository;

import com.safefoodtruck.sft.schedule.domain.Schedule;
import com.safefoodtruck.sft.schedule.dto.ScheduleDto;
import com.safefoodtruck.sft.store.domain.Store;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    Schedule findByStoreAndDay(Store store, Integer day);

    @Query(value = "SELECT new com.safefoodtruck.sft.schedule.dto.ScheduleDto(s.id, s.store.id, s.day, s.address, s.addAddress) " +
        "FROM Schedule s " +
        "WHERE s.store.id = :storeId " +
        "ORDER BY s.day")
    List<ScheduleDto> findSchedules(@Param("storeId") Integer storeId);
    /*
    @Query(value = "SELECT new com.safefoodtruck.sft.survey.dto.SelectSurveysResponseDto(s.storeType, COUNT(s)) " +
        "FROM Survey s " +
        "WHERE s.sido LIKE %:sido% " +
        "AND s.sigungu LIKE %:sigungu% " +
        "AND s.dong LIKE %:dong% " +
        "GROUP BY s.storeType")
    List<SelectSurveysResponseDto> findSurveysResponse(
        @Param("sido") String sido,
        @Param("sigungu") String sigungu,
        @Param("dong") String dong
    );
     */
}
