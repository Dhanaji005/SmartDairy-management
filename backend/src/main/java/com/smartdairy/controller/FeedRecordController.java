package com.smartdairy.controller;

import com.smartdairy.model.FeedRecord;
import com.smartdairy.repository.FeedRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/feed-records")
@CrossOrigin(origins = "*")
public class FeedRecordController {

    @Autowired
    private FeedRecordRepository feedRecordRepository;

    @GetMapping
    public List<FeedRecord> getAllFeedRecords() {
        return feedRecordRepository.findAll();
    }

    @PostMapping
    public FeedRecord createFeedRecord(@RequestBody FeedRecord record) {
        if (record.getRecordDate() == null) {
            record.setRecordDate(LocalDate.now());
        }
        if (record.getTotalCost() == null && record.getQuantityKg() != null && record.getCostPerKg() != null) {
            record.setTotalCost(record.getQuantityKg() * record.getCostPerKg());
        }
        return feedRecordRepository.save(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedRecord(@PathVariable Long id) {
        if (!feedRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        feedRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
