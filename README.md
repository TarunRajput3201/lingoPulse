# LingoPulse 🌍 (LangLearn)
### Production-Ready Mobile Language Learning Platform Inspired by Duolingo

LingoPulse is a full-stack, production-ready mobile language learning platform built from scratch for **Apple App Store** and **Google Play Store** distribution.

It combines gamified learning mechanics (daily streaks, XP gems, hearts, weekly leagues, animated celebratory milestones) with an authoritative server-side architecture and an administrative CMS for dynamic curriculum authoring.

---

## 🌟 Original Brand & Identity

* **Brand Name:** **LingoPulse**
* **Mascot:** **Pip the Chameleon** (vector SVG mascot with expressive animated states: happy, encouraging, thinking, celebrating).
* **Color Palette:**
  * **Fresh Grass Green:** `#58CC02` (Primary / Success / Completed lessons)
  * **Sky Blue:** `#1CB0F6` (Secondary / Unit 2 / Selected states)
  * **Coral Red:** `#FF4B4B` (Hearts / Mistakes / Attention)
  * **Honey Gold:** `#FFC800` (Daily streaks / XP / Trophy leagues)
  * **Gem Purple:** `#CE82FF` (Milestones / Achievements)
* **Design Philosophy:** Tactile 3D pressable buttons, rounded cards, micro-haptics, sound chimes, and smooth responsive touch interactions.

---

## 📁 Repository Structure

```
D:\Projects\langLearn\
├── shared/                  # Shared TypeScript models, contracts, and constants
│   ├── src/index.ts         # User, Course, Unit, Lesson, 10+ Exercise types
│   └── package.json
│
├── backend/                 # Node.js + Express + TypeScript + MongoDB REST API
│   ├── src/
│   │   ├── config/          # Database & environment variables
│   │   ├── models/          # User, Course, Unit, Lesson, Exercise, Progress, Attempt, Achievement, Leaderboard
│   │   ├── services/        # StreakService, HeartService, ExerciseValidator, XPService
│   │   ├── controllers/     # Auth, Course, Lesson, Practice, Leaderboard, Admin, Achievements
│   │   ├── middleware/      # JWT auth, Admin auth, Error handler
│   │   ├── seed/            # Seed script with Spanish courses and all 10+ exercise types
│   │   └── app.ts / server.ts
│   ├── __tests__/           # Jest & Supertest automated integration tests
│   └── package.json
│
├── mobile/                  # React Native + Expo SDK 51 + TypeScript mobile app
│   ├── app/                 # Expo Router file-based navigation
│   │   ├── (auth)/          # Login & Registration screens
│   │   ├── (tabs)/          # Home (Learning Path), Courses, Practice, Leaderboard, Profile
│   │   ├── onboarding/      # Language, Level, and Daily Goal onboarding flow
│   │   ├── lesson/[id].tsx  # Full interactive lesson player with exercise engine & feedback drawer
│   │   └── _layout.tsx      # Root provider layout
│   ├── src/
│   │   ├── components/      # Button3D, HeaderBar, MascotPip, Exercise components
│   │   ├── context/         # AuthContext with session persistence
│   │   ├── services/        # StorageService (SecureStore), SoundService, HapticsService
│   │   └── constants/       # Theme tokens, API endpoints
│   ├── app.json             # iOS & Android production bundle and permissions configuration
│   ├── eas.json             # EAS Build and Submit profiles
│   └── package.json
│
├── admin/                   # React + Vite + TypeScript + Tailwind Administrative CMS
│   ├── src/
│   │   ├── components/      # AnalyticsView, CourseManager, ExerciseEditor (with live mobile preview)
│   │   └── api.ts           # Admin REST client
│   └── package.json
│
└── docs/                    # App Store & Play Store publication guides
    ├── PRIVACY_POLICY.md    # GDPR & App Store compliant privacy policy
    ├── STORE_LISTING.md     # App descriptions, keywords, and metadata
    └── STORE_RELEASE_CHECKLIST.md # Step-by-step submission guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js**: v20+ installed
* **MongoDB**: Running locally on `mongodb://localhost:27017/lingopulse` (or MongoDB Atlas URI)

### 2. Seed Database
Initialize the database with Spanish courses, achievements, administrator, and demo accounts:
```bash
cd D:\Projects\langLearn\backend
npm run seed
```

Pre-seeded accounts:
* **Demo Learner:** `learner@lingopulse.com` / `LearnerPassword123!`
* **Administrator:** `admin@lingopulse.com` / `AdminPassword123!`

### 3. Start Backend Server
```bash
cd D:\Projects\langLearn\backend
npm run dev
```
API runs on `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

### 4. Start Admin CMS Dashboard
In a new terminal:
```bash
cd D:\Projects\langLearn\admin
npm run dev
```
Open `http://localhost:5173` in your browser. Administrators can create courses, units, and interactive exercises with live mobile preview. Any changes publish live to the mobile app instantly!

### 5. Start Mobile Application
In a new terminal:
```bash
cd D:\Projects\langLearn\mobile
npm start
```
* Press **`a`** to launch on Android Emulator or connected physical device.
* Press **`i`** to launch on iOS Simulator.
* Press **`w`** to preview in a web browser.
* Or scan the terminal QR code with the **Expo Go** mobile app on your iPhone or Android phone.

---

## 🧪 Automated Testing

Run the backend integration test suite:
```bash
cd D:\Projects\langLearn\backend
npm test
```
Verifies health checks, authentication, user registration, profile retrieval, and exercise validation.

---

## 📱 Publishing to App Store & Google Play

Refer to [`docs/STORE_RELEASE_CHECKLIST.md`](file:///D:/Projects/langLearn/docs/STORE_RELEASE_CHECKLIST.md) for full submission instructions.

### Build Android Production App Bundle (.aab)
```bash
cd D:\Projects\langLearn\mobile
eas build --platform android --profile production
```

### Build iOS Production Archive (.ipa)
```bash
cd D:\Projects\langLearn\mobile
eas build --platform ios --profile production
```
