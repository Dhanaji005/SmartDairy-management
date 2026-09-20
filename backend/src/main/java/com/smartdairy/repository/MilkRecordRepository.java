package com.smartdairy.repository;

import com.smartdairy.model.MilkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MilkRecordRepository extends JpaRepository<MilkRecord, Long> {

    List<MilkRecord> findByRecordDate(LocalDate recordDate);

    List<MilkRecord> findByCowId(Long cowId);

    List<MilkRecord> findByRecordDateBetweenOrderByRecordDateAsc(LocalDate startDate, LocalDate endDate);

    @Query("SELECT COALESCE(SUM(m.quantityLiters), 0.0) FROM MilkRecord m WHERE m.recordDate = :date")
    Double sumQuantityByDate(@Param("date") LocalDate date);
}
