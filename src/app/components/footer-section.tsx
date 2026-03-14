import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { useNavigate } from "react-router";
import logoBlack from "figma:asset/2e3a241ca06545b90820c95e294e5e049b37f3cd.png";
import logoWhite from "figma:asset/20f2664d988498a45beaaedf985a39654f68dce0.png";

export function FooterSection() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();

  const legalLinks = [
    { label: t("footerMentions"), path: "/mentions-legales" },
    { label: t("footerPrivacy"), path: "/confidentialite" },
  ];

  return (
    <footer
      className="relative px-6 md:px-12 py-8"
      style={{ borderTop: `1px solid ${colors.cardBorder}` }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={() => { navigate("/"); window.scrollTo({ top: 0 }); }}
          data-cursor-hover
          className="transition-opacity duration-300 hover:opacity-70"
          aria-label="Zulâl Aybek — Accueil"
        >
          <img
            src={mode === "noir" ? logoWhite : logoBlack}
            alt="Zulâl Aybek"
            className="h-[22px] w-auto opacity-50"
            loading="lazy"
            width="44"
            height="22"
          />
        </button>

        <p
          className="font-['Space_Mono'] text-[10px] tracking-[0.15em]"
          style={{ color: colors.textFaded }}
        >
          &copy; 2026
        </p>

        <nav aria-label="Legal" className="flex gap-6">
          {legalLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); window.scrollTo({ top: 0 }); }}
              data-cursor-hover
              className="font-['Outfit'] text-[11px] tracking-wider transition-colors duration-300 hover:opacity-80"
              style={{ color: colors.textFaded, fontWeight: 300 }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
