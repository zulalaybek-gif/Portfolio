import { useEffect } from "react";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

// ── Figma Imports ──
import imgOriginal from "figma:asset/35243befaad3fa16599fe4e48b3e3a6ae4240ea3.png";
import imgRedesign1 from "figma:asset/691564b01327f6beda015c6f9abb37c8933e981e.png";
import imgRedesign2 from "figma:asset/5e032289537309a69e13cd5770e0007e891b43fb.png";

// ── Anim config ──
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true as const },
  transition: { duration: 0.9, delay, ease },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(6px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  viewport: { once: true as const },
  transition: { duration: 0.8, delay, ease },
});

// ── Section label ──
function SectionLabel({ label, colors }: { label: string; colors: any }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: colors.accent, opacity: 0.3 }} />
      <span className="font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase" style={{ color: colors.accent }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: colors.cardBorder }} />
    </div>
  );
}

// ── Editorial note ──
function EditorialNote({
  text,
  colors,
  delay = 0,
  align = "left",
  maxW = "auto",
}: {
  text: string;
  colors: any;
  delay?: number;
  align?: string;
  maxW?: string;
}) {
  return (
    <motion.p
      {...fadeIn(delay)}
      className="font-['Outfit'] text-[13px] md:text-[14px] leading-[1.85]"
      style={{
        color: colors.textMuted,
        fontWeight: 300,
        textAlign: align as any,
        maxWidth: maxW,
      }}
    >
      {text}
    </motion.p>
  );
}

// ── Pull quote ──
function PullQuote({ text, colors, delay = 0 }: { text: string; colors: any; delay?: number }) {
  return (
    <motion.div
      {...fadeIn(delay)}
      className="relative pl-5"
      style={{ borderLeft: `2px solid ${colors.accent}40` }}
    >
      <p
        className="font-['Caveat'] text-[18px] md:text-[20px] leading-[1.5] italic"
        style={{ color: colors.accent, fontWeight: 600 }}
      >
        {text}
      </p>
    </motion.div>
  );
}

// ── Main Component ──
export function TarotsOraclesDetailPage() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.bg }}>
      <SEOHead page="projets" />
      <NoiseBackground />
      <GradientOrbs />
      <FloatingGrid />
      <WanderingDot />
      <ScrollProgress />
      <Navbar />

      {/* Constellation */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-[1]">
        <FloatingDots count={6} areaW={500} areaH={250} sizeRange={[2, 4]} opacityRange={[0.06, 0.25]} speed={0.5} />
      </div>

      <main className="relative z-10 pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">

          {/* ── Back ── */}
          <motion.button
            {...fadeIn()}
            onClick={() => navigate("/projets")}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mb-16 transition-colors"
            style={{ color: colors.textFaded, fontWeight: 400 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("projBack")}
          </motion.button>

          {/* ═══════════════════════════════════════
               HEADER
          ═══════════════════════════════════════ */}
          <header className="mb-16 md:mb-20">
            <motion.span
              {...fadeUp(0.05)}
              className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-5"
              style={{ color: colors.textFaded }}
            >
              {t("toCategory")}
            </motion.span>

            <motion.h1 {...fadeUp(0.1)} className="leading-[0.88] mb-4">
              <span
                className="font-['Syne'] text-[clamp(2.4rem,8vw,5.5rem)] tracking-[0.01em]"
                style={{ color: colors.text, fontWeight: 800 }}
              >
                {t("toTitle")}
                <span style={{ color: colors.accent }}>.</span>
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.15)}
              className="font-['Caveat'] text-[clamp(1.4rem,3.5vw,2.2rem)] leading-[1] -mt-[0.3em] rotate-[-4deg] origin-left"
              style={{ color: colors.accent, fontWeight: 600 }}
            >
              {t("toSubtitle")}
            </motion.p>

            <motion.div
              {...fadeUp(0.25)}
              className="flex flex-wrap gap-x-10 gap-y-3 mt-10"
            >
              {[
                { label: t("projDetailLabelYear"), value: t("toYear") },
                { label: t("projDetailLabelRole"), value: t("toRole") },
                { label: t("projDetailLabelCategory"), value: t("toCategory") },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase block mb-1" style={{ color: colors.textFaded }}>
                    {item.label}
                  </span>
                  <span className="font-['Outfit'] text-[13px]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </header>

          {/* ═══════════════════════════════════════
               INTRODUCTION
          ═══════════════════════════════════════ */}
          <motion.div {...fadeUp(0.1)} className="mb-24 md:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <span className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-4" style={{ color: colors.textFaded }}>
                  {t("projDetailLabelAbout")}
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="font-['Outfit'] text-[15px] md:text-[16px] leading-[1.8]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                  {t("toDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════
               DIRECTION VISUELLE + ENJEU + PARTI PRIS
          ═══════════════════════════════════════ */}
          <motion.div {...fadeUp(0.1)} className="mb-24 md:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Direction visuelle */}
              <motion.div
                {...fadeIn(0.1)}
                className="relative pl-6"
                style={{ borderLeft: `2px solid ${colors.accent}30` }}
              >
                <span className="font-['Syne'] text-[13px] tracking-[0.02em] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                  {t("projDetailMyaDirLabel")}<span style={{ color: colors.accent }}>.</span>
                </span>
                <p className="font-['Outfit'] text-[14px] leading-[1.8]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                  {t("toDirection")}
                </p>
              </motion.div>

              {/* Enjeu du projet */}
              <motion.div
                {...fadeIn(0.2)}
                className="relative pl-6"
                style={{ borderLeft: `2px solid ${colors.accent}30` }}
              >
                <span className="font-['Syne'] text-[13px] tracking-[0.02em] block mb-3" style={{ color: colors.text, fontWeight: 800 }}>
                  {t("projDetailMyaObjLabel")}<span style={{ color: colors.accent }}>.</span>
                </span>
                <p className="font-['Outfit'] text-[14px] leading-[1.8]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                  {t("toObjective")}
                </p>
              </motion.div>
            </div>

            {/* Parti pris — full width below */}
            <motion.div
              {...fadeIn(0.25)}
              className="mt-14 max-w-[680px]"
            >
              <PullQuote text={t("toApproach")} colors={colors} delay={0.3} />
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════
               SUPPORT ORIGINAL — small, discreet "before" reference
          ═══════════════════════════════════════ */}
          <section className="mb-28 md:mb-36">
            <SectionLabel label={t("toSectionOriginal")} colors={colors} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Small original flyer — visually secondary */}
              <motion.div {...fadeUp(0)} className="md:col-span-3 md:col-start-2">
                <div
                  className="rounded-lg overflow-hidden opacity-75 hover:opacity-90 transition-opacity duration-500"
                  style={{
                    border: `1px solid ${colors.cardBorder}`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.1)`,
                    maxWidth: "200px",
                    margin: "0 auto",
                  }}
                  data-cursor-hover
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={imgOriginal}
                      alt="Flyer original — Tarots & Oracles"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <motion.div {...fadeIn(0.1)} className="mt-4 text-center">
                  <span
                    className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase"
                    style={{ color: colors.textFaded }}
                  >
                    VERSION ORIGINALE
                  </span>
                </motion.div>
              </motion.div>

              {/* Contextual note */}
              <motion.div {...fadeIn(0.15)} className="md:col-span-5 md:col-start-6 flex flex-col gap-6">
                <EditorialNote
                  text={t("toOriginalNote")}
                  colors={colors}
                  delay={0.2}
                />
                <div
                  className="relative pl-5"
                  style={{ borderLeft: `2px solid ${colors.accent}25` }}
                >
                  <p
                    className="font-['Outfit'] text-[12px] md:text-[13px] leading-[1.8]"
                    style={{ color: colors.textFaded, fontWeight: 300, fontStyle: "italic" }}
                  >
                    {t("toNoteHierarchy")}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
               INTERLUDE — Central quote
          ═══════════════════════════════════════ */}
          <motion.div
            {...fadeIn(0.05)}
            className="text-center py-12 md:py-20 mb-20 md:mb-28"
          >
            <p
              className="font-['Caveat'] text-[22px] md:text-[28px] leading-[1.4] max-w-[540px] mx-auto"
              style={{ color: colors.accent, fontWeight: 600 }}
            >
              {t("toQuote")}
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12" style={{ backgroundColor: colors.cardBorder }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.4 }} />
              <div className="h-px w-12" style={{ backgroundColor: colors.cardBorder }} />
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════
               PROPOSITION 1 — Dominant, editorial
          ═══════════════════════════════════════ */}
          <section className="mb-28 md:mb-36">
            <SectionLabel label={t("toSectionProp1")} colors={colors} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Redesign 1 — large, dominant */}
              <motion.div {...fadeUp(0)} className="md:col-span-7">
                <div
                  className="group rounded-xl overflow-hidden"
                  style={{
                    border: `1px solid ${colors.cardBorder}`,
                    boxShadow: `0 30px 60px -15px rgba(0,0,0,0.3)`,
                  }}
                  data-cursor-hover
                >
                  <div className="overflow-hidden">
                    <img
                      src={imgRedesign1}
                      alt="Proposition 1 — Lecture structurée"
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text — right side */}
              <motion.div {...fadeIn(0.15)} className="md:col-span-5 flex flex-col gap-8 md:pt-8">
                <div>
                  <span
                    className="font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase block mb-2"
                    style={{ color: colors.accent, opacity: 0.6 }}
                  >
                    01
                  </span>
                  <span
                    className="font-['Syne'] text-[16px] md:text-[18px] tracking-[0.01em] block mb-5"
                    style={{ color: colors.text, fontWeight: 800 }}
                  >
                    {t("toProp1Title")}<span style={{ color: colors.accent }}>.</span>
                  </span>
                  <p
                    className="font-['Outfit'] text-[13px] md:text-[14px] leading-[1.85]"
                    style={{ color: colors.textMuted, fontWeight: 300 }}
                  >
                    {t("toProp1Desc")}
                  </p>
                </div>

                <PullQuote
                  text={t("toNoteHierarchy")}
                  colors={colors}
                  delay={0.25}
                />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
               PROPOSITION 2 — Dominant, reversed layout
          ═══════════════════════════════════════ */}
          <section className="mb-28 md:mb-36">
            <SectionLabel label={t("toSectionProp2")} colors={colors} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Text — left side */}
              <motion.div {...fadeIn(0.15)} className="md:col-span-5 order-2 md:order-1 flex flex-col gap-8 md:pt-8">
                <div>
                  <span
                    className="font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase block mb-2"
                    style={{ color: colors.accent, opacity: 0.6 }}
                  >
                    02
                  </span>
                  <span
                    className="font-['Syne'] text-[16px] md:text-[18px] tracking-[0.01em] block mb-5"
                    style={{ color: colors.text, fontWeight: 800 }}
                  >
                    {t("toProp2Title")}<span style={{ color: colors.accent }}>.</span>
                  </span>
                  <p
                    className="font-['Outfit'] text-[13px] md:text-[14px] leading-[1.85]"
                    style={{ color: colors.textMuted, fontWeight: 300 }}
                  >
                    {t("toProp2Desc")}
                  </p>
                </div>

                <PullQuote
                  text={t("toNoteUniverse")}
                  colors={colors}
                  delay={0.25}
                />
              </motion.div>

              {/* Redesign 2 — large, dominant */}
              <motion.div {...fadeUp(0)} className="md:col-span-7 order-1 md:order-2">
                <div
                  className="group rounded-xl overflow-hidden"
                  style={{
                    border: `1px solid ${colors.cardBorder}`,
                    boxShadow: `0 30px 60px -15px rgba(0,0,0,0.3)`,
                  }}
                  data-cursor-hover
                >
                  <div className="overflow-hidden">
                    <img
                      src={imgRedesign2}
                      alt="Proposition 2 — Immersion graphique"
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
               SIDE BY SIDE — Both proposals together
          ═══════════════════════════════════════ */}
          <section className="mb-24 md:mb-32">
            <SectionLabel label={t("toSectionRedesign")} colors={colors} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-10">
              {/* Prop 1 */}
              <motion.div {...fadeUp(0)} data-cursor-hover>
                <div
                  className="group rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${colors.cardBorder}`, boxShadow: colors.shadow }}
                >
                  {/* Label bar */}
                  <div
                    className="flex items-center gap-3 px-5 py-3"
                    style={{ borderBottom: `1px solid ${colors.cardBorder}` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
                    <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase" style={{ color: colors.textFaded }}>
                      {t("toSectionProp1")}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={imgRedesign1}
                      alt="Proposition 1"
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Prop 2 */}
              <motion.div {...fadeUp(0.1)} data-cursor-hover>
                <div
                  className="group rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${colors.cardBorder}`, boxShadow: colors.shadow }}
                >
                  {/* Label bar */}
                  <div
                    className="flex items-center gap-3 px-5 py-3"
                    style={{ borderBottom: `1px solid ${colors.cardBorder}` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
                    <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase" style={{ color: colors.textFaded }}>
                      {t("toSectionProp2")}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src={imgRedesign2}
                      alt="Proposition 2"
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Closing note — centered */}
            <div className="max-w-[560px] mx-auto text-center mt-14">
              <EditorialNote
                text={t("toNoteUniverse")}
                colors={colors}
                align="center"
                maxW="560px"
                delay={0.1}
              />
            </div>
          </section>

          {/* ── Separator ── */}
          <div className="flex items-center justify-center gap-3 my-16">
            <div className="h-px w-16" style={{ backgroundColor: colors.cardBorder }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.4 }} />
            <div className="h-px w-16" style={{ backgroundColor: colors.cardBorder }} />
          </div>

          {/* ── Navigation ── */}
          <motion.div
            {...fadeIn()}
            className="flex items-center justify-between mt-16"
          >
            <button
              onClick={() => navigate("/projets/no-sense")}
              data-cursor-hover
              className="flex items-center gap-3 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors"
              style={{ color: colors.textMuted, fontWeight: 300 }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("projDetailPrev")}
            </button>

            <button
              onClick={() => navigate("/projets/croisiere-danse")}
              data-cursor-hover
              className="flex items-center gap-3 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors"
              style={{ color: colors.accent, fontWeight: 400 }}
            >
              {t("projDetailNext")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}