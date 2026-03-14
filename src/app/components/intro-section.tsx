import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";

export function IntroSection() {
  const { colors } = useTheme();
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });

  const text = t("introText");
  const accent1 = t("introAccent1");
  const accent2 = t("introAccent2");
  const words = text.split(" ");

  return (
    <section ref={ref} id="about" className="relative px-6 md:px-12 py-32 md:py-52">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-12"
          style={{ color: colors.textFaded }}
        >
          {t("introLabel")}
        </motion.span>

        <p className="flex flex-wrap gap-x-[0.35em] gap-y-1">
          {words.map((word, i) => {
            // Compress all reveals into the first 55% of scroll progress
            // so the full sentence is readable for the remaining 45%
            const revealEnd = 0.55;
            const start = (i / words.length) * revealEnd;
            const end = ((i + 1) / words.length) * revealEnd;
            const isAccent = word === accent1 || word === accent2;
            return (
              <WordReveal
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
                colors={colors}
                isAccent={isAccent}
              />
            );
          })}
        </p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-px w-full origin-left"
          style={{ background: `linear-gradient(to right, ${colors.accent}50, transparent)` }}
        />
      </div>
    </section>
  );
}

function WordReveal({
  word, progress, range, colors, isAccent,
}: {
  word: string; progress: any; range: [number, number]; colors: any; isAccent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const blur = useTransform(progress, range, [3, 0]);
  const filterVal = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span
      className={`font-['Instrument_Serif'] ${isAccent ? "italic" : ""} text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.25] tracking-[-0.01em]`}
      style={{
        opacity, y, filter: filterVal,
        color: isAccent ? colors.accent : colors.text,
      }}
    >
      {word}
    </motion.span>
  );
}
