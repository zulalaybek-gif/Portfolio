import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "./theme-context";

interface LuminousTextProps {
  text: string;
  className?: string;
  baseColor: string;
  glowColor: string;
  radius?: number;
  intensity?: number;
}

export function LuminousText({
  text,
  className = "",
  baseColor,
  glowColor,
  radius = 180,
  intensity = 0.7,
}: LuminousTextProps) {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(0);
  const isVisible = useRef(false);
  const [mounted, setMounted] = useState(false);

  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    setMounted(true);

    // Only run the animation loop when the element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { rootMargin: "100px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let lastRun = 0;
    const THROTTLE = 32; // ~30fps max

    const animate = (now: number) => {
      rafId.current = requestAnimationFrame(animate);

      if (!isVisible.current || now - lastRun < THROTTLE) return;
      lastRun = now;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      for (const el of charsRef.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const proximity = Math.max(0, 1 - dist / radius);
        const glow = proximity * proximity * intensity;

        if (glow > 0.01) {
          el.style.color = glowColor;
          el.style.opacity = String(0.4 + glow * 0.6);
          el.style.textShadow = `0 0 ${20 * glow}px ${colors.cursorGlow}`;
          el.style.transform = `translateY(${-glow * 2}px)`;
        } else {
          el.style.color = baseColor;
          el.style.opacity = "0.4";
          el.style.textShadow = "none";
          el.style.transform = "translateY(0)";
        }
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [baseColor, glowColor, radius, intensity, colors.cursorGlow]);

  return (
    <div ref={containerRef} className={`inline ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { charsRef.current[i] = el; }}
          className="inline-block transition-none"
          style={{
            color: baseColor,
            opacity: mounted ? 0.4 : 1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
