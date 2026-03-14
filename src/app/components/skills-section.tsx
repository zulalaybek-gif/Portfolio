import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";

const tools = [
  { name: "Photoshop", abbr: "Ps" },
  { name: "Illustrator", abbr: "Ai" },
  { name: "InDesign", abbr: "Id" },
  { name: "Premiere Pro", abbr: "Pr" },
  { name: "After Effects", abbr: "Ae" },
  { name: "Lightroom", abbr: "Lr" },
  { name: "Figma", abbr: "Fi" },
];

export function SkillsSection() {
  const { colors } = useTheme();
  const { t } = useLang();

  return (
    <section className="relative px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-12"
          style={{ color: colors.textFaded }}
        >
          {t("skillsLabel")}
        </motion.span>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.abbr}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
              className="group flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md transition-colors duration-200"
              style={{
                border: `1px solid ${colors.cardBorder}`,
                backgroundColor: colors.cardBg,
              }}
              data-cursor-hover
            >
              <span
                className="font-['Syne'] text-[16px] tracking-wider transition-colors duration-300"
                style={{ color: colors.accent, fontWeight: 700 }}
              >
                {tool.abbr}
              </span>
              <span
                className="font-['Outfit'] text-[12px] tracking-wide"
                style={{ color: colors.textMuted, fontWeight: 300 }}
              >
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}