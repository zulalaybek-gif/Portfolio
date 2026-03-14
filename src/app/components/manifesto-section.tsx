import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { LuminousText } from "./luminous-text";
import { FloatingDots } from "./floating-dots";

export function ManifestoSection() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end -0.1"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [mode === "noir" ? -2 : -4, mode === "noir" ? 2 : 4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.12, 0.75, 0.95], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0, 0.12, 0.75, 0.95], [40, 0, 0, -30]);

  const fullQuoteLine1 = `${t("manifesto1")}`;
  const fullQuoteLine2 = `${t("manifesto2")} ${t("manifestoAccent")}.`;

  return (
    <section ref={ref} className="relative py-44 md:py-64 overflow-hidden">
      <div className="absolute inset-0"
        style={{
          background: mode === "noir"
            ? `radial-gradient(ellipse at center, ${colors.orbA} 0%, transparent 50%)`
            : `radial-gradient(ellipse at center, ${colors.orbA} 0%, ${colors.orbC} 30%, transparent 55%)`,
          opacity: mode === "fete" ? 0.7 : 0.5,
        }} />

      {/* Subtle floating dots constellation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <FloatingDots
          count={6}
          areaW={500}
          areaH={350}
          sizeRange={[2, 4]}
          opacityRange={[0.08, 0.25]}
          speed={0.5}
          interactive={false}
          className="pointer-events-none"
        />
      </div>

      <motion.div className="relative z-10 text-center px-6" style={{ scale }}>
        <motion.div style={{ rotate, opacity: quoteOpacity, y: quoteY }}>
          <span className="font-['Instrument_Serif'] text-[100px] md:text-[180px] leading-none block mb-4"
            style={{ color: `${colors.accent}12` }}>"</span>

          <div className="max-w-3xl mx-auto -mt-16 md:-mt-32">
            <div className="font-['Instrument_Serif'] italic text-[clamp(1.5rem,4.5vw,3.5rem)] leading-[1.35]">
              <LuminousText
                text={fullQuoteLine1}
                baseColor={colors.textMuted}
                glowColor={colors.accent}
                radius={200}
                intensity={mode === "noir" ? 0.8 : 0.6}
                className="font-['Instrument_Serif'] italic text-[clamp(1.5rem,4.5vw,3.5rem)] leading-[1.35]"
              />
              <br />
              <LuminousText
                text={fullQuoteLine2}
                baseColor={colors.textMuted}
                glowColor={colors.accent}
                radius={200}
                intensity={mode === "noir" ? 0.8 : 0.6}
                className="font-['Instrument_Serif'] italic text-[clamp(1.5rem,4.5vw,3.5rem)] leading-[1.35]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}