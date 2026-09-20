package com.smartdairy.controller;

import com.smartdairy.model.Cow;
import com.smartdairy.repository.CowRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cows")
@CrossOrigin(origins = "*")
public class CowController {

    @Autowired
    private CowRepository cowRepository;

    @GetMapping
    public List<Cow> getAllCows() {
        return cowRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cow> getCowById(@PathVariable Long id) {
        return cowRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cow createCow(@Valid @RequestBody Cow cow) {
        return cowRepository.save(cow);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cow> updateCow(@PathVariable Long id, @Valid @RequestBody Cow updatedCow) {
        return cowRepository.findById(id).map(cow -> {
            cow.setTagNumber(updatedCow.getTagNumber());
            cow.setName(updatedCow.getName());
            cow.setBreed(updatedCow.getBreed());
            cow.setGender(updatedCow.getGender());
            cow.setBirthDate(updatedCow.getBirthDate());
            cow.setLactationStage(updatedCow.getLactationStage());
            cow.setHealthStatus(updatedCow.getHealthStatus());
            cow.setWeightKg(updatedCow.getWeightKg());
            cow.setPhotoUrl(updatedCow.getPhotoUrl());
            cow.setNotes(updatedCow.getNotes());
            return ResponseEntity.ok(cowRepository.save(cow));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCow(@PathVariable Long id) {
        if (!cowRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cowRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
