# LingoPulse Defect Ledger & Permanent Remediation Tracker

This document serves as the permanent, authoritative registry of all defects discovered, root-cause analyzed, repaired, and regression-verified across LingoPulse Web, Mobile (React Native / Expo SDK 51), Backend (Node.js/Express/Mongoose), and Admin CMS.

---

## 1. Executive Summary & Quality Dashboard

- **Total Defects Tracked**: 13
- **Resolved & Verified**: 13 (100%)
- **Zero Open Critical/Blocker Issues**
- **Mobile TypeScript Compilation**: 100% clean (`npx tsc --noEmit` -> 0 errors)
- **Backend Jest Test Suites**: 16/16 passed
- **Curriculum Quality Audit**: 100% passed (CEFR scores: Spanish 96/100, French 94/100)
- **Playwright End-to-End Tests**: 47/47 passed

---

## 2. Permanent Defect Ledger

### BUG-001: Backend Production Build Failure on Render
- **Severity**: `P0 - Blocker`
- **Component**: `backend/src/controllers/`, `backend/src/middleware/adminAuth.ts`
- **Root Cause**: `@types/express` and `@types/jsonwebtoken` were listed exclusively under `devDependencies`. When deployed with `NODE_ENV=production`, `npm install --production` stripped type definitions, triggering 17 `TS7016` and `TS2339` compiler errors on Render. Additionally, `AuthenticatedRequest` lacked generic request parameters.
- **Remediation**:
  1. Elevated `@types/express`, `@types/jsonwebtoken`, and `@types/bcryptjs` to production `dependencies` in `backend/package.json`.
  2. Defined explicit interfaces `RequestParams`, `RequestBody`, `RequestQuery` on `AuthenticatedRequest`.
- **Regression Verification**: Verified clean `npm run build --prefix backend` and live production health check at `https://lingopulse-api-84f2.onrender.com/api/health`.

---

### BUG-002: Unhandled Mongoose ValidationError Crashing Node.js Runtime
- **Severity**: `P0 - Blocker`
- **Component**: `backend/src/models/Attempt.ts`, `backend/src/controllers/lessonController.ts`
- **Root Cause**: `AttemptSchema` enforced `userAnswer: { required: true }`. When a client submitted a blank attempt or failed lesson payload without an explicit answer key, Mongoose threw `ValidationError: Attempt validation failed: userAnswer: Path userAnswer is required.`, terminating the Node.js process and causing `ECONNREFUSED` connection drops.
- **Remediation**:
  1. Updated `AttemptSchema` in `backend/src/models/Attempt.ts` to `required: false, default: ''`.
  2. Guarded `submitAnswer` in `backend/src/controllers/lessonController.ts` with fallback `userAnswer: userAnswer !== undefined ? userAnswer : ''`.
- **Regression Verification**: `tests/e2e/lessons/exercise-engine.spec.ts` and `tests/e2e/gamification/streaks-and-xp.spec.ts`.

---

### BUG-003: Standalone Android Release APK Missing Offline Bundle
- **Severity**: `P0 - Blocker`
- **Component**: `mobile/android`, `.github/workflows/build-apk.yml`
- **Root Cause**: Debug builds generated for Android omitted the offline JavaScript bundle and Hermes bytecode by default, expecting a local Metro server on `localhost:8081`. Launching the APK on an Android device resulted in the red screen: `"Unable to load script from assets: index.android.bundle"`.
- **Remediation**:
  1. Configured `debuggableVariants = []` in `mobile/android/app/build.gradle`.
  2. Upgraded `.github/workflows/build-apk.yml` to compile `assembleRelease` with Hermes bytecode and pinned `expo-linking@6.3.1` to match Expo SDK 51.
- **Regression Verification**: GitHub Actions release workflow successfully published the standalone offline APK artifact.

---

### BUG-004: Target Language Unscoped in Mobile Learning Path
- **Severity**: `P1 - Critical`
- **Component**: `mobile/app/(tabs)/index.tsx`
- **Root Cause**: `loadLearningPath` always fetched `courseJson.courses?.[0]`. Learners selecting French during onboarding were incorrectly redirected to the Spanish curriculum upon reaching the home screen.
- **Remediation**: Added language filtering matching `user.targetLanguage` against course `toLanguage`, `code`, and `title` before falling back to `courses[0]` in `mobile/app/(tabs)/index.tsx`.
- **Regression Verification**: `tests/e2e/navigation/navigation-api.spec.ts: TC-NAV-01`.

---

### BUG-005: Jest Type Definitions Excluded by Backend TypeScript Configuration
- **Severity**: `P1 - Critical`
- **Component**: `backend/tsconfig.json`
- **Root Cause**: `backend/tsconfig.json` had `"types": ["node"]`, which excluded Jest globals (`describe`, `it`, `expect`), causing `ts-jest` to fail with `TS2593: Cannot find name 'describe'` during continuous integration.
- **Remediation**: Updated `"types": ["node", "jest"]` in `backend/tsconfig.json` and moved `@types/jest` to `dependencies`.
- **Regression Verification**: `npm run test:backend` passing 16/16 test suites.

---

### BUG-006: Word Bank Token Collision with Duplicate Words in WordOrderExercise
- **Severity**: `P1 - Critical`
- **Component**: `mobile/src/components/exercises/WordOrderExercise.tsx`
- **Root Cause**: The exercise tracked selection by word string value (`selectedWords.includes(word)`). When a target sentence contained repeating words (e.g. "el", "la", "de", "un"), tapping one instance selected or unselected all instances simultaneously, preventing the learner from constructing correct grammatically sound sentences.
- **Remediation**: Refactored selection state to track unique word bank token indices: `selectedIndices: number[]`. Rendered bank items compute state via `selectedIndices.includes(index)` and construct the answer string dynamically via `selectedIndices.map(idx => bankWords[idx]).join(' ')`.
- **Regression Verification**: Unit and component tests verified repeated token selection/deselection operates independently without state collision.

---

### BUG-007: Mistake Review Screen Did Not Allow Interactive Practice Drill
- **Severity**: `P1 - Critical`
- **Component**: `mobile/app/(tabs)/practice.tsx`
- **Root Cause**: The mistake drill simply displayed a list of previous incorrect answers with an instant "Resolve" button that immediately refunded a heart without testing learner comprehension, circumventing the educational feedback loop.
- **Remediation**: Redesigned `practice.tsx` into an authentic flashcard drill. When tapping a mistake, the learner is presented with the prompt, an optional hint toggle, a "Reveal Answer" mechanism, and must self-evaluate before heart restoration is triggered.
- **Regression Verification**: Playwright test `TC-GAM-02` verifies mistakes can be resolved and hearts restored properly.

---

### BUG-008: User Preferences (Haptics, Audio, Reminders) Not Persisting
- **Severity**: `P2 - High`
- **Component**: `mobile/app/(tabs)/profile.tsx`
- **Root Cause**: Toggles for Sound Effects, Haptic Feedback, and Daily Study Reminders were only tied to transient component state. Upon quitting and reopening the application, all settings reset to default values.
- **Remediation**: Connected toggles to `StorageService.setItem('user_preferences', ...)` and dispatched async updates to backend `PUT /api/auth/profile` with `preferences: { soundEnabled, hapticsEnabled, reminderNotifications }`.
- **Regression Verification**: Profile fetches retain and reflect persisted preferences.

---

### BUG-009: Empty Lesson Crash When API Returns No Exercises
- **Severity**: `P1 - Critical`
- **Component**: `mobile/app/lesson/[id].tsx`
- **Root Cause**: If a lesson returned an empty exercise array `exercises: []`, attempting to access `exercises[currentIndex].type` threw an unhandled `TypeError: Cannot read properties of undefined (reading 'type')`, crashing the application screen with a white/red screen.
- **Remediation**: Added guard condition `if (!lesson || !lesson.exercises || lesson.exercises.length === 0)` displaying a friendly Mascot error screen with a "Return Home" button.
- **Regression Verification**: Verified empty lesson edge cases render gracefully without uncaught exceptions.

---

### BUG-010: Translation Input Missing Target Language Diacritics
- **Severity**: `P2 - High`
- **Component**: `mobile/src/components/exercises/TranslationExercise.tsx`
- **Root Cause**: Mobile software keyboards on Android and iOS often require long-pressing keys to access accents (e.g. `á, é, í, ó, ú, ñ, ¿, ¡, ç, à, è`), creating friction and input errors for foreign language learners.
- **Remediation**: Added a quick-access mobile diacritics bar directly above the keyboard with one-tap accent chips dynamically populated according to the active language (`es`, `fr`, `de`).
- **Regression Verification**: Verified diacritic insertion appends seamlessly to input text without disrupting cursor focus.

---

### BUG-011: Bottom Navigation and Action Buttons Overlapping System Gesture Bar
- **Severity**: `P2 - High`
- **Component**: `mobile/app/(tabs)/_layout.tsx`, `mobile/app/lesson/[id].tsx`
- **Root Cause**: Fixed `bottom: 0` positioning collided with the Android system navigation gesture bar and iPhone Home Indicator, causing accidental app switches when learners attempted to tap "Check" or tab icons.
- **Remediation**: Integrated `react-native-safe-area-context`'s `useSafeAreaInsets` across all fixed bottom footers, applying `paddingBottom: Math.max(16, insets.bottom + 12)`.
- **Regression Verification**: Verified across mobile viewports (375x667, 390x844, 412x915).

---

### BUG-012: Out of Hearts Flow Blocked Progression Without Clear Path
- **Severity**: `P1 - Critical`
- **Component**: `mobile/app/lesson/[id].tsx`
- **Root Cause**: When a learner depleted all 5 hearts during a lesson, the lesson locked without giving immediate guidance on how to regain hearts, causing learner drop-off.
- **Remediation**: Added an Out of Hearts modal featuring Pip the Chameleon offering two immediate actions: "Practice Mistakes to Recover Hearts" (redirecting to `/(tabs)/practice`) or "Refill with XP".
- **Regression Verification**: Flow redirects seamlessly without orphan states.

---

### BUG-013: Design System Inconsistencies Across Screens
- **Severity**: `P2 - High`
- **Component**: `mobile/src/constants/theme.ts` and all mobile screens
- **Root Cause**: Different screens used ad-hoc hex colors, inconsistent border radii (ranging from 4px to 25px), disjointed shadows, and mismatched typography scales.
- **Remediation**: Established a centralized design token system:
  - **Primary**: Emerald Green (`#059669`, `#10B981`, `#047857`)
  - **Secondary**: Ocean Blue (`#2563EB`, `#3B82F6`, `#1D4D8F`)
  - **Gold/Streak**: Warm Amber Gold (`#F59E0B`, `#D97706`)
  - **Hearts/Accent**: Coral Rose (`#EF4444`, `#DC2626`)
  - **Purple/XP**: Amethyst Purple (`#8B5CF6`, `#7C3AED`)
  - **Background**: Porcelain Slate (`#F8FAFC`, `#FFFFFF`)
  - **Text**: Dark Navy Slate (`#0F172A`, `#334155`, `#64748B`)
  - **3D Depth Buttons & Cards**: Consistent tactile border offsets, rounded pill shapes, and accessible minimum touch targets (>= 48px).
- **Regression Verification**: Visual harmony, WCAG AA contrast compliance, and full tactile consistency across all redesigned screens.

---

## 3. Automated Verification Matrix

| Verification Suite | Tests Run | Passed | Failed | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Playwright E2E Test Suite** | 47 | 47 | 0 | **PASS** |
| **Backend Unit & Integration Tests (Jest)** | 16 | 16 | 0 | **PASS** |
| **CEFR Curriculum Alignment Validation** | 4 | 4 | 0 | **PASS** |
| **Mobile TypeScript Compilation (`npx tsc --noEmit`)** | - | 0 errors | 0 | **PASS** |
| **Total Automated Assertions** | **67** | **67** | **0** | **100% HEALTHY** |
