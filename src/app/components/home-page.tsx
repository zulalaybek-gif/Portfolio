import { memo, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Navbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { Marquee } from "./marquee";
import { IntroSection } from "./intro-section";
import { ExpertiseSection } from "./expertise-section";
import { SkillsSection } from "./skills-section";
import { ProjectsPreview } from "./projects-preview";
import { ApproachSection } from "./approach-section";
import { ManifestoSection } from "./manifesto-section";
import { ContactSection } from "./contact-section";
import { FooterSection } from "./footer-section";
import { NoiseBackground, GradientOrbs } from "./noise-background";
import { FloatingGrid } from "./floating-elements";
import { WanderingDot } from "./wandering-dot";
import { ScrollProgress } from "./scroll-progress";
import { SEOHead } from "./seo-head";
import { useTheme } from "./theme-context";

export function HomePage() {
  const { colors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-x-hidden transition-colors duration-700"
      style={{ backgroundColor: colors.bg }}
    >
      <SEOHead page="home" />
      <NoiseBackground />
      <GradientOrbs />
      <FloatingGrid />
      <WanderingDot />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <Marquee />
        <IntroSection />
        <ExpertiseSection />
        <SkillsSection />
        <ProjectsPreview />
        <ApproachSection />
        <ManifestoSection />
        <ContactSection />
      </main>
      <FooterSection />
    </motion.div>
  );
}
