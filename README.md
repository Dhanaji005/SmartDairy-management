# 🐄 Smart Dairy Management System

> **Healthy Cows | Better Milk | Smarter Farming**  
> An AI-powered fullstack web application for modern dairy farm management.

---

## 📁 Project Structure

```
smart-dairy-management/
├── ARCHITECTURE.md                  # Complete System Architecture & ER Diagram
├── README.md                        # Quick Start & Setup Guide
├── backend/                         # Spring Boot 3 Java Backend
│   ├── pom.xml                      # Maven Configuration (PostgreSQL, JPA, Web, Lombok)
│   └── src/main/
│       ├── java/com/smartdairy/     # Models, Repositories, Services, Controllers
│       └── resources/
│           ├── application.properties           # Primary Configuration (Local H2 fallback)
│           └── application-supabase.properties  # Supabase PostgreSQL Configuration
└── frontend/                        # React.js Modern Web Dashboard
    ├── package.json                 # React + Tailwind + Lucide Icons dependencies
    ├── vite.config.js               # Vite config with API proxy
    └── src/                         # Dashboard, Cattle, Milk, Health, Finance & AI pages
```

---

## 🚀 Getting Started

### 1. Backend (Spring Boot 3 + Java)

#### Option A: Quick Local Mode (Zero Setup - Runs Immediately)
The default `application.properties` uses an in-memory/file H2 database.
```bash
cd backend
mvn spring-boot:run
```
API will start on `http://localhost:8080`.

#### Option B: Cloud Supabase Mode (Recommended for Production & Mobile)
1. In your [Supabase Dashboard](https://supabase.com), go to **Project Settings -> Database**.
2. Copy your Connection String (JDBC / PostgreSQL).
3. Open `backend/src/main/resources/application-supabase.properties` and add your database password:
   ```properties
   spring.datasource.url=jdbc:postgresql://<YOUR_SUPABASE_HOST>:5432/postgres?sslmode=require
   spring.datasource.username=postgres
   spring.datasource.password=YOUR_ACTUAL_PASSWORD
   ```
4. Run Spring Boot with the `supabase` profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=supabase
   ```
Spring Boot will automatically create all tables and relations in your Supabase PostgreSQL database!

---

### 2. Frontend (React.js + JavaScript)

1. Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser at `http://localhost:5173`.
3. The dashboard is fully connected to the Spring Boot REST API on `http://localhost:8080`.

---

## 📱 Future Mobile App Integration
Because the backend is built with decoupled REST APIs:
- Any mobile client (React Native / Flutter / Android) can query `http://<your-backend-domain>/api/*`.
- Supabase provides direct cloud storage for cattle photos and veterinary prescription uploads.
