package com.smartdairy.repository;

import com.smartdairy.model.FeedRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FeedRecordRepository extends JpaRepository<FeedRecord, Long> {
    List<FeedRecord> findByRecordDateBetweenOrderByRecordDateDesc(LocalDate startDate, LocalDate endDate);
}
