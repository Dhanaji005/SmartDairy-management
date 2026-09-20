package com.smartdairy.repository;

import com.smartdairy.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {

    List<HealthRecord> findByCowId(Long cowId);

    List<HealthRecord> findByStatus(String status);

    @Query("SELECT h FROM HealthRecord h WHERE h.nextDueDate <= :cutoffDate AND h.status <> 'COMPLETED' ORDER BY h.nextDueDate ASC")
    List<HealthRecord> findUpcomingAlerts(@Param("cutoffDate") LocalDate cutoffDate);
}
