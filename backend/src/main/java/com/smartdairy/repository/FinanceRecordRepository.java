package com.smartdairy.repository;

import com.smartdairy.model.FinanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FinanceRecordRepository extends JpaRepository<FinanceRecord, Long> {

    List<FinanceRecord> findByTransactionDateBetweenOrderByTransactionDateDesc(LocalDate startDate, LocalDate endDate);

    @Query("SELECT COALESCE(SUM(f.amount), 0.0) FROM FinanceRecord f WHERE f.type = :type AND f.transactionDate BETWEEN :startDate AND :endDate")
    Double sumAmountByTypeAndDateRange(@Param("type") String type, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
