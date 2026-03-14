import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { FloatingDots } from "./floating-dots";

export function ApproachSection() {
  const { colors, mode } = useTheme();
  const { t } = useLang();

  const steps = [
    { num: "01", title: t("step1Title"), sub: t("step1Sub") },
    { num: "02", title: t("step2Title"), sub: t("step2Sub") },
    { num: "03", title: t("step3Title"), sub: t("step3Sub") },
    { num: "04", title: t("step4Title"), sub: t("step4Sub") },
  ];

  const ease = mode === "noir" ? [0.16, 1, 0.3, 1] : [0.34, 1.56, 0.64, 1];
  const dur = mode === "noir" ? 0.6 : 0.5;

  return (
    <section id="approach" className="relative px-6 md:px-12 py-24 md:py-36">
      {/* Subtle floating dots — approach section */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-60">
        <FloatingDots
          count={5}
          areaW={300}
          areaH={400}
          sizeRange={[2, 4]}
          opacityRange={[0.06, 0.2]}
          speed={0.4}
          interactive={false}
          className="pointer-events-none"
        />
      </div>

      <div className="max-w-[1200px] mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-16"
          style={{ color: colors.textFaded }}
        >
          {t("approachLabel")}
        </motion.span>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: colors.cardBorder }}
        >
          {steps.map((s, i) => (
            <motion.div key={s.num}
              initial={{
                opacity: 0,
                y: mode === "noir" ? 30 : 0,
                x: mode === "fete" ? 30 : 0,
                scale: mode === "fete" ? 0.95 : 1,
                filter: "blur(6px)",
              }}
              whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: dur, delay: i * 0.08, ease }}
              className="group p-8 md:p-10 transition-all duration-700 relative"
              style={{ backgroundColor: colors.bg }}
              data-cursor-hover
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: mode === "noir"
                    ? `radial-gradient(ellipse at 50% 100%, ${colors.accent}08 0%, transparent 70%)`
                    : `radial-gradient(ellipse at 50% 50%, ${colors.accent}0c 0%, ${colors.secondary}04 40%, transparent 70%)`,
                }} />

              <span className="font-['Space_Mono'] text-[10px] tracking-[0.3em] block mb-8 relative z-10"
                style={{ color: colors.textFaded }}>{s.num}</span>
              <h3 className="font-['Syne'] text-[1.6rem] tracking-[0.01em] mb-3 relative z-10 group-hover:translate-x-1 transition-transform duration-600"
                style={{ color: colors.text, fontWeight: 700 }}>{s.title}</h3>
              <p className="font-['Outfit'] text-[12px] leading-[1.6] relative z-10"
                style={{ color: colors.textMuted, fontWeight: 300 }}>{s.sub}</p>

              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-[1px] w-4 h-px z-20"
                  style={{ backgroundColor: colors.accent, opacity: 0.2 }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}