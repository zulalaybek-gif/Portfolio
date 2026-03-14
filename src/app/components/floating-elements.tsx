import { memo } from "react";
import { useTheme } from "./theme-context";

export function FloatingOrbs() {
  return null;
}

export function SectionOrb({ color, position, size }: { color: string; position: string; size: number }) {
  return null;
}

/**
 * Lightweight dot grid — pure CSS, no mouse tracking, no springs, no rAF.
 */
export const FloatingGrid = memo(function FloatingGrid() {
  const { mode } = useTheme();

  const dotColor = mode === "noir"
    ? "rgba(184,160,232,0.06)"
    : "rgba(230,57,70,0.05)";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
});
