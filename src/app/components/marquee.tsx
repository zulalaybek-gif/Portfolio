import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { useEffect, useRef } from "react";

const marqueeKeys = [
  "marquee1", "marquee2", "marquee3", "marquee4",
  "marquee5", "marquee6", "marquee7", "marquee8", "marquee9",
] as const;

export function Marquee() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const items = marqueeKeys.map((k) => t(k));

  // Line 2 uses a shifted order so words never stack vertically
  const offset = Math.ceil(items.length / 2);
  const line2Items = [...items.slice(offset), ...items.slice(0, offset)];

  const duration1 = mode === "fete" ? 200 : 280;
  const duration2 = mode === "fete" ? 225 : 310;

  // Use raw rAF-driven translate for maximum smoothness
  useEffect(() => {
    const el1 = line1Ref.current;
    const el2 = line2Ref.current;
    if (!el1 || !el2) return;

    let raf: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000; // seconds

      // Line 1: scroll left. Get half-width of content (we duplicated it)
      const w1 = el1.scrollWidth / 2;
      const px1 = (elapsed / duration1) * w1;
      const x1 = -(px1 % w1);
      el1.style.transform = `translate3d(${x1}px,0,0)`;

      // Line 2: scroll right (starts at -half, moves toward 0)
      const w2 = el2.scrollWidth / 2;
      const px2 = (elapsed / duration2) * w2;
      const x2 = -(w2 - (px2 % w2));
      el2.style.transform = `translate3d(${x2}px,0,0)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration1, duration2, items.join(",")]);

  const filledStyle = { color: colors.marqueeFg, fontWeight: 800 } as const;
  const outlineStyle = {
    fontWeight: 800,
    WebkitTextFillColor: colors.bg,
    WebkitTextStroke: `2px ${colors.marqueeStroke}`,
    paintOrder: "stroke fill",
  } as const;

  const buildLine = (wordList: string[], phaseOffset: number) =>
    wordList.map((item, i) => {
      const isFilled = (i + phaseOffset) % 2 === 0;
      return (
        <span key={`m-${phaseOffset}-${i}`} className="flex items-center gap-12 shrink-0">
          <span
            className="font-['Syne'] text-[clamp(2rem,5vw,4.5rem)] tracking-[0.03em] uppercase"
            style={isFilled ? filledStyle : outlineStyle}
          >
            {item}
          </span>
          <span
            className="w-[6px] h-[6px] shrink-0 rounded-full"
            style={
              isFilled
                ? { backgroundColor: colors.accent, opacity: 0.25 }
                : { border: `1px solid ${colors.accent}`, opacity: 0.2 }
            }
          />
        </span>
      );
    });

  const line1 = buildLine(items, 0);
  const line2 = buildLine(line2Items, 1);

  return (
    <div className="relative py-12 md:py-16 overflow-hidden select-none">
      <div className="h-px w-full mb-8" style={{ background: `linear-gradient(to right, transparent, ${colors.cardBorder}, transparent)` }} />
      <div
        ref={line1Ref}
        className="flex gap-12 whitespace-nowrap mb-4"
        style={{ willChange: "transform" }}
      >
        {line1}
        {line1}
      </div>
      <div
        ref={line2Ref}
        className="flex gap-12 whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {line2}
        {line2}
      </div>
      <div className="h-px w-full mt-8" style={{ background: `linear-gradient(to right, transparent, ${colors.cardBorder}, transparent)` }} />
    </div>
  );
}