import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "./theme-context";

/**
 * Recurring visual signature — an abstract flowing curve that evolves across the site.
 * In noir mode: thin, precise, geometric arcs (controlled elegance)
 * In fete mode: thicker, more gestural, organic curves (expressive energy)
 */

// SVG path variants that evolve section to section
const signaturePaths = {
  // Hero: expansive, sweeping arc
  hero: {
    noir: "M0,200 C200,180 350,50 500,120 C650,190 750,30 1000,80 C1250,130 1350,200 1500,160",
    fete: "M0,180 C150,250 300,20 500,150 C700,280 850,40 1000,120 C1150,200 1300,60 1500,180",
  },
  // Divider: flowing wave
  divider: {
    noir: "M0,50 C250,20 500,80 750,50 C1000,20 1250,80 1500,50",
    fete: "M0,40 C200,90 400,10 600,70 C800,130 1000,20 1200,80 C1400,140 1500,40 1500,40",
  },
  // Contact: embracing arc
  contact: {
    noir: "M0,120 C300,20 600,180 900,60 C1200,20 1350,100 1500,80",
    fete: "M0,80 C200,180 450,0 700,140 C950,280 1200,40 1500,120",
  },
};

interface SignatureProps {
  variant: "hero" | "divider" | "contact";
  className?: string;
  flip?: boolean;
}

export function VisualSignature({ variant, className = "", flip = false }: SignatureProps) {
  const { colors, mode } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, colors.signatureOpacity, colors.signatureOpacity, 0]);

  const path = signaturePaths[variant][mode === "noir" ? "noir" : "fete"];

  return (
    <div
      ref={ref}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
    >
      <motion.svg
        viewBox="0 0 1500 300"
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <motion.path
          d={path}
          fill="none"
          stroke={colors.signatureColor}
          strokeWidth={colors.signatureWeight}
          strokeLinecap="round"
          style={{ pathLength }}
        />
        {/* Ghost echo — offset duplicate for depth */}
        <motion.path
          d={path}
          fill="none"
          stroke={colors.signatureColor}
          strokeWidth={colors.signatureWeight * 0.5}
          strokeLinecap="round"
          strokeDasharray={mode === "noir" ? "4 12" : "8 8"}
          style={{ pathLength, opacity: 0.3 }}
          transform="translate(0, 15)"
        />
      </motion.svg>
    </div>
  );
}

/** Small signature flourish for cards/corners */
export function SignatureFlourish({ size = 60 }: { size?: number }) {
  const { colors, mode } = useTheme();
  const path = mode === "noir"
    ? "M5,45 C15,15 35,5 55,25"
    : "M5,50 C20,10 40,40 55,15";

  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className="pointer-events-none">
      <path
        d={path}
        fill="none"
        stroke={colors.signatureColor}
        strokeWidth={colors.signatureWeight}
        strokeLinecap="round"
        opacity={colors.signatureOpacity * 1.5}
      />
    </svg>
  );
}

/** Section divider with signature curve */
export function SignatureDivider() {
  const { colors, mode } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const draw = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const op = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);

  const path = mode === "noir"
    ? "M0,25 Q375,5 750,25 T1500,25"
    : "M0,30 C250,0 500,50 750,20 C1000,-10 1250,50 1500,25";

  return (
    <div ref={ref} className="relative w-full h-12 pointer-events-none select-none my-4 md:my-8">
      <motion.svg
        viewBox="0 0 1500 50"
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: op }}
      >
        <motion.path
          d={path}
          fill="none"
          stroke={colors.accent}
          strokeWidth={colors.signatureWeight}
          strokeLinecap="round"
          style={{ pathLength: draw }}
        />
      </motion.svg>
    </div>
  );
}
