# LingoPulse Defect Register & Resolution Log

**Audit Cycle:** Comprehensive Language Learning QA, Curriculum & Engagement Audit  
**Date:** October 25, 2026  
**Status:** All Identified Defects Resolved & Verified by Automated Test Suites  

---

## Defect Summary Table

| Defect ID | Severity | Category | Root Cause | Fix Description | Verification Test | Status |
|---|---|---|---|---|---|---|
| **DEF-001** | **HIGH** | Pedagogy / SLA | Diacritic strictness in `ExerciseValidator` penalized learners typing on standard keyboards without accent keys. | Implemented Unicode NFD accent-tolerant normalization. Answers without accents pass with soft pedagogical reminder. | `tests/e2e/language-quality.spec.ts` | **VERIFIED ✅** |
| **DEF-002** | **HIGH** | Curriculum Coverage | `seedCourses.ts` left French Foundations with 0 units and Spanish Unit 2 without Checkpoint 2. | Seeded complete CEFR A1 curriculum for Spanish (5 lessons, 2 checkpoints) and French (2 lessons, 1 checkpoint). | `scripts/validateCurriculum.ts` | **VERIFIED ✅** |
| **DEF-003** | **CRITICAL** | Core Progression | `Promise.all(units.map(async ...))` in `courseController.ts` caused race conditions on shared locking flags. | Replaced concurrent map with sequential `for (const unit of units)` loop to ensure strictly ordered lesson unlocking. | `tests/e2e/curriculum-audit.spec.ts` | **VERIFIED ✅** |
| **DEF-004** | **MEDIUM** | Progress Tracking | `completeLesson` in `lessonController.ts` counted lessons across all courses instead of the target course. | Scoped total lesson count query to the current course's units in `lessonController.ts`. | `tests/e2e/learner-journeys.spec.ts` | **VERIFIED ✅** |
| **DEF-005** | **HIGH** | Admin API & CMS | `router.use(authenticate, requireAdmin)` rejected `x-admin-key` header with 401 before `requireAdmin` could verify. | Updated `requireAdmin` to handle `x-admin-key` first and updated route middleware to `router.use(requireAdmin)`. | `tests/e2e/curriculum-audit.spec.ts` | **VERIFIED ✅** |
| **DEF-006** | **MEDIUM** | Gamification API | `leaderboardController.ts` omitted `username` in returned leaderboard objects. | Added `username: entry.userId?.username` to formatted leaderboard payload. | `tests/e2e/gamification-friction.spec.ts` | **VERIFIED ✅** |

---

## Detailed Defect Reports & Remediation

### DEF-001: Missing Unicode Accent & Diacritic Tolerance
- **Component:** `backend/src/services/exerciseValidator.ts`, `backend/src/controllers/lessonController.ts`
- **Symptom:** When a learner answered `"buenos dias"` instead of `"Buenos días"`, the validator deducted a heart and marked the answer wrong.
- **Pedagogical Impact:** Causes anxiety and unfair penalties for mobile learners whose keyboards do not easily input diacritics. Violates the low affective filter principle.
- **Resolution:**
  - Added `stripAccents(text)` via `text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')`.
  - Added `compareWithAccentTolerance(userInput, acceptableAnswers)` returning `{ isCorrect, hasAccentWarning, canonicalMatch }`.
  - Added `pedagogicalTip` and `hasAccentWarning` to `SubmitAnswerResponse`.
- **Regression Suite:** `tests/e2e/language-quality.spec.ts` (Test: "Accent Tolerance: Accepting omitted diacritics with pedagogical guidance").

---

### DEF-002: Incomplete Curriculum Data in Database Seeder
- **Component:** `backend/src/seed/seedCourses.ts`
- **Symptom:** French Foundations had 0 units/lessons created. Spanish Unit 2 was missing its Checkpoint 2 assessment.
- **Pedagogical Impact:** Learners could not advance past Unit 1 in Spanish and could not study French at all.
- **Resolution:**
  - Expanded `seedCourses.ts` to include complete CEFR A1 units: Greetings, Food & Ordering, Directions, Navigation, and French Salutations & Café.
  - Added rich distractors, audio clips, and phonetic pronunciation guides.
- **Regression Suite:** `scripts/validateCurriculum.ts`, `tests/e2e/curriculum-audit.spec.ts`.

---

### DEF-003: Async Race Condition in Course Hierarchy Locking Progression
- **Component:** `backend/src/controllers/courseController.ts`
- **Symptom:** `getCoursePath` occasionally returned Lesson 1 as locked (`isLocked: true`) for brand new learners.
- **Root Cause:** `units.map(async ...)` ran concurrently within `Promise.all()`. Unit 2 mutated `allPreviousCompleted = false` before Unit 1 finished iterating its lessons.
- **Resolution:**
  - Refactored `structuredUnits` generation from concurrent `Promise.all` into a sequential `for (const unit of units)` loop.
- **Regression Suite:** `tests/e2e/curriculum-audit.spec.ts` (Test: "Spanish Course Hierarchy: Validates CEFR A1 unit & checkpoint structure").

---

### DEF-004: Course Completion Percentage Calculation Unscoped
- **Component:** `backend/src/controllers/lessonController.ts`
- **Symptom:** Completing all lessons in a course resulted in inaccurate completion percentages (e.g. 60% instead of 100%).
- **Root Cause:** `Lesson.find({ status: 'published' })` retrieved all published lessons across the entire platform.
- **Resolution:**
  - Scoped lesson count: `Lesson.countDocuments({ unitId: { $in: unitIds }, status: 'published' })`.
- **Regression Suite:** `tests/e2e/learner-journeys.spec.ts` (Journey 4: "Long-Term Progression Journey").

---

### DEF-005: Admin Key Middleware Precedence Bug
- **Component:** `backend/src/routes/adminRoutes.ts`, `backend/src/middleware/adminAuth.ts`
- **Symptom:** Admin CMS failed to fetch courses via proxy with `x-admin-key`, failing with 401 Unauthorized.
- **Root Cause:** `authenticate` was mounted before `requireAdmin` and rejected any request without a Bearer token.
- **Resolution:**
  - Consolidated admin authorization into `requireAdmin`, which checks `x-admin-key` first and falls back to verifying Bearer tokens for admin roles.
- **Regression Suite:** `tests/e2e/curriculum-audit.spec.ts` (Test: "Admin CMS UI: Verifies course curriculum and exercise builder views").

---

### DEF-006: Missing `username` in Leaderboard Response
- **Component:** `backend/src/controllers/leaderboardController.ts`
- **Symptom:** Client applications could not query or match weekly leaderboard entries by learner username.
- **Resolution:**
  - Added `username: entry.userId?.username` to each leaderboard entry.
- **Regression Suite:** `tests/e2e/gamification-friction.spec.ts` (Test: "Weekly Leaderboard: User XP accumulates and appears on weekly leaderboard").
