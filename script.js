/* ==========================================================================
   01. ARCHITECTURE DESIGN SYSTEM CONSTANTS & VARIABLES
   ========================================================================== */
:root {
    /* Color Palette Matrix */
    --bg-main: #06090e;
    --bg-card: rgba(13, 17, 23, 0.72);
    --bg-terminal: #010409;
    --border-color: #21262d;
    --border-glow-color: rgba(48, 54, 61, 0.6);
    --text-primary: #e6edf3;
    --text-muted: #7d8590;
    
    /* Neon Cyber Tokens */
    --accent-blue: #58a6ff;
    --accent-blue-rgb: 88, 166, 255;
    --accent-green: #3fb950;
    --accent-green-rgb: 63, 185, 80;
    --accent-purple: #bc8cff;
    --accent-red: #f85149;
    
    /* Typography Rules */
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --font-code: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    
    /* Performance Layering Matrix */
    --will-animate: transform, opacity;
    --cb-elastic: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ==========================================================================
   02. BASE INITIALIZATION & OPTIMIZATIONS
   ========================================================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
}

html, body {
    width: 100%;
    min-height: 100vh;
    background-color: var(--bg-main);
    scroll-behavior: smooth;
}

body {
    color: var(--text-primary);
    font-family: var(--font-sans);
    line-height: 1.6;
    padding-top: 85px;
    position: relative;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Hardware Accelerated Global Render Elements */
.background-engine-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -3;
    pointer-events: none;
    contain: strict;
}

.pointer-glow-field {
    position: fixed;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(var(--accent-blue-rgb), 0.07) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: -2;
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: transform;
    contain: strict;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* ==========================================================================
   03. FIXED GLOBAL HEADER & NAV NAVIGATION GRID
   ========================================================================== */
.global-navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background-color: rgba(6, 9, 14, 0.75);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    contain: layout;
}

.navigation-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.logo-link-node {
    font-family: var(--font-code);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--text-primary);
    text-decoration: none;
    letter-spacing: -0.3px;
}

.logo-link-node span {
    color: var(--accent-blue);
    text-shadow: 0 0 12px rgba(var(--accent-blue-rgb), 0.4);
}

.navigation-links-list {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 28px;
}

.nav-anchor-link {
    color: var(--text-muted);
    text-decoration: none;
    font-family: var(--font-code);
    font-size: 0.88rem;
    position: relative;
    padding: 6px 0;
    transition: color 0.25s var(--cb-elastic);
}

.nav-index-marker {
    color: var(--accent-blue);
    opacity: 0.6;
    margin-right: 4px;
    font-size: 0.75rem;
}

.nav-anchor-link:hover,
.nav-anchor-link.active-node {
    color: var(--text-primary);
}

.nav-anchor-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-blue), transparent);
    transition: width 0.3s var(--cb-elastic);
}

.nav-anchor-link:hover::after,
.nav-anchor-link.active-node::after {
    width: 100%;
}

/* ==========================================================================
   04. CORE USER ENVIRONMENT PANEL (SECTION 01)
   ========================================================================== */
.primary-application-wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-bottom: 80px;
}

.hero-split-grid-card {
    display: grid;
    grid-template-columns: 330px 1fr;
    gap: 40px;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    position: relative;
}

.hero-split-grid-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent 15%, var(--accent-blue) 50%, transparent 85%);
}

/* Identity Column Left */
.identity-profile-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-right: 1px solid var(--border-color);
    padding-right: 40px;
}

.interactive-avatar-frame {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 24px;
}

.avatar-aspect-ratio-box {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--border-color);
    background-color: var(--bg-terminal);
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
    transition: border-color 0.4s var(--cb-elastic);
}

.avatar-image-asset {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--cb-elastic);
}

.interactive-avatar-frame:hover .avatar-aspect-ratio-box {
    border-color: var(--accent-blue);
}

.interactive-avatar-frame:hover .avatar-image-asset {
    transform: scale(1.04) rotate(1.5deg);
}

.dynamic-status-ping {
    position: absolute;
    bottom: 12px;
    right: 14px;
    width: 18px;
    height: 18px;
    background-color: var(--accent-green);
    border: 3.5px solid #0d1117;
    border-radius: 50%;
    box-shadow: 0 0 14px var(--accent-green);
    animation: pulseBreathe 2s infinite ease-in-out;
}

/* HIGH-IMPACT HARDWARE ACCELERATED TEXT GLITCH MATRIX EFFECT */
.matrix-glitch-heading {
    font-family: var(--font-code);
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text-primary);
    position: relative;
    cursor: default;
    user-select: none;
}

.matrix-glitch-heading::before,
.matrix-glitch-heading::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0d1117;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}

.matrix-glitch-heading:hover::before {
    left: 2px;
    text-shadow: -2px 0 var(--accent-red);
    clip: rect(15px, 600px, 45px, 0);
    animation: skewGlitchLine1 0.8s infinite linear alternate-reverse;
}

.matrix-glitch-heading:hover::after {
    left: -2px;
    text-shadow: -2px 0 #00ffff;
    clip: rect(50px, 600px, 95px, 0);
    animation: skewGlitchLine2 0.8s infinite linear alternate-reverse;
}

.system-uid-label {
    font-family: var(--font-code);
    color: var(--text-muted);
    font-size: 0.82rem;
    margin: 4px 0 16px 0;
}

.highlight-token {
    color: var(--accent-blue);
}

.institutional-tagline-text {
    font-size: 0.88rem;
    color: var(--text-primary);
    opacity: 0.9;
    margin-bottom: 28px;
}

/* Action Interaction Stack Elements */
.interactive-action-button-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.action-btn-node {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px 18px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: var(--font-code);
    text-decoration: none;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: transform 0.2s var(--cb-elastic), box-shadow 0.2s var(--cb-elastic), filter 0.2s;
}

.action-btn-node:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
}

.btn-linkedin { background-color: #1f6feb; box-shadow: 0 4px 14px rgba(31, 111, 235, 0.2); }
.btn-gmail { background-color: #f85149; box-shadow: 0 4px 14px rgba(248, 81, 73, 0.2); }
.btn-leetcode { background-color: #ab47bc; box-shadow: 0 4px 14px rgba(171, 71, 188, 0.2); }

/* Mainframe Console Center Panel Right */
.terminal-shell-console-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.terminal-banner-ascii-frame {
    background-color: var(--bg-terminal);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    overflow-x: auto;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.9);
}

.ascii-typography-canvas {
    font-family: var(--font-code);
    color: var(--accent-blue);
    font-size: 0.65rem;
    line-height: 1.25;
    font-weight: bold;
}

.typewriter-runtime-field {
    font-family: var(--font-code);
    font-size: 0.88rem;
    margin-top: 14px;
    color: #a5d6ff;
    font-weight: bold;
    min-height: 1.3rem;
}

/* Mainframe Shell Component */
.mainframe-terminal-window-component {
    background-color: var(--bg-terminal);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.window-decorations-bar {
    background-color: #161b22;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border-color);
}

.control-dot-node { width: 11px; height: 11px; border-radius: 50%; }
.dot-red { background-color: var(--accent-red); }
.dot-yellow { background-color: #f0883e; }
.dot-green { background-color: var(--accent-green); }

.window-title-string-node {
    font-family: var(--font-code);
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-left: 6px;
}

.window-content-body-field {
    padding: 22px;
    font-family: var(--font-code);
    font-size: 0.88rem;
}

.terminal-prompt-string { color: #56d364; }

.structured-mainframe-data-grid {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-top: 14px;
    padding-left: 12px;
}

.data-row-node {
    display: grid;
    grid-template-columns: 200px 1fr;
    line-height: 1.5;
}

.data-key-label { color: var(--accent-blue); }
.data-key-label i { width: 20px; text-align: center; margin-right: 6px; opacity: 0.8; }
.data-value-string { color: var(--text-primary); }

.motivational-quote-block {
    border-left: 3px solid var(--accent-blue);
    padding-left: 18px;
    font-style: italic;
    color: var(--text-muted);
    margin-top: 24px;
    font-size: 0.92rem;
}

/* ==========================================================================
   05. EXHIBITION VIEWPORT LAYOUT (SECTION 02)
   ========================================================================== */
.brand-exhibition-viewport-card {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    position: relative;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
    line-height: 0;
}

.brand-exhibition-image-asset {
    width: 100%;
    height: auto;
    object-fit: cover;
    transform: translateZ(0);
    transition: transform 0.8s var(--cb-elastic);
}

.brand-exhibition-viewport-card:hover .brand-exhibition-image-asset {
    transform: scale(1.015);
}

.neon-lens-flare-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 50px rgba(88, 166, 255, 0.18);
    pointer-events: none;
}

/* ==========================================================================
   06. PRODUCTION FLUID GRID PRODUCTION PROJECTS (SECTION 03)
   ========================================================================== */
.mainframe-section-title {
    font-size: 1.45rem;
    font-family: var(--font-code);
    margin-bottom: 28px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.production-projects-fluid-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 28px;
}

.interactive-project-card-component {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    display: flex;
    transition: border-color 0.4s var(--cb-elastic), box-shadow 0.4s var(--cb-elastic), transform 0.4s var(--cb-elastic);
}

.project-card-inner-structural-box {
    padding: 28px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
}

.interactive-project-card-component:hover {
    transform: translateY(-6px);
    border-color: var(--accent-blue);
    box-shadow: 0 15px 35px rgba(var(--accent-blue-rgb), 0.08);
}

.project-node-index-tag {
    font-family: var(--font-code);
    font-size: 0.72rem;
    color: var(--accent-blue);
    opacity: 0.7;
    display: block;
    margin-bottom: 6px;
}

.project-node-title {
    font-family: var(--font-code);
    font-size: 1.15rem;
    line-height: 1.4;
    color: var(--text-primary);
    margin-bottom: 14px;
}

.project-node-description-paragraph {
    font-size: 0.88rem;
    color: var(--text-muted);
    margin-bottom: 24px;
    line-height: 1.6;
}

.project-card-tags-and-links-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: auto;
}

.tag-tokens-collection-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag-token {
    background-color: var(--bg-terminal);
    border: 1px solid var(--border-color);
    padding: 5px 12px;
    border-radius: 14px;
    font-family: var(--font-code);
    font-size: 0.75rem;
    color: var(--text-primary);
}

.tag-token.tag-c { border-color: #388bfd; color: var(--accent-blue); }
.tag-token.tag-cpp { border-color: #bc8cff; color: var(--accent-purple); }
.tag-token.tag-py { border-color: #f2cc60; color: #ffdf5d; }

.repository-anchor-node {
    font-family: var(--font-code);
    font-size: 0.82rem;
    color: var(--accent-blue);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: text-shadow 0.2s;
}

.repository-anchor-node:hover {
    text-shadow: 0 0 8px rgba(var(--accent-blue-rgb), 0.5);
}

/* ==========================================================================
   07. DOUBLE SPLIT LAYOUT TIMELINES & DATA SCHEMAS (SECTION 04)
   ========================================================================== */
.split-layout-double-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.table-outer-overflow-wrapper {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.mainframe-production-data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
    text-align: left;
}

.mainframe-production-data-table th {
    background-color: var(--bg-terminal);
    padding: 16px 20px;
    font-family: var(--font-code);
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    font-weight: 600;
}

.mainframe-production-data-table td {
    padding: 15px 20px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    transition: background-color 0.2s, color 0.2s;
}

.mainframe-production-data-table tr:hover td {
    background-color: rgba(var(--accent-blue-rgb), 0.03);
    color: var(--text-primary);
}

.mainframe-production-data-table tr:last-child td {
    border-bottom: none;
}

/* Continuous Roadmap Progress Tracks Elements */
.roadmap-production-container-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.roadmap-chronological-list {
    list-style: none;
}

.roadmap-event-item-node {
    display: grid;
    grid-template-columns: 85px 120px 1fr;
    align-items: center;
    margin-bottom: 22px;
}

.roadmap-event-item-node:last-child {
    margin-bottom: 0;
}

.timeline-quarter-tag {
    color: var(--accent-blue);
    font-weight: bold;
    font-family: var(--font-code);
    font-size: 0.85rem;
}

.progress-track-rail {
    background-color: var(--bg-terminal);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    height: 7px;
    width: 100px;
    overflow: hidden;
}

.progress-fill-bar {
    background: linear-gradient(90deg, var(--accent-blue), var(--accent-green));
    height: 100%;
    border-radius: 12px;
    transform: scaleX(0);
    transform-origin: left;
    will-change: transform;
    transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Activation Trigger bindings mapping classes */
.reveal-node.active-reveal .progress-fill-bar {
    transform: scaleX(1);
}

.timeline-task-string {
    font-size: 0.88rem;
    color: var(--text-primary);
    padding-left: 12px;
    line-height: 1.4;
}

/* ==========================================================================
   08. MAINFRAME SPECIFICATION BLOCK ENVIRONMENT (SECTION 05)
   ========================================================================== */
.workspace-specifications-fluid-grid {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 28px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.spec-node-item-box {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 0.9rem;
    font-family: var(--font-code);
}

.spec-node-item-box i {
    font-size: 1.1rem;
}

.pulse-slow-effect {
    animation: simplePulseBreathe 2.5s infinite alternate ease-in-out;
}

.mainframe-footer-motto-string {
    text-align: center;
    margin-top: 35px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: var(--font-code);
    color: var(--text-muted);
}

/* ==========================================================================
   09. GLOBAL FOOTER CORE DATA STRUCTURE
   ========================================================================== */
.mainframe-global-footer-block {
    text-align: center;
    padding: 45px 24px;
    border-top: 1px solid var(--border-color);
    color: var(--text-muted);
    font-size: 0.8rem;
    font-family: var(--font-code);
    margin-top: 80px;
    background-color: #06090e;
    contain: layout;
}

/* ==========================================================================
   10. RENDERING ENGINE HARDWARE ACCELERATION DRIVERS
   ========================================================================== */
.reveal-node {
    opacity: 0;
    transform: translateY(35px) translateZ(0);
    will-change: var(--will-animate);
    transition: opacity 0.85s var(--cb-elastic), transform 0.85s var(--cb-elastic);
}

.reveal-node.active-reveal {
    opacity: 1;
    transform: translateY(0) translateZ(0);
}

@keyframes pulseBreathe {
    0%, 100% { transform: scale(1); opacity: 0.9; box-shadow: 0 0 0 0 rgba(var(--accent-green-rgb), 0.4); }
    50% { transform: scale(1.06); opacity: 1; box-shadow: 0 0 12px 4px rgba(var(--accent-green-rgb), 0.5); }
}

@keyframes simplePulseBreathe {
    0% { opacity: 0.65; transform: scale(0.97); }
    100% { opacity: 1; transform: scale(1.03); }
}

@keyframes skewGlitchLine1 {
    0% { clip: rect(12px, 9999px, 40px, 0); }
    100% { clip: rect(75px, 9999px, 115px, 0); }
}

@keyframes skewGlitchLine2 {
    0% { clip: rect(55px, 9999px, 105px, 0); }
    100% { clip: rect(8px, 9999px, 70px, 0); }
}

/* ==========================================================================
   11. ADAPTIVE MEDIA GRID BREAKPOINTS RESPONSIVE RULES
   ========================================================================== */
@media (max-width: 950px) {
    .hero-split-grid-card {
        grid-template-columns: 1fr;
        padding: 30px;
    }
    .identity-profile-sidebar {
        border-right: none;
        border-bottom: 1px solid var(--border-color);
        padding-right: 0;
        padding-bottom: 35px;
        margin-bottom: 25px;
    }
    .split-layout-double-column-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}

@media (max-width: 680px) {
    body { padding-top: 75px; }
    .global-navbar-container { height: 55px; }
    .navigation-links-list { display: none; } /* Mobile UX Optimization */
    .roadmap-event-item-node {
        grid-template-columns: 85px 1fr;
        gap: 8px;
    }
    .progress-track-rail { display: none; }
}
