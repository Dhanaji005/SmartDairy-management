package com.smartdairy.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "cows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tag number is required")
    @Column(nullable = false, unique = true)
    private String tagNumber;

    private String name;

    private String breed; // e.g., Holstein Friesian, Jersey, Gir, Sahiwal, Murrah Buffalo

    private String gender; // Female, Male

    private LocalDate birthDate;

    private String lactationStage; // Early, Mid, Late, Dry, Pregnant

    private String healthStatus; // Healthy, Sick, Under Observation, In Treatment

    private Double weightKg;

    private String photoUrl;

    @Column(length = 1000)
    private String notes;

    // Constructors
    public Cow() {}

    public Cow(Long id, String tagNumber, String name, String breed, String gender, LocalDate birthDate, String lactationStage, String healthStatus, Double weightKg, String photoUrl, String notes) {
        this.id = id;
        this.tagNumber = tagNumber;
        this.name = name;
        this.breed = breed;
        this.gender = gender;
        this.birthDate = birthDate;
        this.lactationStage = lactationStage;
        this.healthStatus = healthStatus;
        this.weightKg = weightKg;
        this.photoUrl = photoUrl;
        this.notes = notes;
    }

    // Explicit Getters and Setters for guaranteed compilation compatibility
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTagNumber() { return tagNumber; }
    public void setTagNumber(String tagNumber) { this.tagNumber = tagNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public String getLactationStage() { return lactationStage; }
    public void setLactationStage(String lactationStage) { this.lactationStage = lactationStage; }

    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
