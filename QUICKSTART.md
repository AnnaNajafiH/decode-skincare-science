# ⚡ Quick Start Guide - 2 Minutes to Running Demo

## Prerequisites

- Node.js 18+ installed
- Terminal/Command Prompt access

## Installation & Run

```bash
# 1. Navigate to project folder
cd d:/2024_WBS_Coding_School/myProjects/herHackathon

# 2. Install dependencies (one-time, ~30 seconds)
npm install

# 3. Start development server
npm run dev
```

**App opens automatically at**: http://localhost:3000/

---

## 🎬 5-Minute Demo Script

### Section 1: Trend Detection (45 seconds)

1. Default view shows **4 active trends**
2. Click **"Glass Skin Hydration"** card (Score: 94, HOT 🔥)
3. Modal opens showing:
   - Keywords: glass skin, hyaluronic acid, hydration
   - Related social post from @skincarebyjess (12.4K likes)
4. Close modal

### Section 2: Content Generator (90 seconds)

1. Click **"Content Generator"** in top navigation
2. Select trend: **"Glass Skin Hydration"**
3. Content type: **"Instagram Carousel"** (already selected)
4. Click **"Generate Content"** button
5. Wait 2 seconds (simulated AI processing)
6. View generated output:
   - **5 slides** with scientific facts
   - Slide 1: "Glass skin = science, not magic ✨"
   - Slide 2: "Hyaluronic acid holds 1000x its weight in water 💧"
   - **Caption** with hashtags
   - **Visual suggestions** for designers
   - **92% confidence score**
   - R&D reference: rd1

### Section 3: Review Queue (60 seconds)

1. Click **"Review Queue"** in top navigation
2. See **3 pending content pieces**
3. Click **"Review"** on first item (Glass Skin carousel)
4. Trust & Accuracy Score panel appears:
   - Overall: 92%
   - Factual Accuracy: 95%
   - Claim Strength: Verified
5. Scroll through slides
6. Add reviewer note: "Great scientific accuracy!"
7. Click **"Approve & Publish"** button

### Section 4: Internal Briefs (60 seconds)

1. Click **"Internal Briefs"** in top navigation
2. Note banner: **"No approval required"** ✨
3. Select R&D Document: **"Clinical Efficacy of Hyaluronic Acid..."**
4. See document preview with:
   - Summary of 12-week study
   - Key ingredients: Hyaluronic Acid, Sodium Hyaluronate
   - Study type: Clinical Trial
5. Click **"Generate Internal Brief"**
6. Wait 2.5 seconds (simulated generation)
7. View complete campaign brief:
   - **Headline**: "From Lab to Glow: The Science Behind Glass Skin"
   - **3 Proof Points** with citations
   - **Creative Hooks** (3 options)
   - **Sample Social Captions** (3 options)
   - **Training Snippets** (2 bullets)
8. Click **"Download DOCX"** button

### Section 5: Analytics (30 seconds)

1. Click **"Analytics"** in top navigation
2. View key metrics:
   - **47 trends detected** (last 30 days)
   - **124 content pieces generated**
   - **79% approval rate**
   - **87% average confidence**
   - **4.2 min avg review time**
3. Scroll to see:
   - **Top 5 trending topics** with growth %
   - **Content type performance** (Carousels, Reels, Scripts)
   - **System health** indicators

---

## 🎯 Key Points to Highlight

### For External Content (Gen Z Social Media)

- ✅ Trend detection is reactive, not planned
- ✅ Content includes science citations (R&D docs)
- ✅ Gen Z tone: emoji, short sentences, scroll-stopping
- ✅ Human-in-the-loop ensures trust and accuracy
- ✅ Visual suggestions help designers
- ✅ Confidence scoring flags low-quality outputs

### For Internal Content (Marketing Teams)

- ✅ No approval bottleneck = instant speed
- ✅ Campaign briefs with proof points and citations
- ✅ Training materials for sales/education teams
- ✅ Creative hooks for campaign ideation
- ✅ Export to DOCX/Markdown for sharing

### System Intelligence

- ✅ Confidence scoring (75-95%)
- ✅ Trust metrics (factual accuracy, claim strength)
- ✅ Flag system for questionable claims
- ✅ R&D document linking for credibility
- ✅ Analytics to monitor performance

---

## 🏗️ Architecture Highlights (Technical)

### Frontend Stack

- **React 18** + **TypeScript** for type safety
- **TailwindCSS** for modern, responsive design
- **Vite** for fast development and builds
- **Mock Service Layer** with simulated delays (realistic UX)

### Data Model

- **4 Trends** with velocity tracking (hot/rising/stable)
- **4 R&D Documents** with clinical study details
- **3 Generated Contents** showing workflow states
- **1 Internal Brief** demonstrating output quality

### Ready for Backend

- Service layer (`contentService.ts`) is abstracted
- Replace mock functions with API calls
- Add authentication, database, LLM integration
- Deploy with Docker/Kubernetes

---

## 📊 Challenge Compliance

| Requirement       | Implementation                     |
| ----------------- | ---------------------------------- |
| Trend detection   | ✅ 4 realistic trends with scoring |
| Instagram content | ✅ Carousels, Reels, video scripts |
| Science-backed    | ✅ R&D citations on every piece    |
| Human approval    | ✅ Review queue workflow           |
| Fact checking     | ✅ Trust scores and flags          |
| Internal briefs   | ✅ Instant generation, no approval |
| Multiple formats  | ✅ 3 external + 1 internal type    |
| Gen Z tone        | ✅ Emoji, short text, hashtags     |

---

## 🚨 Troubleshooting

### Port 3000 already in use?

```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Then restart
npm run dev
```

### Dependencies won't install?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Page doesn't load?

- Check browser console for errors
- Ensure Node.js 18+ is installed: `node --version`
- Try different browser (Chrome, Firefox, Edge)

---

## 📞 Demo Support

If you encounter issues:

1. Check `README.md` for detailed documentation
2. Verify all files exist in `src/` folder
3. Ensure `npm install` completed without errors
4. Check terminal for Vite server startup message

---

## 🎉 You're Ready!

**Open**: http://localhost:3000/

Follow the 5-minute demo script above for a complete walkthrough.

**Enjoy the demo!** 🚀
