import { useEffect, useRef, memo } from "react";
import { useTheme } from "./theme-context";

export const NoiseBackground = memo(function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Use a very small canvas — it tiles via CSS
    const w = (canvas.width = 128);
    const h = (canvas.height = 128);
    let active = true;
    let lastFrame = 0;
    const INTERVAL = 120; // ~8fps instead of 12fps, saves CPU

    const draw = (now: number) => {
      if (!active) return;
      if (now - lastFrame < INTERVAL) {
        requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;

      const img = ctx.createImageData(w, h);
      const d = img.data;
      // Unrolled for speed — write 4 pixels at a time
      for (let i = 0; i < d.length; i += 16) {
        const v1 = (Math.random() * 255) | 0;
        const v2 = (Math.random() * 255) | 0;
        const v3 = (Math.random() * 255) | 0;
        const v4 = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v1; d[i + 3] = 8;
        d[i + 4] = d[i + 5] = d[i + 6] = v2; d[i + 7] = 8;
        d[i + 8] = d[i + 9] = d[i + 10] = v3; d[i + 11] = 8;
        d[i + 12] = d[i + 13] = d[i + 14] = v4; d[i + 15] = 8;
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    return () => { active = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{
        opacity: colors.grain,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
});

export const GradientOrbs = memo(function GradientOrbs() {
  const { colors } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Static gradients only — no mouse tracking, no springs, no rAF */}
      <div className="absolute inset-0" style={{ background: colors.gradient1 }} />
      <div className="absolute inset-0" style={{ background: colors.gradient2 }} />
      <div className="absolute inset-0" style={{ background: colors.gradient3 }} />

      {/* Soft static orbs — reduced blur, CSS animation only */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: "15%",
          left: "10%",
          background: `radial-gradient(circle, ${colors.orbA} 0%, transparent 70%)`,
          filter: "blur(80px)",
          willChange: "auto",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full animate-[drift1_30s_ease-in-out_infinite]"
        style={{
          top: "60%",
          right: "10%",
          background: `radial-gradient(circle, ${colors.orbB} 0%, transparent 70%)`,
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full animate-[drift2_25s_ease-in-out_infinite]"
        style={{
          bottom: "5%",
          left: "30%",
          background: `radial-gradient(circle, ${colors.orbC} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -15px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-18px, 12px); }
        }
      `}</style>
    </div>
  );
});