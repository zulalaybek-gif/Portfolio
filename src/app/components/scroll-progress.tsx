import { useEffect, useState, useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useTheme } from "./theme-context";

/**
 * A minimal, premium scroll progress indicator on the right side.
 * Uses the visual language of the portfolio: thin line, accent dots,
 * tick marks reminiscent of the hero ring system.
 */
export const ScrollProgress = memo(function ScrollProgress() {
  const { colors, mode } = useTheme();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25 });
  const [visible, setVisible] = useState(false);
  const [sections, setSections] = useState<string[]>([]);

  // Show only after scrolling a bit
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect sections
  useEffect(() => {
    const sectionIds = ["about", "services", "approach", "contact"];
    setSections(sectionIds);
  }, []);

  const trackHeight = 120;
  const dotY = useTransform(smoothProgress, [0, 1], [0, trackHeight]);

  // Tick marks along the track — mimicking the ring ticks
  const tickCount = 12;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => ({
    y: (i / tickCount) * trackHeight,
    isMajor: i === 0 || i === tickCount || i === Math.floor(tickCount / 2),
  }));

  return (
    <motion.div
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0"
      aria-hidden="true"
      initial={{ opacity: 0, x: 10 }}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 10,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Track container */}
      <div className="relative" style={{ height: trackHeight, width: 20 }}>
        {/* Central line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px"
          style={{
            height: trackHeight,
            background: `linear-gradient(to bottom, transparent, ${colors.cardBorder}, ${colors.cardBorder}, transparent)`,
          }}
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: tick.y,
              width: tick.isMajor ? 8 : 4,
              height: 1,
              marginLeft: tick.isMajor ? -4 : -2,
              backgroundColor: tick.isMajor ? colors.accent : colors.textFaded,
              opacity: tick.isMajor ? 0.3 : 0.12,
            }}
          />
        ))}

        {/* Progress fill line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px origin-top"
          style={{
            height: trackHeight,
            background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}60)`,
            scaleY: smoothProgress,
            transformOrigin: "top",
          }}
        />

        {/* Active dot — glowing position indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ y: dotY }}
        >
          <div className="relative -translate-x-[0.5px] -translate-y-1/2">
            {/* Glow */}
            <div
              className="absolute -inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.cursorGlow}, transparent 70%)`,
                opacity: mode === "noir" ? 0.6 : 0.4,
              }}
            />
            {/* Core dot */}
            <div
              className="relative rounded-full"
              style={{
                width: mode === "fete" ? 5 : 4,
                height: mode === "fete" ? 5 : 4,
                backgroundColor: colors.accent,
                boxShadow: `0 0 6px 1px ${colors.cursorGlow}`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});