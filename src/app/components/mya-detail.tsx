import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { Navbar } from "./navbar";
import { FooterSection } from "./footer-section";
import { NoiseBackground, GradientOrbs } from "./noise-background";
import { FloatingGrid } from "./floating-elements";
import { WanderingDot } from "./wandering-dot";
import { FloatingDots } from "./floating-dots";
import { ScrollProgress } from "./scroll-progress";
import { SEOHead } from "./seo-head";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import svgPaths from "../../imports/svg-u0wwpt98nw";

// ── Figma Assets ──
import imgBrandSheet from "figma:asset/5d661b1c474d5b87d6bcd469122e131c3b6cf99f.png";
import imgRing from "figma:asset/263862c56cc8639ac9f2d8b0d844a2611aa9b91c.png";
import imgKeychains from "figma:asset/0f94051a8f76dfc828befdfa602d98ce377d7d77.png";
import imgJewelryBox1 from "figma:asset/160ca026bcb9ef25f319eb09574521fab9004042.png";
import imgJewelryBox2 from "figma:asset/a79549540bc44bd8d69f665fb501b84a46df39cc.png";
import imgPhoto1 from "figma:asset/0f15294d608077e2a5b0f5bf49980413a14f016a.png";
import imgPhoto2 from "figma:asset/4e90d088e19a09211f2812ceab588c0ddbe4d43a.png";
import imgPhoto3 from "figma:asset/3b1009ade706da2f944ec91a322d158a20d45bee.png";
import imgPhoto4 from "figma:asset/b59a77b74a75408214c0228e04a552c2b5713988.png";

/* ── Brand tokens ── */
const M = { lilac: "#D0B0D4", deep: "#231332", black: "#000000", white: "#FFFFFF" };

/* ── Anim ── */
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 34, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true as const, margin: "-40px" },
  transition: { duration: 0.85, delay: d, ease },
});
const fadeIn = (d = 0) => ({
  initial: { opacity: 0, filter: "blur(5px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true as const, margin: "-40px" },
  transition: { duration: 0.75, delay: d, ease },
});

/* ── BentoCell ── */
function Cell({
  children, bg, className = "", style = {}, delay = 0, hover = false,
}: {
  children: React.ReactNode; bg: string; className?: string; style?: React.CSSProperties; delay?: number; hover?: boolean;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`overflow-hidden rounded-[18px] ${hover ? "group" : ""} ${className}`}
      style={{ backgroundColor: bg, ...style }}
      data-cursor-hover={hover || undefined}
    >
      {children}
    </motion.div>
  );
}

/* ── SectionDivider ── */
function Divider({ label, colors }: { label: string; colors: any }) {
  return (
    <motion.div {...fadeIn()} className="flex items-center gap-4 mb-6 mt-6">
      <div className="h-px flex-1 max-w-[32px]" style={{ backgroundColor: colors.accent, opacity: 0.3 }} />
      <span className="font-['Space_Mono'] text-[9px] tracking-[0.35em] uppercase" style={{ color: colors.accent }}>{label}</span>
      <div className="h-px flex-1" style={{ backgroundColor: colors.cardBorder }} />
    </motion.div>
  );
}

/* ── Logo SVG ── */
function Logo({ fill, size = "100%" }: { fill: string; size?: string }) {
  return (
    <svg viewBox="100 30 250 160" fill="none" style={{ width: size, height: "auto" }}>
      <path d={svgPaths.p53e2640} fill={fill} />
    </svg>
  );
}

/* ── Construction SVG ── */
function ConstructionSvg({ dark }: { dark: boolean }) {
  const s = dark ? "rgba(208,176,212,0.22)" : "rgba(35,19,50,0.15)";
  const df = dark ? "rgba(208,176,212,0.1)" : "rgba(208,176,212,0.3)";
  const lf = dark ? "rgba(255,255,255,0.05)" : "rgba(35,19,50,0.03)";
  return (
    <svg viewBox="300 120 880 830" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <path d={svgPaths.p26ec0d00} fill={lf} stroke={M.lilac} strokeWidth="1.2" />
      {[[554.5,242.5],[930.5,800.5],[1021.5,709.5],[1021.5,241.5],[463.5,333.5]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={42} fill={df} />
      ))}
      {[[337,287.5,1147,287.5],[337,845.5,1147,845.5],[337,196.5,1147,196.5],[337,754.5,1147,754.5]].map(([x1,y1,x2,y2],i) => (
        <line key={`h${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s} strokeDasharray="3 3" />
      ))}
      {[[418.5,126,418.5,925],[976.5,126,976.5,925],[509.5,126,509.5,925],[1067.5,126,1067.5,925]].map(([x1,y1,x2,y2],i) => (
        <line key={`v${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s} strokeDasharray="3 3" />
      ))}
    </svg>
  );
}

/* ── ImageCarousel (compact, with text) ── */
function ImageCarousel({
  images, colors, dk, closingTitle, closingText,
}: {
  images: { src: string; alt: string }[];
  colors: any; dk: boolean;
  closingTitle: string; closingText: string;
}) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const prev = useCallback(() => setIdx((i) => (i === 0 ? total - 1 : i - 1)), [total]);
  const next = useCallback(() => setIdx((i) => (i === total - 1 ? 0 : i + 1)), [total]);

  const dragRef = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, dragging: true };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const diff = e.clientX - dragRef.current.startX;
    if (diff > 60) prev();
    else if (diff < -60) next();
    dragRef.current.dragging = false;
  };

  return (
    <motion.div {...fadeUp(0)} className="grid grid-cols-1 md:grid-cols-5 gap-[10px] mb-10">
      {/* Carousel — 3 cols */}
      <div className="md:col-span-3">
        <div
          className="relative overflow-hidden rounded-[18px] select-none"
          style={{ boxShadow: dk ? "0 20px 50px rgba(0,0,0,0.3)" : "0 20px 50px rgba(0,0,0,0.08)" }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          data-cursor-hover
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="min-w-full">
                <img src={img.src} alt={img.alt} loading="lazy" draggable={false} className="w-full aspect-[4/3] object-cover" />
              </div>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            data-cursor-hover
            className="absolute top-1/2 left-3 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: dk ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
              color: dk ? M.white : M.deep,
            }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            data-cursor-hover
            className="absolute top-1/2 right-3 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: dk ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              border: `1px solid ${dk ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
              color: dk ? M.white : M.deep,
            }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="font-['Space_Mono'] text-[8px] tracking-[0.15em]" style={{ color: colors.textFaded }}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                data-cursor-hover
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === idx ? M.lilac : (dk ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"),
                  transform: i === idx ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="font-['Space_Mono'] text-[8px] tracking-[0.15em]" style={{ color: colors.textFaded }}>
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Closing text — 2 cols */}
      <div
        className="md:col-span-2 rounded-[18px] flex flex-col justify-center"
        style={{
          backgroundColor: dk ? "rgba(208,176,212,0.06)" : "rgba(208,176,212,0.1)",
          padding: "32px 28px",
        }}
      >
        <span
          className="font-['Syne'] text-[15px] tracking-[0.01em] block mb-4"
          style={{ color: colors.text, fontWeight: 800 }}
        >
          {closingTitle}<span style={{ color: colors.accent }}>.</span>
        </span>
        <p className="font-['Outfit'] text-[13px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
          {closingText}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
export function MyaDetailPage() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();
  const dk = mode === "dark";

  const cardSoft = dk ? "rgba(208,176,212,0.06)" : "rgba(208,176,212,0.1)";
  const cardMuted = dk ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.025)";
  const cardWhite = dk ? "rgba(255,255,255,0.92)" : "#FFFFFF";

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.bg }}>
      <SEOHead page="projets" />
      <NoiseBackground /><GradientOrbs /><FloatingGrid /><WanderingDot /><ScrollProgress />
      <Navbar />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-[1]">
        <FloatingDots count={6} areaW={500} areaH={250} sizeRange={[2, 4]} opacityRange={[0.05, 0.2]} speed={0.4} />
      </div>

      <main className="relative z-10 pt-28 pb-24 px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">

          {/* ── Back ── */}
          <motion.button
            {...fadeIn()}
            onClick={() => navigate("/projets")}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mb-14 transition-colors"
            style={{ color: colors.textFaded, fontWeight: 400 }}
          >
            <ArrowLeft className="w-4 h-4" />{t("projBack")}
          </motion.button>

          {/* ═══════════════════════════════
               HERO
          ═══════════════════════════════ */}
          <header className="mb-14 md:mb-16">
            <motion.span {...fadeUp(0.03)} className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-4" style={{ color: colors.textFaded }}>
              {t("projDetailMyaCategory")}
            </motion.span>
            <motion.h1 {...fadeUp(0.07)} className="leading-[0.9] mb-3">
              <span className="font-['Syne'] text-[clamp(2.4rem,7vw,5.2rem)] tracking-[0.01em]" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
            </motion.h1>
            <motion.p {...fadeUp(0.11)} className="font-['Caveat'] text-[clamp(1.2rem,3vw,1.7rem)] leading-[1.2] rotate-[-2deg] origin-left max-w-[600px]" style={{ color: colors.accent, fontWeight: 600 }}>
              {t("projDetailMyaSubtitle")}
            </motion.p>
          </header>

          {/* ═══════════════════════════════════════════
               BENTO 1 — Overview & Palette
          ═══════════════════════════════════════════ */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-[10px]">
            {/* Hero logo — 2 cols, 2 rows */}
            <Cell
              bg={M.deep}
              className="md:col-span-2 md:row-span-2 flex flex-col items-center justify-center min-h-[300px] md:min-h-[380px]"
              style={{ boxShadow: "0 30px 80px rgba(35,19,50,0.45)" }}
              delay={0} hover
            >
              <div className="flex flex-col items-center justify-center h-full px-8 py-12">
                <Logo fill={M.lilac} size="clamp(110px, 20vw, 190px)" />
                <span className="font-['Syne'] text-[clamp(26px,4vw,42px)] tracking-[0.3em] mt-6" style={{ color: M.white, fontWeight: 800 }}>
                  MYA
                </span>
                <span className="font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mt-2" style={{ color: "rgba(208,176,212,0.55)", fontWeight: 300 }}>
                  JOAILLERIE
                </span>
              </div>
            </Cell>

            {/* Meta */}
            <Cell bg={cardMuted} delay={0.05} style={{ padding: "28px 24px" }}>
              <div className="flex flex-col justify-between h-full gap-5">
                {[
                  { label: t("projDetailLabelYear"), value: t("projDetailMyaYear") },
                  { label: t("projDetailLabelRole"), value: t("projDetailMyaRole") },
                  { label: t("projDetailLabelCategory"), value: t("projDetailMyaCategory") },
                ].map((m) => (
                  <div key={m.label}>
                    <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase block mb-1" style={{ color: colors.textFaded }}>{m.label}</span>
                    <span className="font-['Outfit'] text-[13px]" style={{ color: colors.text, fontWeight: 300 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </Cell>

            {/* Palette */}
            <Cell bg={cardMuted} delay={0.1} style={{ padding: "24px" }}>
              <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase block mb-4" style={{ color: colors.textFaded }}>PALETTE</span>
              <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                {[
                  { c: M.lilac, n: "#D0B0D4" },
                  { c: M.deep, n: "#231332" },
                  { c: M.black, n: "#000000" },
                  { c: M.white, n: "#FFFFFF" },
                ].map((s) => (
                  <div key={s.n} className="flex flex-col gap-1.5">
                    <div className="aspect-[5/3] w-full rounded-lg" style={{ backgroundColor: s.c, border: s.n === "#FFFFFF" ? `1px solid ${colors.cardBorder}` : "none" }} />
                    <span className="font-['Space_Mono'] text-[7px] md:text-[8px]" style={{ color: colors.textFaded }}>{s.n}</span>
                  </div>
                ))}
              </div>
            </Cell>
          </section>

          {/* ═══════════════════════════════════════════
               BENTO 2 — About & Logo Versions
               Logo blanc = même taille que les 2 autres
          ═══════════════════════════════════════════ */}
          <Divider label={t("projDetailMyaLogos")} colors={colors} />
          <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-[10px]">
            {/* About + Direction */}
            <Cell bg={cardSoft} delay={0} className="md:col-span-2" style={{ padding: "32px 28px" }}>
              <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase block mb-4" style={{ color: colors.textFaded }}>
                {t("projDetailLabelAbout")}
              </span>
              <p className="font-['Outfit'] text-[14px] leading-[1.85] mb-6" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaDesc")}
              </p>
              <span className="font-['Syne'] text-[14px] block mb-2" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaDirLabel")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <p className="font-['Outfit'] text-[12.5px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaDirection")}
              </p>
            </Cell>

            {/* Logo on white — SAME size as others (55%) */}
            <Cell
              bg={cardWhite}
              delay={0.05} hover
              className="flex items-center justify-center min-h-[170px]"
              style={{ boxShadow: dk ? "0 20px 60px rgba(0,0,0,0.3)" : "0 20px 60px rgba(0,0,0,0.07)" }}
            >
              <Logo fill={M.deep} size="55%" />
            </Cell>

            {/* Logo dark */}
            <Cell
              bg={M.deep} delay={0.1} hover
              className="flex items-center justify-center min-h-[170px]"
              style={{ boxShadow: "0 20px 50px rgba(35,19,50,0.4)" }}
            >
              <Logo fill={M.white} size="55%" />
            </Cell>

            {/* Logo lilac */}
            <Cell bg={M.lilac} delay={0.15} hover className="flex items-center justify-center min-h-[170px]">
              <Logo fill={M.deep} size="55%" />
            </Cell>
          </section>

          {/* ═══════════════════════════════════════════
               BENTO 3 — Mise en situation (Construction)
               Intention + Construction SVG + Construction text
          ═══════════════════════════════════════════ */}
          <Divider label={t("projDetailMyaLogoPhotos")} colors={colors} />
          <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-[10px]">
            {/* Intention */}
            <Cell bg={cardMuted} delay={0} style={{ padding: "28px 24px" }}>
              <span className="font-['Syne'] text-[15px] tracking-[0.01em] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaIntentionTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <p className="font-['Outfit'] text-[12.5px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaIntentionText")}
              </p>
            </Cell>

            {/* Construction diagram — 2 cols, 2 rows */}
            <Cell
              bg={dk ? "rgba(208,176,212,0.04)" : "#FFFFFF"}
              delay={0.05} hover
              className="md:col-span-2 md:row-span-2 flex items-center justify-center min-h-[280px] md:min-h-[360px]"
              style={{ border: `1px solid ${dk ? "rgba(208,176,212,0.08)" : "rgba(0,0,0,0.06)"}`, padding: "20px" }}
            >
              <ConstructionSvg dark={dk} />
            </Cell>

            {/* Construction text */}
            <Cell bg={cardMuted} delay={0.1} style={{ padding: "28px 24px" }}>
              <span className="font-['Syne'] text-[15px] tracking-[0.01em] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaConstructionTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <p className="font-['Outfit'] text-[12.5px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaConstructionText")}
              </p>
            </Cell>
          </section>

          {/* ═══════════════════════════════════════════
               BENTO 4 — Analyse du signe
               Lecture + Brand sheet (restrained) + Adaptabilité
          ═══════════════════════════════════════════ */}
          <Divider label={t("projDetailMyaLogoAnalysis")} colors={colors} />
          <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-[10px]">
            {/* Lecture visuelle */}
            <Cell bg={cardSoft} delay={0} style={{ padding: "28px 24px" }}>
              <span className="font-['Syne'] text-[14px] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaLectureTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <p className="font-['Outfit'] text-[12px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaLectureText")}
              </p>
            </Cell>

            {/* Brand sheet — contained, not full-bleed */}
            <Cell
              bg={M.deep}
              delay={0.05} hover
              className="md:col-span-2 md:row-span-2"
              style={{
                boxShadow: "0 30px 60px rgba(35,19,50,0.4)",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={imgBrandSheet}
                alt="MYA — Identité visuelle"
                loading="lazy"
                className="w-full max-w-[580px] h-auto object-contain rounded-[10px] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
            </Cell>

            {/* Adaptabilité */}
            <Cell bg={cardSoft} delay={0.1} style={{ padding: "28px 24px" }}>
              <span className="font-['Syne'] text-[14px] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                {t("projDetailMyaAdaptTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <p className="font-['Outfit'] text-[12px] leading-[1.85]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                {t("projDetailMyaAdaptText")}
              </p>
            </Cell>
          </section>

          {/* ═══════════════════════════════════════════
               BENTO 5 — Applications visuelles
               Ring + Keychains (object-cover) + Boxes
          ═══════════════════════════════════════════ */}
          <Divider label={t("projDetailMyaApplications")} colors={colors} />
          <section className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mb-[10px]">
            {/* Ring — 2 cols */}
            <Cell
              bg={dk ? "rgba(208,176,212,0.08)" : "#f3eaf5"}
              delay={0} hover
              className="md:col-span-2 flex items-center justify-center py-8 md:py-0"
              style={{ minHeight: "240px" }}
            >
              <img src={imgRing} alt="MYA — Bague" loading="lazy" className="max-h-[260px] w-auto object-contain transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
            </Cell>

            {/* Keychains — tall, 2 rows, object-cover to fill */}
            <Cell bg={M.lilac} delay={0.05} hover className="md:row-span-2 min-h-[240px]">
              <img
                src={imgKeychains}
                alt="MYA — Portes-clefs"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </Cell>

            {/* Box 1 */}
            <Cell bg={M.deep} delay={0.1} hover className="min-h-[200px]">
              <img src={imgJewelryBox1} alt="MYA — Boîte" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
            </Cell>

            {/* Box 2 */}
            <Cell bg={cardMuted} delay={0.15} hover className="min-h-[200px]">
              <img src={imgJewelryBox2} alt="MYA — Boîte" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
            </Cell>
          </section>

          {/* ═══════════════════════════════════════════
               BENTO 6 — Images (carousel compact + closing text)
          ═══════════════════════════════════════════ */}
          <Divider label={t("projDetailMyaImages")} colors={colors} />
          <ImageCarousel
            images={[
              { src: imgPhoto1, alt: "MYA — Photo 1" },
              { src: imgPhoto2, alt: "MYA — Photo 2" },
              { src: imgPhoto3, alt: "MYA — Photo 3" },
              { src: imgPhoto4, alt: "MYA — Photo 4" },
            ]}
            colors={colors}
            dk={dk}
            closingTitle={t("projDetailMyaClosingTitle")}
            closingText={t("projDetailMyaClosingText")}
          />

          {/* ── Closing mark ── */}
          <motion.div {...fadeIn()} className="flex flex-col items-center py-14 mb-10">
            <Logo fill={dk ? M.lilac : M.deep} size="44px" />
            <div className="flex items-center gap-3 mt-7">
              <div className="h-px w-10" style={{ backgroundColor: colors.cardBorder }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: M.lilac, opacity: 0.5 }} />
              <div className="h-px w-10" style={{ backgroundColor: colors.cardBorder }} />
            </div>
          </motion.div>

          {/* ── Nav ── */}
          <motion.div {...fadeIn()}>
            <button onClick={() => navigate("/projets")} data-cursor-hover className="flex items-center gap-3 font-['Outfit'] text-[11px] tracking-[0.15em] uppercase transition-colors" style={{ color: colors.textMuted, fontWeight: 300 }}>
              <ArrowLeft className="w-4 h-4" />{t("projBack")}
            </button>
          </motion.div>

        </div>
      </main>
      <FooterSection />
    </div>
  );
}
