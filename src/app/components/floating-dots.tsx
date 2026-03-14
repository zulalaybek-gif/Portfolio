import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme-context";

interface DotConfig {
  /** Number of dots */
  count?: number;
  /** Bounding area width/height — dots stay within this box */
  areaW?: number;
  areaH?: number;
  /** Size range [min, max] in px */
  sizeRange?: [number, number];
  /** Opacity range [min, max] */
  opacityRange?: [number, number];
  /** Speed multiplier */
  speed?: number;
  /** Whether dots react to cursor */
  interactive?: boolean;
  /** Additional className on the wrapper */
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  phase: number;
  speed: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

/**
 * A constellation of soft, organically-moving dots.
 * They drift with sinusoidal orbits and react subtly to cursor proximity.
 */
export function FloatingDots({
  count = 8,
  areaW = 600,
  areaH = 400,
  sizeRange = [3, 7],
  opacityRange = [0.15, 0.5],
  speed = 1,
  interactive = true,
  className = "",
}: DotConfig) {
  const { colors, mode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const colorsRef = useRef(colors);
  const modeRef = useRef(mode);
  colorsRef.current = colors;
  modeRef.current = mode;

  const initDots = useCallback(() => {
    const dots: Dot[] = [];
    for (let i = 0; i < count; i++) {
      const s = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
      const o = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
      dots.push({
        x: Math.random() * areaW,
        y: Math.random() * areaH,
        tx: Math.random() * areaW,
        ty: Math.random() * areaH,
        size: s,
        baseOpacity: o,
        opacity: o,
        phase: Math.random() * Math.PI * 2,
        speed: (0.3 + Math.random() * 0.7) * speed,
        orbitRadius: 20 + Math.random() * 60,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (0.2 + Math.random() * 0.5) * speed * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    dotsRef.current = dots;
  }, [count, areaW, areaH, sizeRange, opacityRange, speed]);

  useEffect(() => {
    initDots();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale for retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width = areaW * dpr;
    canvas.height = areaH * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;
    let lastFrame = 0;
    const THROTTLE = 33; // ~30fps cap

    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (now - lastFrame < THROTTLE) return;
      lastFrame = now;

      time += 0.008;
      ctx.clearRect(0, 0, areaW, areaH);

      const c = colorsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        // Organic orbital motion
        dot.orbitAngle += dot.orbitSpeed * 0.003;
        const ox = Math.cos(dot.orbitAngle + dot.phase) * dot.orbitRadius * 0.5;
        const oy = Math.sin(dot.orbitAngle * 0.7 + dot.phase) * dot.orbitRadius * 0.5;

        // Slow drift toward target
        dot.x += (dot.tx + ox - dot.x) * 0.004 * dot.speed;
        dot.y += (dot.ty + oy - dot.y) * 0.004 * dot.speed;

        // Breathing opacity
        dot.opacity = dot.baseOpacity + Math.sin(time * dot.speed + dot.phase) * 0.1;

        // Interactive: cursor repulsion/attraction
        if (interactive && mx > -999) {
          const dx = dot.x - mx;
          const dy = dot.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 120);
          if (influence > 0) {
            // Gentle scatter away from cursor
            const angle = Math.atan2(dy, dx);
            dot.x += Math.cos(angle) * influence * 1.5;
            dot.y += Math.sin(angle) * influence * 1.5;
            // Brighten near cursor
            dot.opacity = Math.min(1, dot.opacity + influence * 0.3);
          }
        }

        // Pick new target occasionally
        if (Math.random() < 0.001) {
          dot.tx = Math.random() * areaW;
          dot.ty = Math.random() * areaH;
        }

        // Clamp to area
        dot.x = Math.max(0, Math.min(areaW, dot.x));
        dot.y = Math.max(0, Math.min(areaH, dot.y));

        // Draw dot with glow
        ctx.save();
        ctx.globalAlpha = dot.opacity;

        // Outer glow
        const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 3);
        grad.addColorStop(0, c.accent);
        grad.addColorStop(0.4, c.accent + "40");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.globalAlpha = Math.min(1, dot.opacity * 1.5);
        ctx.fillStyle = c.accent;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Draw subtle connecting lines between close dots
      ctx.save();
      for (let i = 0; i < dotsRef.current.length; i++) {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const a = dotsRef.current[i];
          const b = dotsRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const lineOpacity = (1 - dist / 150) * 0.08;
            ctx.globalAlpha = lineOpacity;
            ctx.strokeStyle = c.accent;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initDots, areaW, areaH, interactive]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto ${className}`}
      style={{ width: areaW, height: areaH }}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
    />
  );
}