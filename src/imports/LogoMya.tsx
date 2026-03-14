import imgFichier22 from "figma:asset/9291e6ce259c5a348cb2d03faee96d2a1900a48b.png";
import imgPlanDeTravail12 from "figma:asset/2cf585e76a624e180418d538130f7d4a83de2e54.png";

export default function LogoMya() {
  return (
    <div className="bg-white relative size-full" data-name="Logo_MYA">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[95px] leading-[normal] left-[65px] not-italic text-[6px] text-black top-[48px] w-[303px] whitespace-pre-wrap">
        <p className="mb-0">Création de logo — MYA</p>
        <p className="mb-0">Conception d’une identité visuelle pour MYA, une marque de bijoux, à travers la création d’un logo pensé pour traduire un univers à la fois élégant, féminin et raffiné.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Dans une logique de brief client, l’identité pouvait répondre à une recherche de délicatesse, de préciosité et de sobriété, tout en conservant une présence visuelle forte et reconnaissable. Le travail du symbole a été envisagé pour évoquer à la fois la finesse du bijou, l’idée d’ornement et une certaine dimension florale ou précieuse, en cohérence avec l’univers de la marque.</p>
        <p className="mb-0">&nbsp;</p>
        <p>L’enjeu était de créer un logo capable de s’adapter à différents supports de communication, tout en installant une image de marque soignée, intemporelle et identifiable.</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[65px] not-italic text-[6px] text-black top-[24px] w-[66px]">EXPLICATIONS</p>
      <div className="absolute h-[135px] left-[65px] top-[218px] w-[136px]" data-name="Fichier 2 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFichier22} />
      </div>
      <div className="absolute h-[135px] left-[241px] top-[218px] w-[136px]" data-name="Plan de travail 1 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail12} />
      </div>
    </div>
  );
}