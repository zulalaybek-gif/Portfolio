import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang, langLabels, langNames, type Lang } from "./lang-context";
import { useNavigate, useLocation } from "react-router";
import logoBlack from "figma:asset/2e3a241ca06545b90820c95e294e5e049b37f3cd.png";
import logoWhite from "figma:asset/20f2664d988498a45beaaedf985a39654f68dce0.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { mode, colors, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: t("navWork"), href: "/projets" },
    { label: t("navAbout"), href: "/#about" },
    { label: t("navServices"), href: "/#services" },
    { label: t("navContact"), href: "/#contact" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0 });
    }
  };

  const handleLang = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  const allLangs: Lang[] = ["fr", "en"];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled ? colors.navBg : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: scrolled ? `1px solid ${colors.glassBorder}` : "1px solid transparent",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => { navigate("/"); window.scrollTo({ top: 0 }); }}
            data-cursor-hover
            className="transition-opacity duration-500 hover:opacity-80"
            aria-label="Zulâl Aybek — Accueil"
          >
            <img
              src={mode === "noir" ? logoWhite : logoBlack}
              alt="Zulâl Aybek"
              className="h-[28px] w-auto"
              loading="eager"
              width="56"
              height="28"
            />
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.6 }}
                onClick={() => handleNav(l.href)}
                data-cursor-hover
                className="font-['Outfit'] text-[11px] tracking-[0.2em] uppercase transition-all duration-400 hover:opacity-100 opacity-50"
                style={{ color: colors.text, fontWeight: 400 }}
              >
                {l.label}
              </motion.button>
            ))}
          </div>

          {/* Right side: Lang + Theme */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                data-cursor-hover
                className="flex items-center gap-1.5 px-3 py-[7px] rounded-full transition-all duration-400"
                style={{
                  border: `1px solid ${langOpen ? colors.accent + "40" : colors.cardBorder}`,
                  backgroundColor: langOpen ? colors.accentBg : "transparent",
                }}
              >
                <span
                  className="font-['Space_Mono'] text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: langOpen ? colors.accent : colors.textFaded }}
                >
                  {langLabels[lang]}
                </span>
                <motion.svg
                  width="8" height="8" viewBox="0 0 8 8"
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.5 }}
                >
                  <path d="M1 2.5L4 5.5L7 2.5" stroke={colors.textFaded} strokeWidth="1" fill="none" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[calc(100%+8px)] right-0 min-w-[140px] rounded-xl overflow-hidden backdrop-blur-xl"
                    style={{
                      backgroundColor: colors.glassBg,
                      border: `1px solid ${colors.glassBorder}`,
                      boxShadow: colors.shadow,
                    }}
                  >
                    {allLangs.map((l, i) => (
                      <motion.button
                        key={l}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.25 }}
                        onClick={() => handleLang(l)}
                        data-cursor-hover
                        className="w-full flex items-center justify-between px-4 py-2.5 transition-all duration-300 group"
                        style={{
                          backgroundColor: l === lang ? `${colors.accent}10` : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (l !== lang) e.currentTarget.style.backgroundColor = `${colors.accent}08`;
                        }}
                        onMouseLeave={(e) => {
                          if (l !== lang) e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <span
                          className="font-['Outfit'] text-[11px] tracking-[0.05em]"
                          style={{
                            color: l === lang ? colors.accent : colors.textMuted,
                            fontWeight: l === lang ? 500 : 300,
                          }}
                        >
                          {langNames[l]}
                        </span>
                        <span
                          className="font-['Space_Mono'] text-[8px] tracking-[0.2em]"
                          style={{
                            color: l === lang ? colors.accent : colors.textFaded,
                            opacity: l === lang ? 1 : 0.6,
                          }}
                        >
                          {langLabels[l]}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              data-cursor-hover
              className="group relative flex items-center gap-3 px-4 py-[7px] rounded-full transition-all duration-500 overflow-hidden"
              style={{
                border: `1px solid ${colors.cardBorder}`,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="relative w-[36px] h-[18px] rounded-full overflow-hidden"
                style={{ backgroundColor: `${colors.accent}15` }}
              >
                <motion.div
                  className="absolute top-[2px] w-[14px] h-[14px] rounded-full"
                  animate={{ left: mode === "noir" ? 2 : 20 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  style={{
                    backgroundColor: colors.accent,
                    boxShadow: `0 0 10px ${colors.cursorGlow}`,
                  }}
                />
              </div>
              <span
                className="font-['Space_Mono'] text-[8px] tracking-[0.3em] uppercase inline-block w-[72px] text-right"
                style={{ color: colors.textFaded }}
              >
                {mode === "noir" ? t("themeNoir") : t("themeFete")}
              </span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile lang */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                data-cursor-hover
                className="font-['Space_Mono'] text-[9px] tracking-[0.15em] px-2.5 py-1.5 rounded-full transition-all duration-300"
                style={{
                  border: `1px solid ${colors.cardBorder}`,
                  color: langOpen ? colors.accent : colors.textFaded,
                }}
              >
                {langLabels[lang]}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+6px)] right-0 min-w-[120px] rounded-xl overflow-hidden backdrop-blur-xl z-50"
                    style={{
                      backgroundColor: colors.glassBg,
                      border: `1px solid ${colors.glassBorder}`,
                      boxShadow: colors.shadow,
                    }}
                  >
                    {allLangs.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLang(l)}
                        data-cursor-hover
                        className="w-full flex items-center justify-between px-3.5 py-2 transition-all duration-200"
                        style={{
                          backgroundColor: l === lang ? `${colors.accent}10` : "transparent",
                        }}
                      >
                        <span
                          className="font-['Outfit'] text-[11px]"
                          style={{ color: l === lang ? colors.accent : colors.textMuted, fontWeight: l === lang ? 500 : 300 }}
                        >
                          {langNames[l]}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile theme */}
            <button
              onClick={toggle}
              data-cursor-hover
              className="font-['Space_Mono'] text-[8px] tracking-[0.2em] px-2.5 py-1.5 rounded-full transition-all duration-300 w-[52px] text-center"
              style={{ border: `1px solid ${colors.cardBorder}`, color: colors.accent }}
            >
              {mode === "noir" ? t("themeNoirShort") : t("themeFeteShort")}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor-hover
              className="flex flex-col gap-[5px] p-2"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block w-5 h-[1.5px] origin-center"
                style={{ backgroundColor: colors.text }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[1.5px]"
                style={{ backgroundColor: colors.text }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block w-5 h-[1.5px] origin-center"
                style={{ backgroundColor: colors.text }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: colors.bg }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav(l.href)}
                className="font-['Syne'] text-[42px] tracking-[0.04em] transition-colors duration-300"
                style={{ color: colors.text, fontWeight: 700 }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}