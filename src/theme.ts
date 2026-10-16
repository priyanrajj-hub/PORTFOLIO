// Arc Reactor Gold Design Tokens
// Shared between CSS, React components, and Three.js 3D WebGL scenes.

export const THEME = {
  bg: '#07080d',
  surface: '#10121a',
  surface2: '#171a25',
  line: 'rgba(255, 255, 255, 0.08)',
  accent: '#ffb703',      // Arc Reactor Gold
  accent2: '#ff6b35',     // Stark Copper / Plasma
  ink: '#f4f1ea',         // High contrast text
  inkDim: '#9a9aa8',      // Secondary telemetry text
  success: '#34d399',     // Verification emerald
} as const;

export type ThemeColors = typeof THEME;
