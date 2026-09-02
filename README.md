# 2026 AI Placement & Technical Interview Exam Portal

> An interactive web platform calibrated to Indian engineering campus placements in 2026, built according to **FACE Prep's 2026 AI Career Roadmap**.

## 🚀 Live Demo & Deployment Options

This is a modern Vite + React single-page application. You can deploy it to any free cloud hosting platform in less than 2 minutes.

---

### Option 1: Deploy to Vercel (Recommended - 1 Click)

1. **Using Vercel CLI**:
   ```bash
   npx vercel
   ```
   Follow the CLI prompts (accept defaults). Your app will be live at a URL like `https://ai-placement-portal-yourname.vercel.app`.

2. **Using Vercel Web Dashboard**:
   - Push your code to GitHub.
   - Go to [vercel.com](https://vercel.com) $\rightarrow$ **Add New Project**.
   - Select your GitHub repo.
   - Click **Deploy** (Vercel automatically detects Vite and uses `dist` as output).

---

### Option 2: Deploy to Netlify

1. **Using Netlify CLI**:
   ```bash
   npx netlify deploy --prod
   ```
   Set publish directory to: `dist`

2. **Using Netlify Dashboard**:
   - Drag and drop the `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
   - Instant live public URL.

---

### Option 3: Deploy to Render (Static Site)

1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Static Site**.
3. Connect your repository.
4. Set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**.

---

### Option 4: Deploy to GitHub Pages

1. In your GitHub repository:
   - Go to **Settings** $\rightarrow$ **Pages**.
   - Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions**.
2. Push any commit to `main` branch. The pre-configured `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎯 Features

- **4-Layer Skill Stack Exams**: Layer 1 (Python/Git), Layer 2 (ML/Math), Layer 3 (LLM/RAG/Agents), Layer 4 (FastAPI/Docker/Evals).
- **14 Tracked Company Round Simulators**: TCS Prime, Infosys Power Programmer, HCLTech Elite (₹18-22 LPA), DE Shaw India, Mu Sigma, Wipro CoE, etc.
- **AI Mock Technical Interview Simulator**: Interactive panel for the 5 Universal 2026 Questions with real-time scoring rubrics.
- **Business Outcome Translator**: Converting AI technical jargon into business metrics for traditional IT-services panels.
- **Live In-Browser Coding Sandbox**: Interactive algorithm runner for RAG chunking, vector similarity, and API retry decorators.
- **Resume Line Generator**: Formulates recruiter-ready bullets with verified numbers and tooling.
- **Placement CTC Tier Predictor**: Real-time compensation predictor based on assessment scores.
