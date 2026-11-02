# JobMatch Pro — ATS Resume Matcher (Chrome Extension MV3)

> A modern, monetization-ready Manifest V3 Chrome Extension that scrapes job postings on LinkedIn, Indeed, and Greenhouse, computes an instant ATS Match Score (0–100%), extracts missing keywords, and suggests 3 tailored resume bullets. Includes a 3-free-scan trial and a lifetime license key paywall.

---

## 🚀 How to Install & Test in Google Chrome

1. Open Google Chrome and navigate to:
   ```
   chrome://extensions
   ```
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click the **Load unpacked** button in the top-left.
4. Select this project folder:
   ```
   C:\Users\anish\Downloads\My Projects\Chrome_Extention
   ```
5. Pin **JobMatch Pro** to your Chrome toolbar.

---

## 🧪 Testing the Extension (Zero Friction)

### 1. Set Up Your Resume Profile
1. Click the JobMatch Pro icon in your toolbar.
2. Switch to the **My Resume** tab.
3. Click **"Load Sample"** (loads a pre-configured Senior Full Stack Engineer resume) or paste your own resume text.
4. Click **"Save Resume"**.

### 2. Test Scanning a Job Posting
- **Option A (Live Job Board):** Open any job posting on [LinkedIn Jobs](https://www.linkedin.com/jobs), [Indeed](https://www.indeed.com), or [Greenhouse](https://boards.greenhouse.io). Click the extension icon and click **"Scan & Match Resume"**.
- **Option B (Manual / Highlight):** On any page, highlight text or click *"Or paste job text manually"* in the extension popup and click **"Scan & Match Resume"**.

### 3. Review ATS Results & Find Similar Jobs
- **Radial Score Meter:** Color-coded (Green for 70%+, Amber for 45–69%, Red for <45%).
- **Missing Keywords:** Red pills with 1-click auto-insert into your resume or 1-click copy.
- **Matched Keywords:** Green pills confirming your qualifying experience.
- **Tailored Bullet Points:** High-impact bullets generated using the Google X-Y-Z formula (`Accomplished [X] as measured by [Y] by doing [Z]`).
- **AI Prompt Exporter:** 1-click button to export optimized prompts for ChatGPT or Claude.
- **Find Similar Jobs:** 1-click search for nearby and remote matching openings on LinkedIn Jobs, Indeed, Google Jobs, and Wellfound (1 free search on free tier; unlimited for Pro).

---

## 💳 Testing the License Key & Monetization Flow

### The Free Tier
- **Resume Scans:** Users get **3 free scans** tracked in `chrome.storage.local`.
- **Job Searches:** Users get **1 free portal search** for matching jobs.
- The extension icon badge displays remaining free scans (`3`, `2`, `1`, `0`).
- Once quota is used, attempting further scans or searches prompts the user to upgrade to Pro.

### Master Developer Lifetime Key
Use your exclusive master key anytime to unlock unlimited lifetime access:
```
ANISH-PRO-LIFETIME-VIP
```
*(Or `ANISH-2026-UNLIMITED`)*

1. Enter `ANISH-PRO-LIFETIME-VIP` into the **Upgrade / Pro** tab $\rightarrow$ click **"Activate"**.
2. Once Pro is active, the upgrade tab hides and a **Change License Key** section appears in **Settings**.
3. To switch back to the free tier for testing, navigate to **Settings** $\rightarrow$ click **"Remove License"**. This resets the quota without deleting your saved resume profile.

---

## 🔌 Connecting Real Payment Gateways (Lemon Squeezy / Dodo Payments)

In `license-validator.js`, switch from mock mode to your live gateway endpoint:

```javascript
// license-validator.js
const LicenseManager = {
  config: {
    provider: 'lemon_squeezy', // or 'dodo_payments' / 'custom'
    apiEndpoint: 'https://api.lemonsqueezy.com/v1/licenses/validate',
    productId: 'YOUR_PRODUCT_ID'
  },
  // ...
};
```

---

## 📦 Publishing to the Chrome Web Store

1. In `manifest.json`, verify extension name, description, and version.
2. In `popup.html`, update the checkout link:
   ```html
   <a id="buy-license-btn" href="https://yourstore.lemonsqueezy.com/checkout/..." target="_blank" class="btn btn-primary">
   ```
3. Create a `.zip` archive containing the root files (exclude `.git`):
   ```
   manifest.json
   popup.html
   popup.js
   styles.css
   content.js
   background.js
   skills-db.js
   license-validator.js
   icons/
   ```
4. Upload to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
