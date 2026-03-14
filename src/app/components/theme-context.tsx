import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ThemeMode = "noir" | "fete";

interface ThemeColors {
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  textFaded: string;
  accent: string;
  accentHover: string;
  accentBg: string;
  secondary: string;
  highlight: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  glassBg: string;
  glassBorder: string;
  shadow: string;
  navBg: string;
  gradient1: string;
  gradient2: string;
  gradient3: string;
  cursorColor: string;
  cursorGlow: string;
  cursorTrail: string;
  marqueeFg: string;
  marqueeStroke: string;
  grain: number;
  orbA: string;
  orbB: string;
  orbC: string;
  // Visual signature system
  signatureColor: string;
  signatureOpacity: number;
  signatureWeight: number;
  // Cursor mode personality
  cursorDotSize: number;
  cursorRingSize: number;
  cursorGlowSize: number;
  cursorDotLerp: number;
  cursorRingLerp: number;
  // Ring personality
  ringStrokeWidth: string;
  ringOpacity: number;
  ringTickOpacity: number;
}

const themes: Record<ThemeMode, ThemeColors> = {
  noir: {
    bg: "#07060e",
    bgAlt: "#0c0b16",
    text: "#ece8f4",
    textMuted: "#9690a8",
    textFaded: "#4d4860",
    accent: "#b8a0e8",
    accentHover: "#d0bef8",
    accentBg: "rgba(184,160,232,0.05)",
    secondary: "#6ee7c0",
    highlight: "#e8a0c4",
    cardBg: "rgba(184,160,232,0.025)",
    cardBorder: "rgba(184,160,232,0.08)",
    cardHoverBorder: "rgba(184,160,232,0.25)",
    glassBg: "rgba(7,6,14,0.72)",
    glassBorder: "rgba(184,160,232,0.1)",
    shadow: "0 12px 48px rgba(0,0,0,0.5)",
    navBg: "rgba(7,6,14,0.82)",
    gradient1: "radial-gradient(ellipse 80% 60% at 15% 45%, rgba(184,160,232,0.07) 0%, transparent 60%)",
    gradient2: "radial-gradient(ellipse 70% 50% at 85% 25%, rgba(110,231,192,0.04) 0%, transparent 55%)",
    gradient3: "radial-gradient(ellipse 60% 70% at 50% 85%, rgba(232,160,196,0.04) 0%, transparent 55%)",
    cursorColor: "rgba(184,160,232,0.9)",
    cursorGlow: "rgba(184,160,232,0.12)",
    cursorTrail: "rgba(184,160,232,0.06)",
    marqueeFg: "rgba(184,160,232,0.07)",
    marqueeStroke: "rgba(184,160,232,0.15)",
    grain: 0.03,
    orbA: "rgba(184,160,232,0.15)",
    orbB: "rgba(110,231,192,0.08)",
    orbC: "rgba(232,160,196,0.1)",
    // Signature: thin, precise, geometric
    signatureColor: "rgba(184,160,232,0.35)",
    signatureOpacity: 0.18,
    signatureWeight: 1,
    // Cursor: refined, small, precise
    cursorDotSize: 4,
    cursorRingSize: 24,
    cursorGlowSize: 60,
    cursorDotLerp: 0.45,
    cursorRingLerp: 0.1,
    // Rings: thin, architectural
    ringStrokeWidth: "1px",
    ringOpacity: 0.1,
    ringTickOpacity: 0.3,
  },
  fete: {
    bg: "#faf4ea",
    bgAlt: "#f5eedf",
    text: "#1a1632",
    textMuted: "#5a4e78",
    textFaded: "#b0a6c4",
    accent: "#e63946",
    accentHover: "#f05060",
    accentBg: "rgba(230,57,70,0.05)",
    secondary: "#06d6a0",
    highlight: "#ffd166",
    cardBg: "rgba(230,57,70,0.025)",
    cardBorder: "rgba(26,22,50,0.08)",
    cardHoverBorder: "rgba(230,57,70,0.3)",
    glassBg: "rgba(250,244,234,0.78)",
    glassBorder: "rgba(26,22,50,0.06)",
    shadow: "0 12px 48px rgba(26,22,50,0.06)",
    navBg: "rgba(250,244,234,0.85)",
    gradient1: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(230,57,70,0.06) 0%, transparent 60%)",
    gradient2: "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(6,214,160,0.05) 0%, transparent 55%)",
    gradient3: "radial-gradient(ellipse 60% 70% at 50% 85%, rgba(255,209,102,0.06) 0%, transparent 55%)",
    cursorColor: "rgba(230,57,70,0.85)",
    cursorGlow: "rgba(230,57,70,0.1)",
    cursorTrail: "rgba(230,57,70,0.08)",
    marqueeFg: "rgba(230,57,70,0.06)",
    marqueeStroke: "rgba(230,57,70,0.2)",
    grain: 0.018,
    orbA: "rgba(230,57,70,0.08)",
    orbB: "rgba(6,214,160,0.06)",
    orbC: "rgba(255,209,102,0.08)",
    // Signature: thick, expressive, gestural
    signatureColor: "rgba(230,57,70,0.4)",
    signatureOpacity: 0.25,
    signatureWeight: 2.5,
    // Cursor: expressive, larger, energetic
    cursorDotSize: 5,
    cursorRingSize: 30,
    cursorGlowSize: 90,
    cursorDotLerp: 0.35,
    cursorRingLerp: 0.08,
    // Rings: thicker, more visible, colorful
    ringStrokeWidth: "2px",
    ringOpacity: 0.16,
    ringTickOpacity: 0.5,
  },
};

interface ThemeCtx {
  mode: ThemeMode;
  colors: ThemeColors;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({
  mode: "fete",
  colors: themes.fete,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem("za-theme");
      if (stored === "noir" || stored === "fete") return stored;
    } catch {}
    return "fete";
  });

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === "noir" ? "fete" : "noir";
      try { localStorage.setItem("za-theme", next); } catch {}
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ mode, colors: themes[mode], toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);