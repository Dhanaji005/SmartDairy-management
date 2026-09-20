package com.smartdairy.controller;

import com.smartdairy.model.Cow;
import com.smartdairy.model.HealthRecord;
import com.smartdairy.repository.CowRepository;
import com.smartdairy.repository.HealthRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/health-records")
@CrossOrigin(origins = "*")
public class HealthRecordController {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private CowRepository cowRepository;

    @GetMapping
    public List<HealthRecord> getAllHealthRecords(@RequestParam(required = false) Long cowId) {
        if (cowId != null) {
            return healthRecordRepository.findByCowId(cowId);
        }
        return healthRecordRepository.findAll();
    }

    @GetMapping("/alerts")
    public List<HealthRecord> getUpcomingAlerts() {
        return healthRecordRepository.findUpcomingAlerts(LocalDate.now().plusDays(14));
    }

    @PostMapping
    public ResponseEntity<?> createHealthRecord(@RequestBody HealthRecord record) {
        if (record.getCow() == null || record.getCow().getId() == null) {
            return ResponseEntity.badRequest().body("Cow ID is required");
        }
        Cow cow = cowRepository.findById(record.getCow().getId()).orElse(null);
        if (cow == null) {
            return ResponseEntity.badRequest().body("Cow not found with ID: " + record.getCow().getId());
        }
        record.setCow(cow);
        if (record.getAdministeredDate() == null) {
            record.setAdministeredDate(LocalDate.now());
        }
        if (record.getStatus() == null) {
            record.setStatus("SCHEDULED");
        }
        HealthRecord saved = healthRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> markCompleted(@PathVariable Long id) {
        return healthRecordRepository.findById(id).map(record -> {
            record.setStatus("COMPLETED");
            return ResponseEntity.ok(healthRecordRepository.save(record));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthRecord(@PathVariable Long id) {
        if (!healthRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        healthRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
