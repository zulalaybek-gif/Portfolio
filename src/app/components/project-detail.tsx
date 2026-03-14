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
import { useNavigate, useParams } from "react-router";

// ── Figma Imports — Triptyque ──
import imgMockup12 from "figma:asset/23acfddc79b69803ed0c12309ebbf1b096a1fb75.png";
import imgC1 from "figma:asset/1bf4ba6d2595ba3f7cedc009ddab8bcd1ef49e82.png";
import imgB1 from "figma:asset/c7f4397444e13ee0d6d1a983e24a5b9044257dca.png";
import imgA1 from "figma:asset/3756986884ba0261fe4f428c15a36edc77f1d9ee.png";
import imgMockup11 from "figma:asset/8ec711aa2a8e96750f83190b6bf872e0f39d0fee.png";
import imgPlanDeTravail11 from "figma:asset/ce6df195729363b7e2b288eb8b06561b2ea06a2b.png";
import imgPlanDeTravail21 from "figma:asset/21b17a4e5a9573e3fb15228ac14cd4b0ad0ea201.png";
import imgPlanDeTravail31 from "figma:asset/e70634b16c3ab37c89e4e306e1d0098ba9108599.png";
import imgTriptyqueHero from "figma:asset/a8b2cf264c51ef5f20176b39625ca757ecedeb5a.png";

// ── MYA — now uses dedicated mya-detail.tsx ──

// ── Figma Imports — ROMA ──
import romaAfficheA from "figma:asset/b7bf5c481864083c1b0ec51c9bbb5e17bf93665b.png";
import romaAfficheB from "figma:asset/42789f20dbc1c74b38f641fcb5138e47f4fc6470.png";
import romaAfficheC from "figma:asset/a511767aeddb866d5ca5a953cddd4032238cebc1.png";
import romaMockup from "figma:asset/ad2c64276560bba68ae641b20d3e11238345b48d.png";

// ── Section types ──
type SectionType = "poster-grid" | "logo-showcase" | "mockup-gallery" | "logo-analysis" | "logo-photos";

interface ProjectImage {
  src: string;
  srcDark?: string; // alternate version for dark theme
  alt: string;
  aspect?: string;
  logoPos?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  isDarkImage?: boolean;
}

interface ProjectSection {
  type: SectionType;
  labelKey: string;
  images: ProjectImage[];
  mockup?: { src: string; alt: string };
  logoOverlay?: string;
  analysisBlocks?: { titleKey: string; textKey: string }[];
}

interface ProjectData {
  slug: string;
  titleKey: string;
  subtitleKey: string;
  categoryKey: string;
  yearKey: string;
  roleKey: string;
  descriptionKey: string;
  objectiveKey: string;
  directionKey?: string;
  sections: ProjectSection[];
  heroImage?: string;
  prevSlug?: string;
  nextSlug?: string;
}

// ── Projects data ──
const projectsData: Record<string, ProjectData> = {
  triptyque: {
    slug: "triptyque",
    titleKey: "projDetailTriTitle",
    subtitleKey: "projDetailTriSubtitle",
    categoryKey: "projDetailTriCategory",
    yearKey: "projDetailTriYear",
    roleKey: "projDetailTriRole",
    descriptionKey: "projDetailTriDesc",
    objectiveKey: "projDetailTriObjective",
    nextSlug: "mya",
    sections: [
      {
        type: "poster-grid",
        labelKey: "projDetailTriProp1",
        images: [
          { src: imgPlanDeTravail11, alt: "Proposition 1 — Affiche A" },
          { src: imgPlanDeTravail21, alt: "Proposition 1 — Affiche B" },
          { src: imgPlanDeTravail31, alt: "Proposition 1 — Affiche C" },
        ],
        mockup: { src: imgMockup11, alt: "Proposition 1 — Mise en situation" },
      },
      {
        type: "poster-grid",
        labelKey: "projDetailTriProp2",
        images: [
          { src: imgA1, alt: "Proposition 2 — Affiche A" },
          { src: imgB1, alt: "Proposition 2 — Affiche B" },
          { src: imgC1, alt: "Proposition 2 — Affiche C" },
        ],
        mockup: { src: imgMockup12, alt: "Proposition 2 — Mise en situation" },
      },
    ],
  },
  roma: {
    slug: "roma",
    titleKey: "projDetailRomaTitle",
    subtitleKey: "projDetailRomaSubtitle",
    categoryKey: "projDetailRomaCategory",
    yearKey: "projDetailRomaYear",
    roleKey: "projDetailRomaRole",
    descriptionKey: "projDetailRomaDesc",
    objectiveKey: "projDetailRomaObjective",
    directionKey: "projDetailRomaDirection",
    prevSlug: "mya",
    nextSlug: "maker-week",
    sections: [
      {
        type: "poster-grid",
        labelKey: "projDetailRomaAffiches",
        images: [
          { src: romaAfficheA, alt: "Affiche Paris 6ᵉ — A" },
          { src: romaAfficheB, alt: "Affiche Paris 6ᵉ — B" },
          { src: romaAfficheC, alt: "Affiche Paris 6ᵉ — C" },
        ],
        mockup: { src: romaMockup, alt: "Mise en situation — Affiches in situ" },
      },
    ],
  },
};

// ── Shared anim config ──
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
});

// ── Small corner logo overlay ──
function LogoCornerOverlay({ src, position, isDark }: { src: string; position: string; isDark: boolean }) {
  const posClasses: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };
  return (
    <div className={`absolute ${posClasses[position] || posClasses["bottom-right"]} z-10`}>
      <img
        src={src}
        alt="MYA"
        className="w-[36px] md:w-[44px] object-contain opacity-70 transition-opacity duration-500 group-hover:opacity-90"
        style={{
          filter: isDark ? "invert(1)" : "none",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
    </div>
  );
}

// ── Logo Showcase — no background, clean, small, theme-adaptive ──
// Two distinct logo files: black for light theme, white for dark theme — no CSS recoloring
function LogoShowcaseSection({ section, colors, mode }: { section: ProjectSection; colors: any; mode: string }) {
  const isDark = mode === "noir";
  const img = section.images[0];
  const displaySrc = isDark && img.srcDark ? img.srcDark : img.src;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center justify-center py-16 md:py-24"
    >
      <img
        key={isDark ? "dark" : "light"}
        src={displaySrc}
        alt={img.alt}
        loading="lazy"
        className="max-w-[180px] md:max-w-[220px] w-[35%] object-contain transition-opacity duration-500"
      />
    </motion.div>
  );
}

// ── Logo Analysis — elegant 2×2 grid of design rationale blocks ──
function LogoAnalysisSection({ section, colors }: { section: ProjectSection; colors: any }) {
  const { t } = useLang();
  const blocks = section.analysisBlocks || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-14">
      {blocks.map((block, i) => (
        <motion.div
          key={block.titleKey}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1, ease }}
          className="relative pl-6"
          style={{ borderLeft: `2px solid ${colors.accent}20` }}
        >
          {/* Ordinal number */}
          <span
            className="font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase block mb-3"
            style={{ color: colors.textFaded }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <span
            className="font-['Syne'] text-[14px] md:text-[15px] tracking-[0.01em] block mb-3"
            style={{ color: colors.text, fontWeight: 800 }}
          >
            {t(block.titleKey as any)}
            <span style={{ color: colors.accent }}>.</span>
          </span>

          {/* Body */}
          <p
            className="font-['Outfit'] text-[13px] md:text-[14px] leading-[1.8]"
            style={{ color: colors.textMuted, fontWeight: 300 }}
          >
            {t(block.textKey as any)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Mockup Gallery ──
function MockupGallerySection({ section, colors }: { section: ProjectSection; colors: any; mode: string }) {
  const layouts = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {section.images.map((img, ii) => (
        <motion.div
          key={ii}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: ii * 0.1, ease }}
          className={`group relative rounded-xl overflow-hidden ${layouts[ii] || "md:col-span-6"}`}
          style={{
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.shadow,
          }}
          data-cursor-hover
        >
          <div className={`relative overflow-hidden ${img.aspect || "aspect-[16/9]"}`}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.01) 40%, rgba(0,0,0,0.15) 100%)",
            }} />
            {section.logoOverlay && (
              <LogoCornerOverlay
                src={section.logoOverlay}
                position={img.logoPos || "bottom-right"}
                isDark={img.isDarkImage !== false}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Poster Grid (Triptyque) ──
function PosterGridSection({ section, colors }: { section: ProjectSection; colors: any }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
        {section.images.map((img, ii) => (
          <motion.div
            key={ii}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: ii * 0.1, ease }}
            className="group relative rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${colors.cardBorder}`,
              boxShadow: colors.shadow,
            }}
            data-cursor-hover
          >
            <div className="aspect-[2/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        ))}
      </div>
      {section.mockup && (
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="relative rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.shadow,
          }}
          data-cursor-hover
        >
          <div
            className="flex items-center gap-3 px-5 py-3"
            style={{ borderBottom: `1px solid ${colors.cardBorder}` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.5 }} />
            <span className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase" style={{ color: colors.textFaded }}>
              MISE EN SITUATION
            </span>
          </div>
          <div className="aspect-[16/9] overflow-hidden">
            <img src={section.mockup.src} alt={section.mockup.alt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      )}
    </>
  );
}

// ── Logo Photos — grid of photos with captions ──
function LogoPhotosSection({ section, colors }: { section: ProjectSection; colors: any }) {
  // Alternating layout: 7/5, 5/7 for visual rhythm
  const layouts = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {section.images.map((img, ii) => (
        <motion.div
          key={ii}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: ii * 0.08, ease }}
          className={`group relative rounded-xl overflow-hidden ${layouts[ii % layouts.length]}`}
          style={{
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.shadow,
          }}
          data-cursor-hover
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Component ──
export function ProjectDetailPage() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();
  const { slug } = useParams();

  const project = slug ? projectsData[slug] : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <NoiseBackground />
        <Navbar />
        <div className="text-center z-10">
          <h1 className="font-['Syne'] text-[2rem]" style={{ color: colors.text, fontWeight: 800 }}>
            {t("projDetailNotFound")}
          </h1>
          <button
            onClick={() => navigate("/projets")}
            className="mt-6 font-['Outfit'] text-[12px] tracking-[0.2em] uppercase"
            style={{ color: colors.accent, fontWeight: 400 }}
            data-cursor-hover
          >
            ← {t("projBack")}
          </button>
        </div>
      </div>
    );
  }

  const renderSection = (section: ProjectSection) => {
    switch (section.type) {
      case "logo-showcase":
        return <LogoShowcaseSection section={section} colors={colors} mode={mode} />;
      case "logo-analysis":
        return <LogoAnalysisSection section={section} colors={colors} />;
      case "mockup-gallery":
        return <MockupGallerySection section={section} colors={colors} mode={mode} />;
      case "poster-grid":
      default:
        return <PosterGridSection section={section} colors={colors} />;
      case "logo-photos":
        return <LogoPhotosSection section={section} colors={colors} />;
    }
  };

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.bg }}>
      <SEOHead page="projets" />
      <NoiseBackground />
      <GradientOrbs />
      <FloatingGrid />
      <WanderingDot />
      <ScrollProgress />
      <Navbar />

      {/* Constellation behind header */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-[1]">
        <FloatingDots count={6} areaW={500} areaH={250} sizeRange={[2, 4]} opacityRange={[0.06, 0.25]} speed={0.5} />
      </div>

      <main className="relative z-10 pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">

          {/* ── Back button ── */}
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

          {/* ── Header ── */}
          <header className="mb-16 md:mb-20">
            <motion.span
              {...fadeUp(0.05)}
              className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-5"
              style={{ color: colors.textFaded }}
            >
              {t(project.categoryKey as any)}
            </motion.span>

            <motion.h1 {...fadeUp(0.1)} className="leading-[0.88] mb-4">
              <span
                className="font-['Syne'] text-[clamp(2.8rem,9vw,7rem)] tracking-[0.01em]"
                style={{ color: colors.text, fontWeight: 800 }}
              >
                {t(project.titleKey as any)}
                <span style={{ color: colors.accent }}>.</span>
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.15)}
              className="font-['Caveat'] text-[clamp(1.6rem,4vw,2.6rem)] leading-[1] -mt-[0.4em] rotate-[-4deg] origin-left"
              style={{ color: colors.accent, fontWeight: 600 }}
            >
              {t(project.subtitleKey as any)}
            </motion.p>

            <motion.div
              {...fadeUp(0.25)}
              className="flex flex-wrap gap-x-10 gap-y-3 mt-10"
            >
              {[
                { label: t("projDetailLabelYear"), value: t(project.yearKey as any) },
                { label: t("projDetailLabelRole"), value: t(project.roleKey as any) },
                { label: t("projDetailLabelCategory"), value: t(project.categoryKey as any) },
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

          {/* ── Hero image — only if project has one ── */}
          {project.heroImage && (
            <motion.div
              {...fadeUp(0.3)}
              className="relative rounded-2xl overflow-hidden mb-20 md:mb-28"
              style={{
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.shadow,
              }}
            >
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={t(project.titleKey as any)}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      mode === "noir"
                        ? "linear-gradient(to top, rgba(7,6,14,0.5) 0%, transparent 40%)"
                        : "linear-gradient(to top, rgba(250,244,234,0.4) 0%, transparent 40%)",
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* ── Description — structured with info blocks ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="mb-24 md:mb-32"
          >
            {/* Main intro */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-14">
              <div className="md:col-span-4">
                <span className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-4" style={{ color: colors.textFaded }}>
                  {t("projDetailLabelAbout")}
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="font-['Outfit'] text-[15px] md:text-[16px] leading-[1.8]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                  {t(project.descriptionKey as any)}
                </p>
              </div>
            </div>

            {/* Direction visuelle + Enjeu du projet — only for projects that have them */}
            {(project.directionKey || project.objectiveKey) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {project.directionKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="relative pl-6"
                    style={{ borderLeft: `2px solid ${colors.accent}30` }}
                  >
                    <span
                      className="font-['Syne'] text-[13px] tracking-[0.02em] block mb-3"
                      style={{ color: colors.text, fontWeight: 800 }}
                    >
                      {t("projDetailMyaDirLabel")}
                      <span style={{ color: colors.accent }}>.</span>
                    </span>
                    <p className="font-['Outfit'] text-[14px] leading-[1.8]" style={{ color: colors.textMuted, fontWeight: 300 }}>
                      {t(project.directionKey as any)}
                    </p>
                  </motion.div>
                )}
                {project.objectiveKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="relative pl-6"
                    style={{ borderLeft: `2px solid ${colors.accent}30` }}
                  >
                    <span
                      className="font-['Syne'] text-[13px] tracking-[0.02em] block mb-3"
                      style={{ color: colors.text, fontWeight: 800 }}
                    >
                      {t("projDetailMyaObjLabel")}
                      <span style={{ color: colors.accent }}>.</span>
                    </span>
                    <p className="font-['Outfit'] text-[14px] leading-[1.8]" style={{ color: colors.textFaded, fontWeight: 300 }}>
                      {t(project.objectiveKey as any)}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Sections ── */}
          {project.sections.map((section, si) => (
            <motion.section
              key={si}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease }}
              className="mb-24 md:mb-32"
            >
              {/* Section label */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: colors.accent, opacity: 0.3 }} />
                <span className="font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase" style={{ color: colors.accent }}>
                  {t(section.labelKey as any)}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: colors.cardBorder }} />
              </div>

              {renderSection(section)}
            </motion.section>
          ))}

          {/* ── Separator ── */}
          <div className="flex items-center justify-center gap-3 my-16">
            <div className="h-px w-16" style={{ backgroundColor: colors.cardBorder }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent, opacity: 0.4 }} />
            <div className="h-px w-16" style={{ backgroundColor: colors.cardBorder }} />
          </div>

          {/* ── Navigation between projects ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="flex items-center justify-between mt-16"
          >
            {project.prevSlug ? (
              <button
                onClick={() => navigate(`/projets/${project.prevSlug}`)}
                data-cursor-hover
                className="flex items-center gap-3 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors"
                style={{ color: colors.textMuted, fontWeight: 300 }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("projDetailPrev")}
              </button>
            ) : (
              <button
                onClick={() => navigate("/projets")}
                data-cursor-hover
                className="flex items-center gap-3 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors"
                style={{ color: colors.textMuted, fontWeight: 300 }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("projDetailAllProjects")}
              </button>
            )}

            {project.nextSlug && (
              <button
                onClick={() => navigate(`/projets/${project.nextSlug}`)}
                data-cursor-hover
                className="flex items-center gap-3 font-['Outfit'] text-[12px] tracking-[0.15em] uppercase transition-colors"
                style={{ color: colors.accent, fontWeight: 400 }}
              >
                {t("projDetailNext")}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}