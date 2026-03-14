import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { Navbar } from "./navbar";
import { FooterSection } from "./footer-section";
import { NoiseBackground, GradientOrbs } from "./noise-background";
import { FloatingGrid } from "./floating-elements";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { WanderingDot } from "./wandering-dot";
import { FloatingDots } from "./floating-dots";
import { ScrollProgress } from "./scroll-progress";
import { SEOHead } from "./seo-head";

import triptyqueCover from "figma:asset/a8b2cf264c51ef5f20176b39625ca757ecedeb5a.png";
import myaLogoCover from "figma:asset/2cf585e76a624e180418d538130f7d4a83de2e54.png";
import myaCover from "figma:asset/5aaec847dd4e927674af97aa6e5c4ab9bc869ff8.png";
import romaMockup from "figma:asset/ad2c64276560bba68ae641b20d3e11238345b48d.png";
import mwCover from "figma:asset/846a605b15e7ebde5736d7ce39c46af7762274b2.png";
import nsCover from "figma:asset/f42fdcdb494517c62872298639e0ef01add796d6.png";
import toCover from "figma:asset/3ff3fba9261a91787952f9c05897df77ff6780a9.png";
import cdCover from "figma:asset/8a8a3c7c60ce497716baa09fc7676d080761cc36.png";
import snatshCover from "figma:asset/190803e9cd681acad1c199af0309663ae8cf15ae.png";

const projects = [
  { id: 1, title: "Triptyque", subtitle: "Spectacle vivant", catKey: "Direction Artistique",
    img: triptyqueCover, size: "large", slug: "triptyque" },
  { id: 2, title: "MYA", subtitle: "Identité visuelle bijoux", catKey: "Branding",
    img: myaCover, size: "medium", slug: "mya" },
  { id: 3, title: "ROMA", subtitle: "Affiches — Mairie de Paris", catKey: "Direction Artistique",
    img: romaMockup, size: "medium", slug: "roma" },
  { id: 4, title: "Maker Week", subtitle: "Événement étudiant", catKey: "Direction Artistique",
    img: mwCover, size: "large", slug: "maker-week" },
  { id: 5, title: "MZW — No Sense", subtitle: "Identité visuelle electro", catKey: "Branding",
    img: nsCover, size: "medium", slug: "no-sense" },
  { id: 6, title: "Tarots & Oracles", subtitle: "Redesign de flyer", catKey: "Direction Artistique",
    img: toCover, size: "medium", slug: "tarots-oracles" },
  { id: 7, title: "La croisière de la danse", subtitle: "Redesign de flyer", catKey: "Direction Artistique",
    img: cdCover, size: "medium", slug: "croisiere-danse" },
  { id: 8, title: "KH / Kitty Hub", subtitle: "Marketplace Pokémon cards", catKey: "Web",
    img: "", size: "large", slug: "kitty-hub", coverGradient: "linear-gradient(135deg, #8823F7, #FD6235)" },
  { id: 9, title: "SNATSH Agency", subtitle: "Plaquette de présentation", catKey: "Direction Artistique",
    img: snatshCover, size: "medium", slug: "snatsh" },
  { id: 10, title: "Projet X", subtitle: "Site portfolio", catKey: "Web",
    img: "https://images.unsplash.com/photo-1537183673931-f890242dbaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBsYXB0b3AlMjBtb2NrdXAlMjBkYXJrfGVufDF8fHx8MTc3MzA5Mzk1OXww&ixlib=rb-4.1.0&q=80&w=1080", size: "large", slug: "" },
];

// Internal category keys used for filtering (stay constant)
const catKeys = ["Tous", "Direction Artistique", "Branding", "Print", "Vidéo", "Photo", "Web"];
// Translation keys for display
const catTransKeys = ["filterAll", "filterDA", "filterBrand", "filterPrint", "filterVideo", "filterPhoto", "filterWeb"] as const;

export function ProjectsPage() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? projects : projects.filter((p) => p.catKey === active);

  // Map catKey to translated display name
  const catDisplayMap: Record<string, string> = {};
  catKeys.forEach((k, i) => { catDisplayMap[k] = t(catTransKeys[i]); });

  return (
    <div className="relative min-h-screen transition-colors duration-700"
      style={{ backgroundColor: colors.bg }}>
      <SEOHead page="projets" />
      <NoiseBackground />
      <GradientOrbs />
      <FloatingGrid />
      <WanderingDot />
      <ScrollProgress />
      <Navbar />

      {/* Floating dots constellation behind title area */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none z-[1]">
        <FloatingDots
          count={8}
          areaW={600}
          areaH={300}
          sizeRange={[2, 5]}
          opacityRange={[0.08, 0.3]}
          speed={0.6}
          interactive
          className="pointer-events-auto"
        />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate("/")}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mb-14 transition-colors"
            style={{ color: colors.textFaded, fontWeight: 400 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("projBack")}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <h1 className="leading-[0.85]">
              <span className="font-['Syne'] text-[clamp(4rem,12vw,10rem)] tracking-[0.01em]"
                style={{ color: colors.text, fontWeight: 800 }}>
                {t("projPageTitle")}<span style={{ color: colors.accent }}>.</span>
              </span>
            </h1>
            <p className="font-['Outfit'] text-[13px] mt-4"
              style={{ color: colors.textMuted, fontWeight: 300 }}>
              {t("projPageDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 mb-14"
          >
            {catKeys.map((catKey, idx) => {
              const isActive = active === catKey;
              return (
                <motion.button key={catKey}
                  onClick={() => setActive(catKey)}
                  data-cursor-hover
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-full font-['Outfit'] text-[11px] tracking-[0.12em] uppercase transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? colors.accent : "transparent",
                    color: isActive ? "#fff" : colors.textMuted,
                    border: `1px solid ${isActive ? colors.accent : colors.cardBorder}`,
                    fontWeight: isActive ? 500 : 300,
                    boxShadow: isActive ? `0 4px 20px ${colors.cursorGlow}` : "none",
                  }}
                >
                  {catDisplayMap[catKey]}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative rounded-2xl overflow-hidden ${p.size === "large" ? "md:col-span-2" : ""} ${p.slug ? "cursor-pointer" : ""}`}
                  style={{ cursor: p.slug ? "pointer" : "default" }}
                  onClick={() => { if (p.slug) { navigate(`/projets/${p.slug}`); window.scrollTo({ top: 0 }); } }}
                  data-cursor-hover
                >
                  <div className={`relative overflow-hidden ${p.size === "large" ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                    {"coverGradient" in p && p.coverGradient ? (
                      <div
                        className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        style={{ background: p.coverGradient }}
                      />
                    ) : (
                      <ImageWithFallback src={p.img} alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                    )}
                    <div className="absolute inset-0 transition-opacity duration-600"
                      style={{
                        background: mode === "noir"
                          ? "linear-gradient(to top, rgba(7,6,14,0.9) 0%, rgba(7,6,14,0.2) 50%, transparent 100%)"
                          : "linear-gradient(to top, rgba(26,22,50,0.88) 0%, rgba(26,22,50,0.15) 50%, transparent 100%)",
                      }} />
                    {/* Logo overlay for branding projects */}
                    {"logoOverlay" in p && p.logoOverlay && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={p.logoOverlay}
                          alt=""
                          className="w-[22%] max-w-[120px] object-contain invert opacity-60 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:opacity-90 group-hover:scale-105"
                        />
                      </div>
                    )}
                    {/* Cover image overlay for web projects */}
                    {"coverImage" in p && p.coverImage && (
                      <img
                        src={p.coverImage}
                        alt=""
                        className="absolute bottom-0 right-[8%] h-[85%] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                    <div>
                      <span className="font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase block mb-2"
                        style={{ color: `${colors.accent}a0` }}>
                        {catDisplayMap[p.catKey] || p.catKey}
                      </span>
                      <h3 className="font-['Syne'] text-[clamp(1.3rem,2.5vw,1.8rem)] tracking-[0.02em] text-white"
                        style={{ fontWeight: 700 }}>{p.title}</h3>
                      <p className="font-['Outfit'] text-[11px] text-white/40 mt-1"
                        style={{ fontWeight: 300 }}>{p.subtitle}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-600 translate-y-4 group-hover:translate-y-0 shrink-0"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}