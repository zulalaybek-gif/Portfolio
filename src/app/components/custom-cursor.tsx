import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "./theme-context";

/**
 * Premium custom cursor — slowly rotating thin cross + center dot.
 * - Tiny accent dot follows the mouse instantly
 * - Two delicate perpendicular lines form a cross that auto-rotates
 * - The cross trails the mouse with smooth interpolation
 * - On hover: cross expands, lines thicken, dot fades
 * - On press: cross contracts
 * - Velocity adds a subtle stretch to the cross for directionality
 */
export function CustomCursor() {
  const { colors, mode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: -100, y: -100 });
  const rotation = useRef(0);
  const raf = useRef(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const isTouch = useRef(false);
  const hoverT = useRef(0);
  const pressT = useRef(0);
  const visibleT = useRef(0);

  const colorsRef = useRef(colors);
  colorsRef.current = colors;
  const hoveringRef = useRef(hovering);
  hoveringRef.current = hovering;
  const pressingRef = useRef(pressing);
  pressingRef.current = pressing;
  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    }

    // Smooth interpolation
    const lerp = 0.22;
    smooth.current.x += (pos.current.x - smooth.current.x) * lerp;
    smooth.current.y += (pos.current.y - smooth.current.y) * lerp;

    // Velocity
    velocity.current.x = pos.current.x - prevPos.current.x;
    velocity.current.y = pos.current.y - prevPos.current.y;
    prevPos.current.x = pos.current.x;
    prevPos.current.y = pos.current.y;

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

    // Animate transition values
    const hTarget = hoveringRef.current ? 1 : 0;
    hoverT.current += (hTarget - hoverT.current) * 0.12;
    const pTarget = pressingRef.current ? 1 : 0;
    pressT.current += (pTarget - pressT.current) * 0.15;
    const vTarget = visibleRef.current ? 1 : 0;
    visibleT.current += (vTarget - visibleT.current) * 0.1;

    // Slow continuous rotation + subtle speed boost
    rotation.current += 0.008 + speed * 0.002;

    // Clear
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const cx = smooth.current.x;
    const cy = smooth.current.y;
    const accent = colorsRef.current.accent;
    const globalAlpha = visibleT.current;

    if (globalAlpha < 0.01) {
      raf.current = requestAnimationFrame(animate);
      return;
    }

    // Cross parameters
    const baseLen = 14;
    const hoverLen = 22;
    const pressLen = 10;
    const armLength = baseLen + (hoverLen - baseLen) * hoverT.current - (baseLen - pressLen) * pressT.current;
    const baseThick = modeRef.current === "noir" ? 1 : 1.2;
    const lineWidth = baseThick + hoverT.current * 0.6;

    // Velocity stretch factor
    const stretch = 1 + Math.min(speed * 0.015, 0.4);

    ctx.save();
    ctx.globalAlpha = globalAlpha;
    ctx.translate(cx, cy);
    ctx.rotate(rotation.current);

    // Draw cross arms with velocity stretch
    ctx.strokeStyle = accent;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    // Horizontal arm (stretches more with horizontal movement)
    const hStretch = 1 + Math.abs(velocity.current.x) * 0.02;
    const armH = armLength * Math.min(hStretch, 1.3);
    ctx.globalAlpha = globalAlpha * (0.35 + hoverT.current * 0.35);
    ctx.beginPath();
    ctx.moveTo(-armH, 0);
    ctx.lineTo(armH, 0);
    ctx.stroke();

    // Vertical arm
    const vStretch = 1 + Math.abs(velocity.current.y) * 0.02;
    const armV = armLength * Math.min(vStretch, 1.3);
    ctx.beginPath();
    ctx.moveTo(0, -armV);
    ctx.lineTo(0, armV);
    ctx.stroke();

    ctx.restore();

    // Center dot — sharp, on exact mouse position (not smoothed)
    const dotR = hovering ? 0 : 2.5 - pressT.current * 0.8;
    const dotAlpha = globalAlpha * (1 - hoverT.current);
    if (dotR > 0 && dotAlpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = dotAlpha;
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Hover: subtle ring at smooth position — REMOVED

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const checkHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[data-cursor-hover],input,textarea,[role='button']"));
    };
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(animate);

    const style = document.createElement("style");
    style.id = "cursor-hide";
    style.textContent = "*,*::before,*::after{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
      style.remove();
    };
  }, [visible, animate]);

  if (isTouch.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    />
  );
}