package com.smartdairy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartDairyApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartDairyApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🐄 Smart Dairy Management Backend is running!");
        System.out.println("🌐 API Base URL: http://localhost:8080/api");
        System.out.println("=================================================");
    }
}
