import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { useNavigate } from "react-router";
import { FloatingDots } from "./floating-dots";

export function HeroSection() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const heroTitle = t("heroTitle");
  const heroLetters = heroTitle.split("").map((char, i) => ({
    char,
    accent: heroTitle === "CRÉER" ? i === 2 :
            heroTitle === "CREATE" ? i === 0 :
            false,
  }));

  const tickCount = mode === "noir" ? 72 : 36;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (i / tickCount) * 360;
    const isMajor = i % (mode === "noir" ? 12 : 6) === 0;
    const isMid = i % (mode === "noir" ? 6 : 3) === 0 && !isMajor;
    return { angle, isMajor, isMid };
  });

  const outerDuration = mode === "noir" ? 120 : 45;
  const middleDuration = mode === "noir" ? 180 : 60;
  const innerDuration = mode === "noir" ? 200 : 80;
  const orbitDuration = mode === "noir" ? 8 : 5;

  return (
    <section ref={ref} className="relative min-h-[105vh] flex items-center justify-center overflow-hidden">
      {/* Primary floating orb — static, no mouse tracking */}
      <div
        className="absolute rounded-full"
        style={{
          width: mode === "fete" ? 600 : 500,
          height: mode === "fete" ? 600 : 500,
          filter: "blur(100px)",
          background: mode === "noir"
            ? `radial-gradient(circle, ${colors.orbA} 0%, ${colors.orbC} 40%, transparent 65%)`
            : `radial-gradient(circle, ${colors.orbA} 0%, ${colors.orbB} 30%, ${colors.orbC} 60%, transparent 75%)`,
        }}
      />
      {/* Secondary orb — static */}
      <div
        className="absolute rounded-full"
        style={{
          width: mode === "fete" ? 400 : 300,
          height: mode === "fete" ? 400 : 300,
          filter: "blur(80px)",
          right: "10%", top: "20%",
          background: mode === "noir"
            ? `radial-gradient(circle, ${colors.orbB} 0%, transparent 60%)`
            : `radial-gradient(circle, ${colors.highlight}30 0%, ${colors.orbC} 40%, transparent 70%)`,
        }}
      />

      {/* ======= DECORATIVE ROTATING RINGS ======= */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: outerDuration, repeat: Infinity, ease: "linear" }}
        className="absolute w-[700px] h-[700px] md:w-[1100px] md:h-[1100px]"
        style={{ opacity: colors.ringOpacity }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{
            border: `${colors.ringStrokeWidth} solid ${colors.cardBorder}`,
            boxShadow: mode === "fete" ? `inset 0 0 60px ${colors.accent}06` : "none",
          }} />
        {ticks.map((tick, i) => (
          <div key={i} className="absolute top-0 left-1/2 origin-bottom"
            style={{ height: "50%", width: "1px", transform: `rotate(${tick.angle}deg)` }}>
            <div style={{
              width: mode === "fete" && tick.isMajor ? "2px" : "1px",
              height: tick.isMajor ? (mode === "fete" ? "24px" : "16px") : tick.isMid ? (mode === "fete" ? "12px" : "8px") : "4px",
              backgroundColor: tick.isMajor ? colors.accent : colors.textFaded,
              opacity: tick.isMajor ? colors.ringTickOpacity : 0.15,
              borderRadius: mode === "fete" ? "1px" : "0",
            }} />
          </div>
        ))}
        {[0, 90, 180, 270].map((deg) => (
          <div key={deg} className="absolute top-0 left-1/2 origin-bottom"
            style={{ height: "50%", transform: `rotate(${deg}deg)` }}>
            <div className="relative -top-1 -left-[3px]">
              <div className="w-[7px] h-[1px] absolute top-0 left-0"
                style={{ backgroundColor: colors.accent, opacity: mode === "fete" ? 0.6 : 0.4 }} />
              <div className="w-[1px] h-[7px] absolute -top-[3px] left-[3px]"
                style={{ backgroundColor: colors.accent, opacity: mode === "fete" ? 0.6 : 0.4 }} />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: middleDuration, repeat: Infinity, ease: "linear" }}
        className="absolute w-[480px] h-[480px] md:w-[760px] md:h-[760px] rounded-full"
        style={{
          border: mode === "noir" ? `1px dashed ${colors.cardBorder}` : `${colors.ringStrokeWidth} solid ${colors.cardBorder}`,
          opacity: mode === "noir" ? 0.06 : 0.1,
          background: mode === "fete" ? `conic-gradient(from 0deg, transparent, ${colors.accent}06, transparent, ${colors.secondary}04, transparent)` : "none",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: innerDuration, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
        style={{ border: `${colors.ringStrokeWidth} solid ${colors.cardBorder}`, opacity: 0.04 }}
      />

      {mode === "fete" && (
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute w-[900px] h-[900px] md:w-[1300px] md:h-[1300px] rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${colors.accent}12, ${colors.secondary}08, ${colors.highlight}10, ${colors.accent}06, transparent, ${colors.accent}12)`,
            opacity: 0.25,
            mask: "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
            WebkitMask: "radial-gradient(circle, transparent 48%, black 49%, black 51%, transparent 52%)",
          }}
        />
      )}

      {/* ======= ORBITING DOT ======= */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] pointer-events-none z-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
            style={{
              width: mode === "fete" ? 10 : 7,
              height: mode === "fete" ? 10 : 7,
              backgroundColor: colors.accent,
              boxShadow: `0 0 16px 4px ${colors.cursorGlow}, 0 0 40px 8px ${colors.cursorGlow}40`,
            }}
          />
        </div>
      </motion.div>

      {/* Second orbiting dot — counter-rotate, different radius */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: orbitDuration * 1.6, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] md:w-[560px] md:h-[560px] pointer-events-none z-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
            style={{
              width: mode === "fete" ? 6 : 4,
              height: mode === "fete" ? 6 : 4,
              backgroundColor: colors.secondary,
              boxShadow: `0 0 12px 3px ${colors.secondary}30`,
            }}
          />
        </div>
      </motion.div>

      {/* Third orbiting dot — slow, large orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration * 2.4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] pointer-events-none z-20"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
            style={{
              width: mode === "fete" ? 5 : 3,
              height: mode === "fete" ? 5 : 3,
              backgroundColor: colors.highlight,
              boxShadow: `0 0 10px 2px ${colors.highlight}40`,
            }}
          />
        </div>
      </motion.div>

      {/* ======= FLOATING DOTS CONSTELLATION — interactive ======= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[15]">
        <FloatingDots
          count={mode === "fete" ? 10 : 7}
          areaW={800}
          areaH={600}
          sizeRange={[2, 5]}
          opacityRange={[0.1, 0.35]}
          speed={mode === "fete" ? 1.2 : 0.7}
          interactive
          className="pointer-events-auto"
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 w-full max-w-[1200px]"
        style={{ y: titleY, opacity: fade, scale: scaleOut }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="font-['Space_Mono'] text-[9px] md:text-[10px] tracking-[0.5em] uppercase"
            style={{ color: colors.textFaded }}>
            {t("heroPreTitle")}
          </span>
        </motion.div>

        {/* Main title — letter-by-letter */}
        <div className="flex items-center justify-center gap-[0.02em]">
          {heroLetters.map((l, i) => (
            <motion.span
              key={`${heroTitle}-${i}`}
              initial={{
                opacity: 0,
                y: mode === "noir" ? 100 : 60,
                rotateX: mode === "noir" ? -40 : 0,
                scale: mode === "fete" ? 0.7 : 1,
                filter: "blur(12px)",
              }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                delay: 0.5 + i * 0.08,
                duration: mode === "noir" ? 1.4 : 0.8,
                ease: mode === "noir" ? [0.16, 1, 0.3, 1] : [0.34, 1.56, 0.64, 1],
              }}
              className="font-['Syne'] text-[clamp(3.5rem,13vw,11rem)] leading-[0.82] tracking-[0.02em] inline-block"
              style={{
                color: l.accent ? colors.accent : colors.text,
                fontWeight: 800,
                textShadow: l.accent
                  ? (mode === "noir" ? `0 0 80px ${colors.cursorGlow}` : `0 4px 0 ${colors.accent}30`)
                  : "none",
              }}
            >
              {l.char}
            </motion.span>
          ))}
          {/* Accent dot after title */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + heroLetters.length * 0.08 + 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-['Syne'] text-[clamp(3.5rem,13vw,11rem)] leading-[0.82] inline-block"
            style={{ color: colors.accent, fontWeight: 800 }}
          >
            .
          </motion.span>
        </div>

        {/* Subtitle — handwritten diagonal overlap */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-[0.6em] md:-mt-[0.8em]"
        >
          <p
            className="font-['Caveat'] text-[clamp(1.8rem,5vw,4rem)] leading-[1] tracking-normal rotate-[-4deg] inline-block"
            style={{ color: colors.accent, fontWeight: 600 }}
          >
            {t("heroSubtitle")}
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mx-auto h-px w-24 origin-center"
          style={{
            background: mode === "noir"
              ? `linear-gradient(to right, transparent, ${colors.accent}, transparent)`
              : `linear-gradient(to right, transparent, ${colors.accent}, ${colors.secondary}80, transparent)`,
          }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/projets")}
            data-cursor-hover
            className="group relative overflow-hidden px-10 py-4 rounded-full font-['Outfit'] text-[12px] tracking-[0.22em] uppercase transition-all duration-700"
            style={{
              border: `${mode === "fete" ? "2px" : "1px"} solid ${colors.accent}`,
              color: colors.accent,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = colors.accent;
              e.currentTarget.style.boxShadow = mode === "noir"
                ? `0 4px 30px ${colors.cursorGlow}` : `0 6px 35px ${colors.accent}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.accent;
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {t("heroCta")}
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: mode === "noir" ? 2.5 : 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10"
          style={{ background: `linear-gradient(to bottom, ${colors.accent}60, transparent)` }}
        />
        <span className="font-['Space_Mono'] text-[7px] tracking-[0.5em] uppercase"
          style={{ color: colors.textFaded }}>
          {t("heroScroll")}
        </span>
      </motion.div>
    </section>
  );
}