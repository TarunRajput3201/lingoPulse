# App Store & Google Play Release Checklist

This guide provides the complete, step-by-step checklist to take **LingoPulse** from local code to approved, live apps on the **Apple App Store** and **Google Play Store**.

---

## 1. Prerequisites & Developer Accounts

### Google Play Console
1. **Google Play Developer Account:** One-time \$25 USD registration fee.
2. **Identity Verification:** Valid government ID and address verification completed.
3. **Google Play 20-Tester Rule (Crucial for personal accounts):**
   * Google requires new personal accounts to run a **Closed Test with at least 20 opted-in testers for 14 continuous days**.
   * Testers must download your closed test build from the Play Store opt-in link.
   * After 14 days, apply for production access in the Play Console.

### Apple Developer Program
1. **Apple Developer Account:** \$99 USD/year enrollment fee.
2. **Apple ID & Two-Factor Authentication:** Required.
3. **D-U-N-S Number:** Only required if enrolling as an Organization.

---

## 2. Cloud Builds via EAS (Expo Application Services)

The app is pre-configured with `eas.json` for cloud builds:

### Step 1: Install & Login to EAS CLI
```bash
npm install -g eas-cli
eas login
```

### Step 2: Configure EAS Project
Inside `D:\Projects\langLearn\mobile`:
```bash
eas project:init
```

### Step 3: Run Cloud Production Builds
* **Build Android App Bundle (.aab) for Google Play:**
  ```bash
  eas build --platform android --profile production
  ```
* **Build iOS Archive (.ipa) for App Store:**
  ```bash
  eas build --platform ios --profile production
  ```
* **Build Test APK for Internal Testers:**
  ```bash
  eas build --platform android --profile preview
  ```

---

## 3. Store Compliance Checklist

### Apple App Store Guidelines
- [x] **Account Deletion Flow (Guideline 5.1.1(v)):** Implemented in `mobile/app/(tabs)/profile.tsx` calling backend `DELETE /api/auth/account` which permanently purges all user data.
- [x] **Microphone Usage Disclosure:** Declared in `app.json`: `"NSMicrophoneUsageDescription": "LingoPulse needs microphone access to evaluate your spoken pronunciation during interactive language exercises."`
- [x] **App Review Demo Credentials:** Provide the pre-seeded account to Apple App Reviewers:
  - Email: `learner@lingopulse.com`
  - Password: `LearnerPassword123!`
- [x] **No WebViews for Core Experience:** Built natively using React Native components.

### Google Play Store Policies
- [x] **Target API Level:** Android 14+ (API Level 34) configured via Expo SDK 51.
- [x] **Privacy Policy URL:** Public URL pointing to `docs/PRIVACY_POLICY.md` hosted on GitHub Pages or custom domain.
- [x] **Data Safety Form:** Accurately declare account data, progression sync, and temporary audio processing.

---

## 4. Submitting Builds via EAS Submit

Once builds complete:
```bash
# Submit Android AAB to Google Play Console:
eas submit --platform android

# Submit iOS IPA to App Store Connect / TestFlight:
eas submit --platform ios
```
