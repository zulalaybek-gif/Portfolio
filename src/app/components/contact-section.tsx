import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const { colors } = useTheme();
  const { t } = useLang();

  return (
    <section id="contact" className="relative px-6 md:px-12 py-28 md:py-44">
      <div className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${colors.orbA} 0%, transparent 45%)`,
          opacity: 0.5,
        }} />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-10"
            style={{ color: colors.textFaded }}>
            {t("contactLabel")}
          </span>

          <h2 className="text-[clamp(3.5rem,10vw,9rem)] mb-8">
            <span className="font-['Syne'] tracking-[0.02em] leading-[0.85] block"
              style={{ color: colors.text, fontWeight: 800 }}>
              {t("contactTitle")}<span style={{ color: colors.accent }}>.</span>
            </span>
            <span className="font-['Caveat'] text-[0.65em] tracking-normal leading-[0.85] block -mt-[0.3em] rotate-[-4deg]"
              style={{ color: colors.accent, fontWeight: 600 }}>
              {t("contactSub")}
            </span>
          </h2>

          <motion.a
            href="mailto:hello@zulalaybek.com"
            data-cursor-hover
            rel="noopener"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-['Outfit'] text-[12px] tracking-[0.18em] uppercase text-white transition-all duration-600"
            style={{
              backgroundColor: colors.accent,
              fontWeight: 500,
              boxShadow: `0 8px 40px ${colors.cursorGlow}, 0 0 0 1px ${colors.accent}`,
            }}
          >
            {t("contactCta")}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-['Outfit'] text-[13px] mt-10"
            style={{ color: colors.textFaded, fontWeight: 300 }}
          >
            hello@zulalaybek.com
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="block mt-16 text-right font-['Caveat'] text-[13px] tracking-[0.02em] select-none"
            style={{ color: colors.textFaded, fontWeight: 600, opacity: 0.3 }}
          >
            Zulal AYBEK
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}