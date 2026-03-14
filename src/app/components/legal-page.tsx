import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { Navbar } from "./navbar";
import { FooterSection } from "./footer-section";
import { NoiseBackground, GradientOrbs } from "./noise-background";
import { SEOHead } from "./seo-head";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function MentionsLegalesPage() {
  const { colors } = useTheme();
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen transition-colors duration-700"
      style={{ backgroundColor: colors.bg }}
    >
      <SEOHead page="mentions" />
      <NoiseBackground />
      <GradientOrbs />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <article className="max-w-[800px] mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/")}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mb-14 transition-colors"
            style={{ color: colors.textFaded, fontWeight: 400 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "fr" ? "Retour" : "Back"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-['Syne'] text-[clamp(2.5rem,6vw,4rem)] tracking-[0.01em] mb-12"
              style={{ color: colors.text, fontWeight: 800 }}
            >
              {lang === "fr" ? "Mentions légales" : "Legal Notice"}
              <span style={{ color: colors.accent }}>.</span>
            </h1>

            <div
              className="font-['Outfit'] text-[14px] leading-[1.8] space-y-6"
              style={{ color: colors.textMuted, fontWeight: 300 }}
            >
              <p>
                {lang === "fr"
                  ? "Cette page est un placeholder pour les mentions légales. Elle sera complétée avec les informations juridiques obligatoires (identité de l'éditeur, hébergeur, propriété intellectuelle, etc.)."
                  : "This page is a placeholder for legal notices. It will be completed with mandatory legal information (publisher identity, hosting provider, intellectual property, etc.)."}
              </p>
            </div>
          </motion.div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}

export function ConfidentialitePage() {
  const { colors } = useTheme();
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen transition-colors duration-700"
      style={{ backgroundColor: colors.bg }}
    >
      <SEOHead page="confidentialite" />
      <NoiseBackground />
      <GradientOrbs />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <article className="max-w-[800px] mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/")}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase mb-14 transition-colors"
            style={{ color: colors.textFaded, fontWeight: 400 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "fr" ? "Retour" : "Back"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-['Syne'] text-[clamp(2.5rem,6vw,4rem)] tracking-[0.01em] mb-12"
              style={{ color: colors.text, fontWeight: 800 }}
            >
              {lang === "fr" ? "Confidentialité" : "Privacy Policy"}
              <span style={{ color: colors.accent }}>.</span>
            </h1>

            <div
              className="font-['Outfit'] text-[14px] leading-[1.8] space-y-6"
              style={{ color: colors.textMuted, fontWeight: 300 }}
            >
              <p>
                {lang === "fr"
                  ? "Cette page est un placeholder pour la politique de confidentialité. Elle sera complétée avec les informations relatives à la collecte et au traitement des données personnelles, conformément au RGPD."
                  : "This page is a placeholder for the privacy policy. It will be completed with information about the collection and processing of personal data, in accordance with GDPR."}
              </p>
            </div>
          </motion.div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
