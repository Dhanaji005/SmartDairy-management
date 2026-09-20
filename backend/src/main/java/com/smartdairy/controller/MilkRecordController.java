package com.smartdairy.controller;

import com.smartdairy.model.Cow;
import com.smartdairy.model.MilkRecord;
import com.smartdairy.repository.CowRepository;
import com.smartdairy.repository.MilkRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/milk-records")
@CrossOrigin(origins = "*")
public class MilkRecordController {

    @Autowired
    private MilkRecordRepository milkRecordRepository;

    @Autowired
    private CowRepository cowRepository;

    @GetMapping
    public List<MilkRecord> getMilkRecords(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long cowId) {
        if (date != null) {
            return milkRecordRepository.findByRecordDate(date);
        }
        if (cowId != null) {
            return milkRecordRepository.findByCowId(cowId);
        }
        return milkRecordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createMilkRecord(@RequestBody MilkRecord record) {
        if (record.getCow() == null || record.getCow().getId() == null) {
            return ResponseEntity.badRequest().body("Cow ID is required");
        }
        Cow cow = cowRepository.findById(record.getCow().getId()).orElse(null);
        if (cow == null) {
            return ResponseEntity.badRequest().body("Cow not found with ID: " + record.getCow().getId());
        }
        record.setCow(cow);
        if (record.getRecordDate() == null) {
            record.setRecordDate(LocalDate.now());
        }
        MilkRecord saved = milkRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMilkRecord(@PathVariable Long id) {
        if (!milkRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        milkRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
