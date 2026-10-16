# Priyanraj J — High-Performance Engineering Portfolio & J.A.R.V.I.S. Mainframe

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> *"AI and embedded-systems engineer building secure, intelligent systems."*

Next-generation, high-performance portfolio engineered for **Priyanraj J** (B.Tech CCE @ Amrita Vishwa Vidyapeetham • BS Data Science @ IIT Madras • BS DS&AI @ IIT Guwahati). Built with React 19, TypeScript, Three.js, and Tailwind CSS v4 under the **Arc Reactor Gold & Deep Obsidian** design system.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Client["Browser Client (React 19 + TypeScript + Vite)"]
        UI["Main UI & Scroll-Spy Navigation"]
        ThreeCanvas["Lazy-Loaded Three.js Canvas\n(Adaptive DPR & Particle Throttling)"]
        Terminal["Shell Emulator\n(Theme Switcher, History, Ctrl+L)"]
        AIAssistant["J.A.R.V.I.S. Voice Assistant\n(Web Speech Recognition & Synthesis)"]
    end

    subgraph Edge["Vercel Serverless Edge API"]
        ChatProxy["POST /api/chat"]
        RateLimit["Per-IP In-Memory Rate Limiter\n(20 req/min)"]
        Validator["Input Sanitizer\n(Max 500 chars, History Capped)"]
    end

    subgraph AI["Google Gemini API"]
        GeminiFlash["Gemini 2.5 Flash\n(Grounded System Persona)"]
    end

    UI --> ThreeCanvas
    AIAssistant -->|Sanitized Prompt| ChatProxy
    ChatProxy --> RateLimit
    RateLimit --> Validator
    Validator -->|Server-Side GEMINI_API_KEY| GeminiFlash
    GeminiFlash -->|Streaming / Structured Reply| AIAssistant
```

---

## 🚀 Key Architectural Highlights

### 1. 🛡️ Zero Client-Side Secret Leakage (Security First)
- All Gemini LLM calls are routed exclusively through a serverless backend proxy (`/api/chat.ts`).
- The `GEMINI_API_KEY` exists purely server-side.
- In-memory per-IP rate limiting (20 req/min) prevents API abuse.
- Request validation caps user messages at 500 characters and keeps conversation context to the last 10 turns.

### 2. ⚡ Arc Reactor Gold Design System
- Unified token system defined in `src/index.css` with `@theme`:
  - Obsidian Core Background: `#07080d`
  - Deep Surface: `#10121a`
  - Arc Reactor Gold Accent: `#ffb703`
  - Forge Amber Secondary: `#ff6b35`
  - High-Contrast Text: `#f4f1ea` meeting WCAG AA (4.5:1+ contrast ratio).
- Custom typography pairing: **Space Grotesk** (Headings), **Inter** (Body), and **JetBrains Mono** (Code & Terminal).

### 3. 🌐 Three.js 3D Quantum Core with Adaptive Fallbacks
- Interactive 3D holographic core lazy-loaded via `React.lazy()` and `Suspense`.
- Dynamic particle budgeting based on device hardware concurrency and screen width.
- Automatic rendering freeze when canvas is scrolled off-screen or tab is hidden.
- Graceful CSS skeleton and static WebGL fallback for low-power or `prefers-reduced-motion` environments.
- Rollup `manualChunks` code-splitting keeps initial page bundle lightweight (~140 KB).

### 4. 🎙️ Dual Selectable Voice Personas (Licensed Stock Presets)
- **Persona A: "J.A.R.V.I.S. Classic"**: Calm, polite, dry-witted British butler AI with a measured pace, low pitch, and clear technical diction.
- **Persona B: "Sōsuke Mode"**: Composed, philosophical, quietly commanding AI with an unhurried, silky delivery and soft confident poise.
- **Server-Side TTS Endpoint (`/api/tts.ts`)**: Generates licensed audio with in-memory caching and per-IP abuse rate limits (30 req/min).
- **Audio Playback Engine**: `<audio>` element with queueing, visual speaking waveform, stop button, and non-blocking browser fallback.
- **Autoplay Compliance**: Audio is muted by default and never autoplays before user interaction.
- **Offline Grounded Fallback**: Instant responses with language-appropriate fallback speech synthesis if network is unavailable.

### 5. 💻 Interactive Shell Emulator (`priyanraj@mainframe`)
- Zsh-style shell featuring:
  - `theme`: Live toggles UI accent palette between **Gold**, **Violet**, and **Emerald**.
  - `resume`: Instantly opens verified PDF resume.
  - History traversal via `↑` and `↓` arrow keys.
  - Tab auto-completion across all commands.
  - `Ctrl+L` and clear button buffer flush.
  - Mobile tap-to-focus with 16px font-size to prevent unwanted mobile zoom.

### 6. 🎓 Multi-Institutional Academic foundation & 11 Licenses
- Clean 3-column timeline for concurrent tracks at **Amrita**, **IIT Madras**, and **IIT Guwahati**.
- Categorized technical competencies matrix with subtle proficiency tags (no arbitrary percentage bars).
- Verified credentials grid with live accreditation links (Google Cloud GenAI, Oracle SQL, NPTEL OS, IEEE CAS).
- Participation records across competitive national hackathons.

---

## 🎙️ Voice Architecture & Legal Disclaimers

### Legal & Ethical Adherence
- **Zero Likeness Cloning**: No voice cloning tools, no uploaded reference samples of copyrighted audio, and no training on actor audio.
- **Licensed Stock Presets**: All audio is synthesized strictly via commercial stock voice presets provided by Google Cloud Text-to-Speech / Gemini and ElevenLabs.
- **Stylistic Homages**: The personas (**"J.A.R.V.I.S. Classic"** and **"Sōsuke Mode"**) are original creative homages crafted through prompt engineering, cadence tuning, and speech rate/pitch modulation. They do not claim affiliation with or representation of any commercial film, studio, or anime intellectual property.

### Supported TTS Providers & Voice Presets
1. **Google Cloud Text-to-Speech / Gemini 2.0 Audio (Default)**:
   - **J.A.R.V.I.S. Classic**: Preset `en-GB-Neural2-B` (or Gemini `Puck`) — speaking rate `1.0`, pitch `-1.0` (calm British diction).
   - **Sōsuke Mode**: Preset `en-GB-Neural2-D` (or Gemini `Charon`) — speaking rate `0.88`, pitch `-3.5` (low, deliberate baritone).
2. **ElevenLabs (Optional High-Fidelity Neural TTS)**:
   - Enabled automatically when `ELEVENLABS_API_KEY` is present.
   - **J.A.R.V.I.S. Classic**: Stock commercial voice `JBFqnCBsd6RMkjVDRZzb` ("George") or configured via `VOICE_ID_JARVIS`.
   - **Sōsuke Mode**: Stock commercial voice `nPczCjzI2devNBz1zQrb` ("Brian") or configured via `VOICE_ID_SOSUKE`.

---

## 📁 Repository Structure

```
├── api/
│   ├── chat.ts                 # Serverless Gemini proxy with rate-limiting
│   └── tts.ts                  # Serverless Text-to-Speech proxy (Google/ElevenLabs)
├── public/
│   ├── favicon.svg             # Arc Reactor Gold vector icon
│   ├── jarvis-core.png         # Fallback core visual
│   ├── og-image.png            # Open Graph social preview
│   ├── profile.webp            # Optimized developer avatar
│   ├── resume.pdf              # Verified CV asset
│   ├── robots.txt              # Search engine crawling rules
│   └── sitemap.xml             # Sitemap specification
├── src/
│   ├── components/
│   │   ├── AiVoiceAssistant.tsx        # Floating AI assistant with dual personas
│   │   ├── BrandIcons.tsx              # Clean SVG icons
│   │   ├── CertificatesSection.tsx     # 11 licenses & hackathons
│   │   ├── CompetitiveProfiles.tsx     # LeetCode, Codeforces, AtCoder
│   │   ├── ContactSection.tsx          # Contact form & uplinks
│   │   ├── EducationSection.tsx        # Triple-track academic cards
│   │   ├── ExperienceSection.tsx       # IEEE Webmaster & internships
│   │   ├── Hero3DCanvas.tsx            # Optimized Three.js scene
│   │   ├── HeroSection.tsx             # Hero with typed headline
│   │   ├── InteractiveBannerCard.tsx   # Verified credentials banner
│   │   ├── InteractiveTerminal.tsx     # Shell emulator with theme switcher
│   │   ├── MonthlyProgressTracker.tsx  # Live GitHub telemetry audit
│   │   ├── Navbar.tsx                  # Sticky scroll-spy navigation
│   │   ├── ProjectsSection.tsx         # Filterable projects & modal
│   │   ├── RoadmapAndSpecs.tsx         # Engineering trajectory & workstation
│   │   └── SkillsSection.tsx           # Categorized competencies matrix
│   ├── data/
│   │   ├── certificates.ts             # Authenticated credentials data
│   │   ├── jarvisDataset.ts            # Grounded knowledge base
│   │   ├── portfolioData.ts            # Unified developer profile
│   │   ├── projects.ts                 # 9 verified engineering projects
│   │   ├── skills.ts                   # Categorized technical skills
│   │   └── voices.ts                   # Licensed stock voice configurations & presets
│   ├── theme.ts                        # Shared palette constants
│   ├── index.css                       # Tailwind CSS v4 theme tokens
│   ├── App.tsx                         # Root component
│   └── main.tsx                        # Entry point
├── .github/
│   └── workflows/
│       ├── ci.yml                      # Automated lint, typecheck & build

│       └── deploy.yml                  # GitHub Pages deployment pipeline
├── vercel.json                         # Vercel SPA routing & serverless config
├── vite.config.ts                      # Manual chunk splitting & build setup
└── package.json
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/priyanrajj-hub/PORTFOLIO.git
cd PORTFOLIO
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: In development, `api/chat.ts` can be tested via Vercel CLI (`vercel dev`), while client-side fallback continues to serve grounded knowledge if the API key is unset.

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 4. Build & Verify
```bash
npm run lint      # Run oxlint check
npx tsc -b        # Validate TypeScript types
npm run build     # Compile optimized production bundle
```

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)
1. Fork or push your code to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables under **Project Settings > Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | **Required** | Google Gemini API Key (used for `/api/chat` and server-side TTS synthesis) |
| `ELEVENLABS_API_KEY` | Optional | ElevenLabs API Key for neural stock voice synthesis |
| `VOICE_ID_JARVIS` | Optional | Custom ElevenLabs voice ID for J.A.R.V.I.S. Classic (default: `JBFqnCBsd6RMkjVDRZzb` / "George") |
| `VOICE_ID_SOSUKE` | Optional | Custom ElevenLabs voice ID for Sōsuke Mode (default: `nPczCjzI2devNBz1zQrb` / "Brian") |

4. Vercel automatically deploys the frontend and both `/api/chat` and `/api/tts` serverless functions.

---

## 📬 Contact & Coordinates

- **Email**: [priyanrajj@gmail.com](mailto:priyanrajj@gmail.com)
- **LinkedIn**: [linkedin.com/in/priyanraj](https://www.linkedin.com/in/priyanraj)
- **GitHub**: [github.com/priyanrajj-hub](https://github.com/priyanrajj-hub)
- **LeetCode**: [leetcode.com/PRIYANRAJ](https://leetcode.com/PRIYANRAJ)
- **Message Direct**: [WhatsApp Uplink](https://wa.me/917810012708)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

&copy; 2026 **Priyanraj J**. All rights reserved.
