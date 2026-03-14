import { useEffect, useRef, useState, memo } from "react";
import { useTheme } from "./theme-context";

/**
 * A luminous accent dot that slowly wanders across the page.
 * Throttled to ~30fps for performance.
 */
export const WanderingDot = memo(function WanderingDot() {
  const { colors, mode } = useTheme();
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [visible, setVisible] = useState(false);
  const initialized = useRef(false);

  const pickTarget = () => {
    const vw = window.innerWidth;
    const scrollY = window.scrollY;
    target.current = {
      x: Math.random() * vw * 0.8 + vw * 0.1,
      y: scrollY + Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.1,
    };
    timer.current = setTimeout(pickTarget, 4000 + Math.random() * 4000);
  };

  useEffect(() => {
    if (!initialized.current) {
      pos.current = { x: window.innerWidth * 0.3, y: window.innerHeight * 0.5 };
      target.current = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 };
      initialized.current = true;
    }

    const delay = setTimeout(() => setVisible(true), 3000);
    pickTarget();

    let lastFrame = 0;
    const THROTTLE = 33; // ~30fps

    const animate = (now: number) => {
      raf.current = requestAnimationFrame(animate);
      if (now - lastFrame < THROTTLE) return;
      lastFrame = now;

      const lerp = 0.008;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(delay);
      clearTimeout(timer.current);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const size = mode === "fete" ? 5 : 4;

  return (
    <div
      ref={dotRef}
      className="absolute top-0 left-0 pointer-events-none z-[5] rounded-full"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        backgroundColor: colors.accent,
        boxShadow: `0 0 16px 4px ${colors.cursorGlow}, 0 0 40px 8px ${colors.cursorGlow}30`,
        opacity: visible ? (mode === "noir" ? 0.5 : 0.35) : 0,
        transition: "opacity 2s ease",
        willChange: "transform",
      }}
    />
  );
});
