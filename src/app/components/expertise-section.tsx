import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { useRef, useState, useEffect, useCallback } from "react";

function MagneticCard({ children, className, style }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx * 0.06); y.set(cy * 0.06);
    rotX.set(cy * -0.02); rotY.set(cx * 0.02);
  };
  const onLeave = () => { x.set(0); y.set(0); rotX.set(0); rotY.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX: rotX, rotateY: rotY, ...style }}
      className={className} data-cursor-hover
    >
      {children}
    </motion.div>
  );
}

export function ExpertiseSection() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isScrolling = useRef(false);

  const services = [
    { num: "01", title: t("svc1Title"), desc: t("svc1Desc") },
    { num: "02", title: t("svc2Title"), desc: t("svc2Desc") },
    { num: "03", title: t("svc3Title"), desc: t("svc3Desc") },
    { num: "04", title: t("svc4Title"), desc: t("svc4Desc") },
    { num: "05", title: t("svc5Title"), desc: t("svc5Desc") },
    { num: "06", title: t("svc6Title"), desc: t("svc6Desc") },
    { num: "07", title: t("svc7Title"), desc: t("svc7Desc") },
    { num: "08", title: t("svc8Title"), desc: t("svc8Desc") },
  ];

  const count = services.length;
  // We triple the items: [clone-end] [originals] [clone-start]
  // This allows seamless infinite scroll
  const tripled = [...services, ...services, ...services];
  const cardWidth = 340; // card + gap
  const gapWidth = 20;
  const itemTotal = cardWidth + gapWidth;

  // On mount, scroll to the "real" middle set
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft = count * itemTotal;
  }, [count, itemTotal]);

  // Detect when we've scrolled past the boundaries and silently reset
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isScrolling.current) return;
    const el = scrollRef.current;
    const oneSetWidth = count * itemTotal;
    const maxLeft = oneSetWidth * 2;

    // If scrolled past right boundary (into 3rd set), jump back to middle
    if (el.scrollLeft >= maxLeft) {
      el.scrollLeft -= oneSetWidth;
    }
    // If scrolled before left boundary (into 1st set), jump forward to middle
    if (el.scrollLeft <= 0) {
      el.scrollLeft += oneSetWidth;
    }

    // Calculate which original card is ~centered
    const centerOffset = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round(centerOffset / itemTotal) % count;
    setActiveIdx(idx >= 0 ? idx % count : (idx + count) % count);
  }, [count, itemTotal]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    isScrolling.current = true;
    const el = scrollRef.current;
    const amount = itemTotal;

    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });

    // After smooth scroll completes, check boundaries
    setTimeout(() => {
      isScrolling.current = false;
      handleScroll();
    }, 500);
  };

  const scrollToIndex = (i: number) => {
    if (!scrollRef.current) return;
    isScrolling.current = true;
    const el = scrollRef.current;
    // Target position in the middle set
    const targetLeft = (count + i) * itemTotal - el.clientWidth / 2 + itemTotal / 2;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    setTimeout(() => {
      isScrolling.current = false;
      handleScroll();
    }, 500);
  };

  return (
    <section id="services" className="relative px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-5"
              style={{ color: colors.textFaded }}>
              {t("expertLabel")}
            </span>
            <h2 className="tracking-[0.01em]">
              <span className="font-['Syne'] text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] block"
                style={{ color: colors.text, fontWeight: 800 }}>
                {t("expertTitle1")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <span className="font-['Caveat'] text-[clamp(2.8rem,6.5vw,5rem)] leading-[0.85] block -mt-[0.4em] rotate-[-4deg] origin-left"
                style={{ color: colors.accent, fontWeight: 600 }}>
                {t("expertTitle2")}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <motion.p
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-['Outfit'] text-[13px] leading-[1.8] max-w-xs mr-4 whitespace-pre-line"
              style={{ color: colors.textMuted, fontWeight: 300 }}
            >
              {t("expertDesc")}
            </motion.p>

            <button
              onClick={() => scroll("left")}
              data-cursor-hover
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 hover:scale-110"
              style={{ border: `1px solid ${colors.cardBorder}`, color: colors.textMuted }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              data-cursor-hover
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 hover:scale-110"
              style={{ border: `1px solid ${colors.cardBorder}`, color: colors.textMuted }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel with fade edges */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {tripled.map((s, i) => (
              <div
                key={`${s.num}-${i}`}
                className="shrink-0 w-[320px] md:w-[340px]"
                style={{ scrollSnapAlign: "center" }}
              >
                <MagneticCard
                  className="group relative h-full rounded-2xl p-7 md:p-8 overflow-hidden transition-all duration-700"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.cardBorder}`,
                    minHeight: "260px",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}0a 0%, transparent 70%)`,
                    }} />

                  <div className="relative z-10 h-full flex flex-col">
                    <span className="font-['Space_Mono'] text-[10px] tracking-[0.3em] block mb-6"
                      style={{ color: colors.textFaded }}>{s.num}</span>
                    <h3 className="font-['Syne'] text-[clamp(1.4rem,2.5vw,1.8rem)] leading-[1.1] tracking-[0.01em] mb-4 whitespace-pre-line transition-transform duration-500 group-hover:translate-x-1"
                      style={{ color: colors.text, fontWeight: 700 }}>{s.title}</h3>
                    <p className="font-['Outfit'] text-[12px] leading-[1.7] mt-auto"
                      style={{ color: colors.textMuted, fontWeight: 300 }}>{s.desc}</p>

                    <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-0"
                      style={{ backgroundColor: colors.accent, boxShadow: `0 0 8px ${colors.cursorGlow}` }} />
                  </div>
                </MagneticCard>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                data-cursor-hover
                className="transition-all duration-500 rounded-full"
                style={{
                  width: activeIdx === i ? 24 : 6,
                  height: 6,
                  backgroundColor: activeIdx === i ? colors.accent : `${colors.textFaded}40`,
                  boxShadow: activeIdx === i ? `0 0 8px ${colors.cursorGlow}` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}