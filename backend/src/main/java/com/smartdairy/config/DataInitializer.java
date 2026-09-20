package com.smartdairy.config;

import com.smartdairy.model.*;
import com.smartdairy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CowRepository cowRepository;

    @Autowired
    private MilkRecordRepository milkRecordRepository;

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private FeedRecordRepository feedRecordRepository;

    @Autowired
    private FinanceRecordRepository financeRecordRepository;

    @Override
    public void run(String... args) {
        if (cowRepository.count() > 0) {
            return; // Data already exists
        }

        System.out.println("🌱 Initializing Smart Dairy seed sample data...");

        // 1. Seed Cows
        Cow cow1 = new Cow(null, "TAG-101", "Gauri", "Gir", "Female", LocalDate.now().minusYears(4), "Early", "Healthy", 420.0, "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400", "High yield indigenous breed");
        Cow cow2 = new Cow(null, "TAG-102", "Laxmi", "Sahiwal", "Female", LocalDate.now().minusYears(3), "Mid", "Healthy", 390.0, "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=400", "Good fat content");
        Cow cow3 = new Cow(null, "TAG-103", "Daisy", "Holstein Friesian", "Female", LocalDate.now().minusYears(5), "Late", "Healthy", 580.0, "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400", "Consistent high producer");
        Cow cow4 = new Cow(null, "TAG-104", "Shyama", "Murrah Buffalo", "Female", LocalDate.now().minusYears(4), "Mid", "Under Observation", 610.0, "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400", "Minor fever observed yesterday");
        Cow cow5 = new Cow(null, "TAG-105", "Kaveri", "Jersey", "Female", LocalDate.now().minusYears(2), "Dry", "Healthy", 360.0, "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400", "Due for calving in 45 days");

        cowRepository.saveAll(Arrays.asList(cow1, cow2, cow3, cow4, cow5));

        // 2. Seed Daily Milk Records (Past 7 days)
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            LocalDate d = today.minusDays(i);
            milkRecordRepository.save(new MilkRecord(null, cow1, d, "MORNING", 9.5, 4.8, 8.9, "Regular morning"));
            milkRecordRepository.save(new MilkRecord(null, cow1, d, "EVENING", 8.0, 4.9, 8.8, "Regular evening"));
            milkRecordRepository.save(new MilkRecord(null, cow2, d, "MORNING", 8.0, 4.5, 8.6, "Normal"));
            milkRecordRepository.save(new MilkRecord(null, cow2, d, "EVENING", 7.2, 4.6, 8.7, "Normal"));
            milkRecordRepository.save(new MilkRecord(null, cow3, d, "MORNING", 14.0, 3.8, 8.4, "High morning yield"));
            milkRecordRepository.save(new MilkRecord(null, cow3, d, "EVENING", 12.5, 3.9, 8.5, "High evening yield"));
            milkRecordRepository.save(new MilkRecord(null, cow4, d, "MORNING", 7.0, 6.8, 9.2, "Rich buffalo milk"));
            milkRecordRepository.save(new MilkRecord(null, cow4, d, "EVENING", 6.5, 7.0, 9.3, "Rich buffalo milk"));
        }

        // 3. Seed Health & Vaccination Records
        healthRecordRepository.save(new HealthRecord(null, cow1, "FMD (Foot & Mouth) Vaccine", today.minusMonths(5), today.plusDays(10), "Dr. Sharma", 250.0, "SCHEDULED", "Bi-annual booster due soon"));
        healthRecordRepository.save(new HealthRecord(null, cow2, "Deworming (Albendazole)", today.minusMonths(2), today.plusDays(25), "Dr. Sharma", 120.0, "SCHEDULED", "Routine deworming"));
        healthRecordRepository.save(new HealthRecord(null, cow4, "Mild Mastitis Treatment", today.minusDays(3), today.plusDays(2), "Dr. Verma", 650.0, "SCHEDULED", "Antibiotic course follow up"));
        healthRecordRepository.save(new HealthRecord(null, cow3, "Black Quarter (BQ) Vaccine", today.minusMonths(3), today.plusMonths(3), "Dr. Sharma", 300.0, "COMPLETED", "Administered successfully"));

        // 4. Seed Feed Records
        feedRecordRepository.save(new FeedRecord(null, today, "Green Fodder (Berseem)", 120.0, 3.5, 420.0, "Fresh morning harvest"));
        feedRecordRepository.save(new FeedRecord(null, today, "Concentrate Cattle Feed (20% Protein)", 45.0, 24.0, 1080.0, "High lactation ration"));
        feedRecordRepository.save(new FeedRecord(null, today, "Dry Wheat Straw", 60.0, 6.0, 360.0, "Evening roughage"));

        // 5. Seed Finance Records
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(1), "INCOME", "MILK_SALE", 4650.0, "Daily dairy cooperative milk collection"));
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(2), "INCOME", "MILK_SALE", 4500.0, "Daily milk collection payment"));
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(3), "INCOME", "MILK_SALE", 4720.0, "Daily milk collection payment"));
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(2), "EXPENSE", "FEED", 1860.0, "Purchased 2 bags of cattle concentrate"));
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(4), "EXPENSE", "VET_MEDICINE", 650.0, "Veterinary visit and antibiotic ointment"));
        financeRecordRepository.save(new FinanceRecord(null, today.minusDays(5), "EXPENSE", "LABOUR", 2000.0, "Farm helper weekly wages"));

        System.out.println("✅ Seed sample data created successfully!");
    }
}
