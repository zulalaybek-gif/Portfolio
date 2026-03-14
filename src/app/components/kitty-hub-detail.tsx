import { useEffect } from "react";
import { useTheme } from "./theme-context";
import { Navbar } from "./navbar";
import { FooterSection } from "./footer-section";
import { NoiseBackground, GradientOrbs } from "./noise-background";
import { FloatingGrid } from "./floating-elements";
import { WanderingDot } from "./wandering-dot";
import { ScrollProgress } from "./scroll-progress";
import { SEOHead } from "./seo-head";

export function KittyHubDetailPage() {
  const { colors } = useTheme();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ backgroundColor: colors.bg }}>
      <SEOHead page="projets" />
      <NoiseBackground />
      <GradientOrbs />
      <FloatingGrid />
      <WanderingDot />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto" />
      </main>
      <FooterSection />
    </div>
  );
}
