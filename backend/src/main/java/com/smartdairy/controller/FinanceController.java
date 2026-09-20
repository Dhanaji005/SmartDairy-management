package com.smartdairy.controller;

import com.smartdairy.model.FinanceRecord;
import com.smartdairy.repository.FinanceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/finances")
@CrossOrigin(origins = "*")
public class FinanceController {

    @Autowired
    private FinanceRecordRepository financeRecordRepository;

    @GetMapping
    public List<FinanceRecord> getAllFinances() {
        return financeRecordRepository.findAll();
    }

    @PostMapping
    public FinanceRecord createFinance(@RequestBody FinanceRecord record) {
        if (record.getTransactionDate() == null) {
            record.setTransactionDate(LocalDate.now());
        }
        return financeRecordRepository.save(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinance(@PathVariable Long id) {
        if (!financeRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        financeRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
