import { motion } from "motion/react";
import { useTheme } from "./theme-context";
import { useLang } from "./lang-context";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

const featured = [
  { id: 1, title: "Projet I", cat: "Direction Artistique",
    img: "https://images.unsplash.com/photo-1770745560263-a8fc696de90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBtb29keSUyMHRleHR1cmUlMjBhcnRpc3RpY3xlbnwxfHx8fDE3NzMwNzk1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "aspect-[16/10]", span: "md:col-span-7" },
  { id: 2, title: "Projet II", cat: "Branding",
    img: "https://images.unsplash.com/photo-1721549369164-2fd07f795ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbW9ja3VwJTIwZWxlZ2FudCUyMGRhcmt8ZW58MXx8fHwxNzczMDc5NTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "aspect-[4/5]", span: "md:col-span-5" },
  { id: 3, title: "Projet III", cat: "Print & Édition",
    img: "https://images.unsplash.com/photo-1695634621121-691d54259d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBtYWdhemluZSUyMGRlc2lnbiUyMGxheW91dCUyMG1pbmltYWx8ZW58MXx8fHwxNzczMDc5NTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "aspect-[4/5]", span: "md:col-span-5" },
  { id: 4, title: "Projet IV", cat: "Vidéo & Motion",
    img: "https://images.unsplash.com/photo-1678250991250-beb4b9cb297b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBkYXJrfGVufDF8fHx8MTc3MzA3OTU2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    aspect: "aspect-[16/10]", span: "md:col-span-7" },
];

export function ProjectsPreview() {
  const { colors, mode } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase block mb-5"
              style={{ color: colors.textFaded }}>
              {t("projLabel")}
            </span>
            <h2 className="tracking-[0.01em]">
              <span className="font-['Syne'] text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] block"
                style={{ color: colors.text, fontWeight: 800 }}>
                {t("projTitle1")}<span style={{ color: colors.accent }}>.</span>
              </span>
              <span className="font-['Caveat'] text-[clamp(2.8rem,6.5vw,5rem)] leading-[0.85] block -mt-[0.4em] rotate-[-4deg] origin-left"
                style={{ color: colors.accent, fontWeight: 600 }}>
                {t("projTitle2")}
              </span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={() => { navigate("/projets"); window.scrollTo({ top: 0 }); }}
            data-cursor-hover
            className="flex items-center gap-2 font-['Outfit'] text-[11px] tracking-[0.2em] uppercase transition-all duration-300 self-start md:self-end"
            style={{ color: colors.accent, fontWeight: 400 }}
          >
            {t("projSeeAll")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-2xl overflow-hidden ${p.span}`}
              data-cursor-hover
            >
              <div className={`relative ${p.aspect} overflow-hidden`}>
                <ImageWithFallback src={p.img} alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: mode === "noir"
                      ? "linear-gradient(to top, rgba(7,6,14,0.88) 0%, rgba(7,6,14,0.2) 40%, transparent 100%)"
                      : "linear-gradient(to top, rgba(26,22,50,0.85) 0%, rgba(26,22,50,0.15) 40%, transparent 100%)",
                  }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <span className="font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase block mb-2"
                    style={{ color: `${colors.accent}b0` }}>{p.cat}</span>
                  <h3 className="font-['Syne'] text-[clamp(1.3rem,2.5vw,1.8rem)] tracking-[0.02em] text-white"
                    style={{ fontWeight: 700 }}>{p.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-600 translate-y-4 group-hover:translate-y-0 shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}