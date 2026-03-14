import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { VisualSignature } from "./visual-signature";

/**
 * Bold Manifesto — a powerful creative declaration near the top of the portfolio.
 * Noir mode: measured, poetic, controlled — words appear with deliberate pacing
 * Fete mode: direct, energetic, bold — words slam in with spring energy
 */

export function BoldManifesto() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  const lines = [
    { key: "boldManifestoLine1" as const, style: "strike" as const },
    { key: "boldManifestoLine2" as const, style: "accent" as const },
    { key: "boldManifestoLine3" as const, style: "normal" as const },
    { key: "boldManifestoLine4" as const, style: "accent" as const },
    { key: "boldManifestoLine5" as const, style: "final" as const },
  ];

  // Mode-dependent animation config
  const dur = mode === "noir" ? 1.2 : 0.7;
  const ease = mode === "noir" ? [0.16, 1, 0.3, 1] : [0.34, 1.56, 0.64, 1];
  const stagger = mode === "noir" ? 0.15 : 0.08;

  return (
    <section ref={ref} className="relative px-6 md:px-12 py-28 md:py-44 overflow-hidden">
      {/* Background signature curve */}
      <div className="absolute inset-0 flex items-center">
        <VisualSignature variant="hero" className="w-full h-[200px] md:h-[300px]" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-16"
          style={{ color: colors.textFaded }}
        >
          {t("boldManifestoLabel")}
        </motion.span>

        {/* Manifesto lines */}
        <div className="space-y-2 md:space-y-3">
          {lines.map((line, i) => {
            const text = t(line.key);
            const isAccent = line.style === "accent";
            const isStrike = line.style === "strike";
            const isFinal = line.style === "final";

            return (
              <motion.div
                key={line.key}
                initial={{
                  opacity: 0,
                  x: mode === "noir" ? -40 : 0,
                  y: mode === "noir" ? 0 : 30,
                  filter: "blur(8px)",
                  scale: mode === "fete" ? 0.95 : 1,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: dur,
                  delay: i * stagger,
                  ease,
                }}
                className="relative"
              >
                {isStrike ? (
                  <span className="relative inline-block">
                    <span
                      className="font-['Syne'] text-[clamp(1.8rem,5vw,4rem)] leading-[1.05] tracking-[0.01em]"
                      style={{
                        color: colors.textFaded,
                        fontWeight: 800,
                        textDecoration: "line-through",
                        textDecorationColor: colors.accent,
                        textDecorationThickness: mode === "noir" ? "1px" : "3px",
                      }}
                    >
                      {text}
                    </span>
                  </span>
                ) : isFinal ? (
                  <span
                    className="font-['Syne'] text-[clamp(2rem,6vw,4.8rem)] leading-[1.05] tracking-[0.02em] block mt-4"
                    style={{
                      color: colors.accent,
                      fontWeight: 800,
                      textShadow: mode === "noir"
                        ? `0 0 60px ${colors.cursorGlow}`
                        : "none",
                    }}
                  >
                    {text}
                  </span>
                ) : isAccent ? (
                  <span
                    className={`font-['Syne'] text-[clamp(2rem,6vw,4.8rem)] leading-[1.05] tracking-[0.02em]`}
                    style={{
                      color: colors.text,
                      fontWeight: 800,
                    }}
                  >
                    {text}
                  </span>
                ) : (
                  <span
                    className="font-['Outfit'] text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.6] tracking-[0.02em] block"
                    style={{
                      color: colors.textMuted,
                      fontWeight: 300,
                    }}
                  >
                    {text}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Signature flourish line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px w-48 origin-left"
          style={{
            background: `linear-gradient(to right, ${colors.accent}, ${colors.secondary}40, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
