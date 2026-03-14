import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en";

export const langLabels: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
};

export const langNames: Record<Lang, string> = {
  fr: "Français",
  en: "English",
};

const t = {
  // Navbar
  navWork: { fr: "Projets", en: "Work" },
  navAbout: { fr: "À propos", en: "About" },
  navServices: { fr: "Services", en: "Services" },
  navContact: { fr: "Contact", en: "Contact" },
  themeNoir: { fr: "CRÉPUSCULE", en: "TWILIGHT" },
  themeFete: { fr: "ÉCLAT", en: "RADIANCE" },
  themeNoirShort: { fr: "CRÉP.", en: "TWI." },
  themeFeteShort: { fr: "ÉCLAT", en: "RAD." },

  // Hero
  heroPreTitle: { fr: "Direction Artistique & Design Graphique", en: "Art Direction & Graphic Design" },
  heroTitle: { fr: "CRÉER", en: "CREATE" },
  heroSubtitle: { fr: "l'inoubliable", en: "the unforgettable" },
  heroCta: { fr: "Voir les projets", en: "Explore Work" },
  heroScroll: { fr: "DÉFILER", en: "SCROLL" },

  // Marquee
  marquee1: { fr: "Direction Artistique", en: "Art Direction" },
  marquee2: { fr: "Design Graphique", en: "Graphic Design" },
  marquee3: { fr: "Identité Visuelle", en: "Visual Identity" },
  marquee4: { fr: "Print & Édition", en: "Print & Editorial" },
  marquee5: { fr: "Motion Design", en: "Motion Design" },
  marquee6: { fr: "Photographie", en: "Photography" },
  marquee7: { fr: "Brand Content", en: "Brand Content" },
  marquee8: { fr: "Communication", en: "Communication" },
  marquee9: { fr: "Web Design", en: "Web Design" },

  // Intro
  introLabel: { fr: "— Philosophie", en: "— Philosophy" },
  introText: {
    fr: "Transformer les idées en expériences visuelles puissantes, mémorables et singulières.",
    en: "Transforming ideas into powerful, memorable and singular visual experiences.",
  },
  introAccent1: { fr: "puissantes,", en: "powerful," },
  introAccent2: { fr: "singulières.", en: "singular." },

  // Expertise
  expertLabel: { fr: "— Services", en: "— Services" },
  expertTitle1: { fr: "SAVOIR", en: "EXPERT" },
  expertTitle2: { fr: "faire", en: "ise" },
  expertDesc: {
    fr: "Une expertise pluridisciplinaire\nau service de votre vision créative.",
    en: "Multidisciplinary expertise\nserving your creative vision.",
  },
  svc1Title: { fr: "Design\nGraphique", en: "Graphic\nDesign" },
  svc1Desc: { fr: "Identités visuelles, logos, univers de marque...", en: "Visual identities, logos, brand universes..." },
  svc2Title: { fr: "Direction\nArtistique", en: "Art\nDirection" },
  svc2Desc: { fr: "Concepts créatifs, chartes graphiques, créations de logos, cohérence visuelle...", en: "Creative concepts, brand guidelines, logo creation, visual coherence..." },
  svc3Title: { fr: "Print &\nÉdition", en: "Print &\nEditorial" },
  svc3Desc: { fr: "Magazines, brochures, affiches, flyers, CV...", en: "Magazines, brochures, posters, flyers, CVs..." },
  svc4Title: { fr: "Vidéo &\nMotion", en: "Video &\nMotion" },
  svc4Desc: { fr: "Tournage, montage, motion design, contenus dynamiques...", en: "Filming, editing, motion design, dynamic content..." },
  svc5Title: { fr: "Photo", en: "Photo" },
  svc5Desc: { fr: "Shootings, retouches, direction photo...", en: "Shoots, retouching, photo direction..." },
  svc6Title: { fr: "Brand\nContent", en: "Brand\nContent" },
  svc6Desc: { fr: "Stratégie de contenu, storytelling visuel...", en: "Content strategy, visual storytelling..." },
  svc7Title: { fr: "Community\nManagement", en: "Community\nManagement" },
  svc7Desc: { fr: "Réseaux sociaux, création de contenu, stratégie...", en: "Social media, content creation, strategy..." },
  svc8Title: { fr: "Web\nDesign", en: "Web\nDesign" },
  svc8Desc: { fr: "Sites vitrines, portfolios, expériences digitales sur-mesure...", en: "Showcase sites, portfolios, bespoke digital experiences..." },

  // Skills
  skillsLabel: { fr: " Outils", en: "— Tools" },

  // Projects Preview
  projLabel: { fr: "— Sélection", en: "— Selected Work" },
  projTitle1: { fr: "PRO", en: "PRO" },
  projTitle2: { fr: "jets", en: "jects" },
  projSeeAll: { fr: "Voir tout", en: "See all" },

  // Approach
  approachLabel: { fr: "— Processus", en: "— Process" },
  step1Title: { fr: "Écouter", en: "Listen" },
  step1Sub: { fr: "Comprendre votre vision", en: "Understand your vision" },
  step2Title: { fr: "Concevoir", en: "Design" },
  step2Sub: { fr: "Explorer les possibles", en: "Explore possibilities" },
  step3Title: { fr: "Affiner", en: "Refine" },
  step3Sub: { fr: "Itérer vers l'excellence", en: "Iterate towards excellence" },
  step4Title: { fr: "Livrer", en: "Deliver" },
  step4Sub: { fr: "Résultat impeccable", en: "Flawless result" },

  // Manifesto
  manifesto1: { fr: "Le design n'est pas ce que l'on voit,", en: "Design is not what you see," },
  manifesto2: { fr: "c'est ce que l'on", en: "it's what you" },
  manifestoAccent: { fr: "ressent", en: "feel" },

  // Contact
  contactLabel: { fr: "— Collaborer", en: "— Collaborate" },
  contactTitle: { fr: "CRÉONS", en: "LET'S CREATE" },
  contactSub: { fr: "ensemble", en: "together" },
  contactCta: { fr: "Démarrer un projet", en: "Start a project" },

  // Footer
  footerMentions: { fr: "Mentions", en: "Legal" },
  footerPrivacy: { fr: "Confidentialité", en: "Privacy" },

  // Projects Page
  projBack: { fr: "Retour", en: "Back" },
  projPageTitle: { fr: "WORK", en: "WORK" },
  projPageDesc: { fr: "Sélection de travaux — placeholders pour vos projets.", en: "Selected works — placeholders for your projects." },
  filterAll: { fr: "Tous", en: "All" },
  filterDA: { fr: "Direction Artistique", en: "Art Direction" },
  filterBrand: { fr: "Branding", en: "Branding" },
  filterPrint: { fr: "Print", en: "Print" },
  filterVideo: { fr: "Vidéo", en: "Video" },
  filterPhoto: { fr: "Photo", en: "Photo" },
  filterWeb: { fr: "Web", en: "Web" },

  // Bold Manifesto
  boldManifestoLabel: { fr: "— Manifeste", en: "— Manifesto" },
  boldManifestoLine1: {
    fr: "Faire joli.",
    en: "Make it pretty.",
  },
  boldManifestoLine2: {
    fr: "CRÉER CE QUI MARQUE.",
    en: "CREATE WHAT STAYS.",
  },
  boldManifestoLine3: {
    fr: "Chaque image porte une intention. Chaque choix visuel est un acte de sens.",
    en: "Every image carries intention. Every visual choice is an act of meaning.",
  },
  boldManifestoLine4: {
    fr: "PAS DE COMPROMIS.",
    en: "NO COMPROMISE.",
  },
  boldManifestoLine5: {
    fr: "L'OBSESSION DU DÉTAIL.",
    en: "THE OBSESSION OF DETAIL.",
  },

  // Project Detail Page — shared
  projDetailLabelYear: { fr: "ANNÉE", en: "YEAR" },
  projDetailLabelRole: { fr: "RÔLE", en: "ROLE" },
  projDetailLabelCategory: { fr: "CATÉGORIE", en: "CATEGORY" },
  projDetailLabelAbout: { fr: "— À propos du projet", en: "— About the project" },
  projDetailNotFound: { fr: "Projet introuvable", en: "Project not found" },
  projDetailAllProjects: { fr: "Tous les projets", en: "All projects" },
  projDetailNext: { fr: "Projet suivant", en: "Next project" },
  projDetailPrev: { fr: "Projet précédent", en: "Previous project" },

  // Project Detail — Triptyque
  projDetailTriTitle: { fr: "TRIPTYQUE", en: "TRIPTYCH" },
  projDetailTriSubtitle: { fr: "spectacle vivant", en: "live performance" },
  projDetailTriCategory: { fr: "Direction Artistique", en: "Art Direction" },
  projDetailTriYear: { fr: "2024", en: "2024" },
  projDetailTriRole: { fr: "Directrice Artistique", en: "Art Director" },
  projDetailTriDesc: {
    fr: "Création de deux propositions de triptyques composés de trois affiches, en version statique et animée, à partir d'une œuvre issue de la programmation ARTE en scène.",
    en: "Creation of two triptych proposals composed of three posters, in static and animated versions, based on a work from the ARTE en scène programming.",
  },
  projDetailTriObjective: {
    fr: "Ce projet avait pour objectif de traduire visuellement l'énergie, le mouvement, l'émotion et la grâce du spectacle vivant à travers une proposition graphique forte, sensible et accrocheuse. La réalisation reposait sur un travail d'expérimentation autour de l'image, de la typographie et du mouvement, tout en intégrant les informations essentielles liées à l'événement.",
    en: "This project aimed to visually translate the energy, movement, emotion and grace of live performance through a bold, sensitive and eye-catching graphic proposal. The execution relied on experimentation with image, typography and movement, while integrating essential event information.",
  },
  projDetailTriProp1: { fr: "PROPOSITION 1", en: "PROPOSAL 1" },
  projDetailTriProp2: { fr: "PROPOSITION 2", en: "PROPOSAL 2" },

  // Project Detail — MYA
  projDetailMyaTitle: { fr: "MYA", en: "MYA" },
  projDetailMyaSubtitle: { fr: "Création de logo pour une marque de bijoux", en: "Logo creation for a jewelry brand" },
  projDetailMyaCategory: { fr: "Branding", en: "Branding" },
  projDetailMyaYear: { fr: "2026", en: "2026" },
  projDetailMyaRole: { fr: "Directrice Artistique", en: "Art Director" },
  projDetailMyaDesc: {
    fr: "Pensé pour une marque de bijoux, ce projet de logo s'inscrit dans un univers à la fois élégant, délicat et raffiné. L'objectif était de concevoir un signe capable de refléter la préciosité et la finesse propres à cet univers, tout en installant une identité visuelle claire et mémorable.",
    en: "Designed for a jewelry brand, this logo project is rooted in an elegant, delicate and refined universe. The goal was to create a mark capable of reflecting the preciousness and finesse inherent to this world, while establishing a clear and memorable visual identity.",
  },
  projDetailMyaDirection: {
    fr: "Le travail s'est orienté vers un symbole à la fois ornemental, harmonieux et structuré, pouvant évoquer une dimension florale ou précieuse, en cohérence avec l'image de la marque.",
    en: "The work was oriented towards a symbol that is both ornamental, harmonious and structured, evoking a floral or precious dimension, consistent with the brand image.",
  },
  projDetailMyaObjective: {
    fr: "L'enjeu était de créer un logo distinctif, lisible et adaptable, pensé pour vivre sur différents supports — du packaging aux supports de communication imprimés et digitaux.",
    en: "The challenge was to create a distinctive, readable and adaptable logo, designed to live across different media — from packaging to printed and digital communication materials.",
  },
  projDetailMyaLogos: { fr: "LOGO", en: "LOGO" },
  projDetailMyaLogoPhotos: { fr: "MISES EN SITUATION", en: "APPLICATIONS" },
  projDetailMyaLogoAnalysis: { fr: "ANALYSE DU SIGNE", en: "SIGN ANALYSIS" },
  projDetailMyaApplications: { fr: "APPLICATIONS VISUELLES", en: "VISUAL APPLICATIONS" },
  projDetailMyaDirLabel: { fr: "Direction visuelle", en: "Visual Direction" },
  projDetailMyaObjLabel: { fr: "Enjeu du projet", en: "Project Challenge" },
  projDetailMyaConstruction: { fr: "CONSTRUCTION DU LOGO", en: "LOGO CONSTRUCTION" },
  projDetailMyaVersions: { fr: "VERSIONS DU LOGO", en: "LOGO VERSIONS" },
  projDetailMyaImages: { fr: "IMAGES", en: "IMAGES" },
  projDetailMyaIntentionTitle: { fr: "Intention du logo", en: "Logo Intention" },
  projDetailMyaIntentionText: {
    fr: "Le logo MYA a été conçu pour incarner l'essence d'une marque de bijoux — élégance, finesse et raffinement. Chaque courbe du symbole a été pensée pour refléter la préciosité de l'univers joaillier, tout en affirmant une identité visuelle forte et immédiatement reconnaissable.",
    en: "The MYA logo was designed to embody the essence of a jewelry brand — elegance, finesse and refinement. Every curve of the symbol was crafted to reflect the preciousness of the jewelry world, while asserting a strong and immediately recognizable visual identity.",
  },
  projDetailMyaConstructionTitle: { fr: "Construction du signe", en: "Sign Construction" },
  projDetailMyaConstructionText: {
    fr: "Le signe repose sur une construction géométrique rigoureuse, mêlant cercles, axes de symétrie et proportions harmonieuses. Cette structure confère au logo à la fois délicatesse et stabilité — un équilibre entre la légèreté ornementale et la solidité d'un signe maîtrisé.",
    en: "The mark relies on a rigorous geometric construction, blending circles, axes of symmetry and harmonious proportions. This structure gives the logo both delicacy and stability — a balance between ornamental lightness and the solidity of a mastered sign.",
  },
  projDetailMyaLectureTitle: { fr: "Lecture visuelle", en: "Visual Reading" },
  projDetailMyaLectureText: {
    fr: "Le symbole peut évoquer une forme florale, ornementale ou précieuse — une lecture ouverte qui renforce l'ancrage dans l'univers de la marque. Cette ambiguïté visuelle volontaire invite à la contemplation et inscrit le logo dans un registre à la fois poétique et luxueux.",
    en: "The symbol can evoke a floral, ornamental or precious form — an open reading that reinforces the connection to the brand's universe. This intentional visual ambiguity invites contemplation and places the logo in a register that is both poetic and luxurious.",
  },
  projDetailMyaAdaptTitle: { fr: "Adaptabilité", en: "Adaptability" },
  projDetailMyaAdaptText: {
    fr: "Conçu pour vivre sur des supports variés — packaging, gravure, supports imprimés et digitaux — le logo préserve sa lisibilité et son impact à toutes les échelles. Sa simplicité structurelle lui permet de s'adapter sans perdre ni son élégance, ni sa mémorabilité.",
    en: "Designed to live across various media — packaging, engraving, printed and digital supports — the logo preserves its readability and impact at all scales. Its structural simplicity allows it to adapt without losing either its elegance or its memorability.",
  },
  projDetailMyaProcessTitle: { fr: "Processus de construction", en: "Construction Process" },
  projDetailMyaProcessText: {
    fr: "La construction du logo repose sur un système de guides géométriques précis — cercles concentriques, lignes directrices et points d'ancrage — qui définissent chaque courbe et chaque proportion du signe. Cette approche assure une harmonie visuelle parfaite et une cohérence structurelle à chaque échelle.",
    en: "The logo's construction relies on a precise system of geometric guides — concentric circles, guidelines and anchor points — that define every curve and proportion of the mark. This approach ensures perfect visual harmony and structural consistency at every scale.",
  },

  projDetailMyaClosingTitle: { fr: "Résultat final", en: "Final Result" },
  projDetailMyaClosingText: {
    fr: "L'identité visuelle de MYA incarne l'élégance et la précision qui définissent la marque. Du logo aux supports physiques, chaque élément a été pensé pour créer un univers cohérent, raffiné et mémorable — à la hauteur de l'exigence d'une maison de joaillerie contemporaine.",
    en: "MYA's visual identity embodies the elegance and precision that define the brand. From the logo to physical materials, every element was designed to create a cohesive, refined and memorable universe — worthy of a contemporary fine jewelry house.",
  },

  // Project Detail — ROMA
  projDetailRomaTitle: { fr: "ROMA", en: "ROMA" },
  projDetailRomaSubtitle: { fr: "Mairie de Paris", en: "City of Paris" },
  projDetailRomaCategory: { fr: "Direction Artistique", en: "Art Direction" },
  projDetailRomaYear: { fr: "2024", en: "2024" },
  projDetailRomaRole: { fr: "Directrice Artistique", en: "Art Director" },
  projDetailRomaDesc: {
    fr: "Pensé pour la Mairie de Paris, ce projet consistait à réaliser une série d'affiches à partir de photographies prises sur le terrain, dans le 6ᵉ arrondissement. L'objectif était de transformer ce travail de repérage et de prise de vue en une proposition visuelle capable de valoriser le patrimoine architectural du quartier à travers un langage graphique sobre, structuré et contemporain.",
    en: "Designed for the City of Paris, this project involved creating a series of posters from photographs taken on location in the 6th arrondissement. The goal was to transform this fieldwork and photography into a visual proposal capable of highlighting the neighbourhood's architectural heritage through a sober, structured and contemporary graphic language.",
  },
  projDetailRomaDirection: {
    fr: "Le projet s'est construit autour d'un dialogue entre photographie, composition éditoriale et typographie, avec une attention particulière portée au cadrage, à la hiérarchie des informations et à la mise en valeur des formes architecturales.",
    en: "The project was built around a dialogue between photography, editorial composition and typography, with particular attention to framing, information hierarchy and the enhancement of architectural forms.",
  },
  projDetailRomaObjective: {
    fr: "Concevoir une série d'affiches cohérentes et lisibles, capables de traduire l'identité d'un territoire tout en proposant une interprétation visuelle pensée pour un support de communication institutionnel.",
    en: "Design a coherent and readable series of posters, capable of conveying the identity of a territory while offering a visual interpretation tailored to an institutional communication medium.",
  },
  projDetailRomaAffiches: { fr: "AFFICHES", en: "POSTERS" },

  // Project Detail — Maker Week
  mwTitle: { fr: "MAKER WEEK", en: "MAKER WEEK" },
  mwSubtitle: {
    fr: "événement étudiant à impact positif",
    en: "student event for positive impact",
  },
  mwCategory: { fr: "Direction Artistique", en: "Art Direction" },
  mwYear: { fr: "2022", en: "2022" },
  mwRole: { fr: "Directrice Artistique", en: "Art Director" },
  mwDesc: {
    fr: "Conçue comme la première édition de l'événement, cette Maker Week a fait l'objet d'une direction artistique développée entièrement de zéro. L'objectif était de construire une identité visuelle forte pour accompagner un format inédit, réunissant des étudiants autour d'une centaine de projets à impact positif, menés en collaboration avec différents partenaires et technologies.",
    en: "Conceived as the event's inaugural edition, this Maker Week was the subject of an art direction developed entirely from scratch. The goal was to build a strong visual identity to accompany an unprecedented format, bringing together students around a hundred positive-impact projects, carried out in collaboration with various partners and technologies.",
  },
  mwDirection: {
    fr: "J'ai imaginé l'ensemble de l'univers graphique de l'événement, depuis le logo jusqu'à ses nombreuses déclinaisons. Le projet a donné lieu à la création d'un large éventail de supports : affiches, flyers, dépliants, posters, kakemonos, signalétique, photocalls, visuels pour écrans, bannières mail, présentations visuelles, supports pour les productions étudiantes, ainsi que des badges permettant d'attester la participation des élèves aux ateliers suivis.",
    en: "I designed the entire graphic universe of the event, from the logo to its many variations. The project led to the creation of a wide range of materials: posters, flyers, leaflets, kakemonos, signage, photocalls, screen visuals, email banners, visual presentations, student production materials, and badges to certify student participation in workshops.",
  },
  mwObjective: {
    fr: "Développer un système visuel complet, cohérent et fonctionnel, capable d'accompagner l'événement à toutes ses étapes. Au-delà de l'identité elle-même, le projet impliquait de penser une direction artistique suffisamment solide pour structurer l'expérience, faciliter la communication et donner une véritable présence à cette première édition.",
    en: "Develop a complete, coherent and functional visual system, capable of supporting the event at every stage. Beyond the identity itself, the project required designing an art direction solid enough to structure the experience, facilitate communication and give a genuine presence to this first edition.",
  },
  mwSectionAffiche: { fr: "AFFICHE PRINCIPALE", en: "MAIN POSTER" },
  mwSectionWorkshop: { fr: "POSTERS ATELIERS", en: "WORKSHOP POSTERS" },
  mwSectionDepliant: { fr: "DÉPLIANT", en: "LEAFLET" },
  mwSectionSignage: { fr: "SIGNALÉTIQUE", en: "SIGNAGE" },
  mwSectionPhotos: { fr: "PHOTOS DE L'ÉVÉNEMENT", en: "EVENT PHOTOS" },
  mwQuoteIdentity: {
    fr: "Un univers graphique créé de zéro — vibrant, structuré, pensé pour donner une vraie présence à cette première édition.",
    en: "A graphic universe created from scratch — vibrant, structured, designed to give a genuine presence to this first edition.",
  },
  mwQuoteSpace: {
    fr: "L'identité prend corps dans l'espace — chaque support prolonge l'expérience.",
    en: "The identity takes shape in physical space — each medium extends the experience.",
  },
  mwQuoteColors: {
    fr: "La diversité par la couleur — des teintes vives, mouvantes, qui traduisent l'énergie collective et l'élan créatif.",
    en: "Diversity through colour — vivid, shifting hues that convey collective energy and creative momentum.",
  },
  mwNoteColors: {
    fr: "Chaque poster d'atelier explore un contraste fort entre des couleurs vibrantes et une typographie structurée. Cette richesse chromatique reflète la pluralité des profils, des projets et des technologies réunis autour d'un même événement.",
    en: "Each workshop poster explores a strong contrast between vibrant colours and structured typography. This chromatic richness reflects the plurality of profiles, projects and technologies brought together around a single event.",
  },
  mwNoteDepliant: {
    fr: "Le dépliant condense l'identité de l'événement en un format physique : programme, partenaires, informations pratiques. Un support pensé pour accompagner les participants tout au long de la semaine.",
    en: "The leaflet condenses the event's identity into a physical format: programme, partners, practical information. A medium designed to accompany participants throughout the week.",
  },
  mwNoteKakemono: {
    fr: "Signalétique verticale pensée pour guider et identifier les espaces de l'événement, tout en prolongeant l'univers graphique dans l'espace physique.",
    en: "Vertical signage designed to guide and identify event spaces, while extending the graphic universe into the physical environment.",
  },
  mwLabelAffiche: { fr: "AFFICHE ÉVÉNEMENT", en: "EVENT POSTER" },
  mwNoteAffiche: {
    fr: "L'affiche principale rassemble les informations essentielles dans une composition dense et lisible. Elle fonctionne comme point d'entrée visuel de l'événement — un condensé de l'identité.",
    en: "The main poster gathers essential information into a dense and readable composition. It serves as the event's visual entry point — a distillation of its identity.",
  },
  mwQuoteUnity: {
    fr: "Une identité pensée pour unifier — un seul langage visuel, une multitude de supports, une expérience cohérente du premier au dernier jour.",
    en: "An identity designed to unify — one visual language, a multitude of media, a coherent experience from the first to the last day.",
  },
  mwNotePhotos: {
    fr: "Au-delà de la direction artistique, l'événement a pris vie. Ces images témoignent de l'énergie, de la collaboration et de l'élan collectif qui ont marqué cette première édition.",
    en: "Beyond the art direction, the event came to life. These images capture the energy, collaboration and collective momentum that defined this first edition.",
  },

  // Project Detail — No Sense
  nsTitle: { fr: "MZW — No Sense", en: "MZW — No Sense" },
  nsSubtitle: { fr: "groupe de musique electro", en: "electro music group" },
  nsCategory: { fr: "Identité Visuelle", en: "Visual Identity" },
  nsYear: { fr: "2022", en: "2022" },
  nsRole: { fr: "Directrice Artistique", en: "Art Director" },
  nsDesc: {
    fr: "Pensé pour un groupe de musique techno / electro, ce projet consistait à concevoir un système identitaire global, capable de se déployer sur plusieurs supports : logo, pochette de vinyle, affiche A3, déclinaisons sur textile, player mobile et animation de logo. L'objectif était de construire un univers visuel fort, lisible et immédiatement identifiable, en cohérence avec l'énergie du genre musical.",
    en: "Designed for a techno / electro music group, this project involved creating a comprehensive identity system, capable of being deployed across multiple formats: logo, vinyl cover, A3 poster, textile applications, mobile player and logo animation. The goal was to build a strong, readable and immediately recognizable visual universe, in line with the energy of the musical genre.",
  },
  nsDirection: {
    fr: "L'identité s'articule autour d'un langage graphique très typographique, expérimental et immersif, pensé pour créer un impact visuel fort. Le travail combine une composition centrale dense, une palette vibrante et lumineuse, ainsi qu'un traitement des formes qui évoque à la fois la puissance sonore, la résonance et la montée en intensité propres à l'univers electro.",
    en: "The identity is built around a highly typographic, experimental and immersive graphic language, designed to create a strong visual impact. The work combines a dense central composition, a vibrant and luminous palette, and a treatment of forms that evokes the sonic power, resonance and rising intensity characteristic of the electro universe.",
  },
  nsTranslation: {
    fr: "Les contrastes colorés et les dégradés traduisent une sensation de matière sonore en mouvement, tandis que la structure symétrique renforce l'idée d'un système visuel construit, presque pulsé, en lien avec le rythme. Le traitement typographique cherche à faire dialoguer lisibilité et impact, avec une écriture qui devient elle-même image. L'ensemble a été pensé pour retranscrire une esthétique à la fois digitale, énergique et immersive, en cohérence avec l'univers musical du projet.",
    en: "The colour contrasts and gradients convey a sensation of sonic matter in motion, while the symmetrical structure reinforces the idea of a constructed, almost pulsating visual system, connected to rhythm. The typographic treatment seeks a dialogue between readability and impact, with lettering that becomes image itself. The whole was designed to transcribe an aesthetic that is at once digital, energetic and immersive, in line with the project's musical universe.",
  },
  nsObjective: {
    fr: "Développer une identité capable de fonctionner sur des supports variés tout en conservant une vraie cohérence d'ensemble. Le projet demandait de trouver un équilibre entre créativité typographique, visibilité, force iconographique et capacité de déploiement, afin de faire exister un univers de marque complet.",
    en: "Develop an identity capable of working across varied formats while maintaining true overall coherence. The project required finding a balance between typographic creativity, visibility, iconographic strength and deployment capacity, in order to bring a complete brand universe to life.",
  },
  nsSectionLogo: { fr: "IDENTITÉ — LOGO", en: "IDENTITY — LOGO" },
  nsSectionIdentity: { fr: "CONSTRUCTION DE L'IDENTITÉ", en: "IDENTITY CONSTRUCTION" },
  nsSectionAffiche: { fr: "AFFICHE A3", en: "A3 POSTER" },
  nsSectionAnimation: { fr: "ANIMATION DU LOGO", en: "LOGO ANIMATION" },
  nsSectionTextile: { fr: "DÉCLINAISONS TEXTILE", en: "TEXTILE APPLICATIONS" },
  nsSectionPlayer: { fr: "PLAYER MOBILE", en: "MOBILE PLAYER" },
  nsSectionVinyle: { fr: "POCHETTE DE VINYLE", en: "VINYL COVER" },
  nsSectionMockups: { fr: "MISE EN SITUATION", en: "IN CONTEXT" },
  nsNoteLogo: {
    fr: "Le monogramme se construit sur une géométrie angulaire et volumétrique, évoquant à la fois la profondeur d'un espace sonore et la rigueur d'un système modulaire.",
    en: "The monogram is built on angular and volumetric geometry, evoking both the depth of a sonic space and the rigour of a modular system.",
  },
  nsNoteAnimation: {
    fr: "Le logo prend vie en animation, révélant sa construction progressive et renforçant l'identité de la marque dans les formats digitaux.",
    en: "The logo comes alive through animation, revealing its progressive construction and reinforcing the brand identity in digital formats.",
  },
  nsNotePlayer: {
    fr: "Le player mobile prolonge l'identité dans l'espace digital, offrant une expérience d'écoute cohérente avec l'univers visuel du groupe.",
    en: "The mobile player extends the identity into the digital space, offering a listening experience consistent with the group's visual universe.",
  },
  nsNoteVinyle: {
    fr: "La pochette de vinyle condense l'univers graphique en un format iconique — un objet à la fois visuel et sonore.",
    en: "The vinyl cover condenses the graphic universe into an iconic format — an object that is both visual and sonic.",
  },
  nsIdNameTitle: { fr: "Construction du nom", en: "Name Construction" },
  nsIdName: {
    fr: "Le nom MZW reprend les initiales des prénoms des trois membres de l'équipe. Réduit à cette forme courte et compacte, il devient un signe graphique en lui-même : direct, mémorisable et facilement identifiable dans l'univers du groupe.",
    en: "The name MZW takes the initials of the three team members' first names. Reduced to this short and compact form, it becomes a graphic sign in itself: direct, memorable and easily identifiable within the group's universe.",
  },
  nsIdBaselineTitle: { fr: "Baseline", en: "Baseline" },
  nsIdBaseline: {
    fr: "La baseline \"No Sense\" prolonge cette logique en introduisant une part de décalage et d'ambiguïté. Elle évoque quelque chose de moins frontal, plus abstrait, presque insaisissable, ce qui renforce la dimension expérimentale et mystérieuse du projet. Dans cet univers, le langage n'est pas seulement informatif : il participe aussi à l'atmosphère.",
    en: "The baseline \"No Sense\" extends this logic by introducing a touch of offset and ambiguity. It evokes something less frontal, more abstract, almost elusive, which reinforces the experimental and mysterious dimension of the project. In this universe, language is not just informative: it also participates in the atmosphere.",
  },
  nsIdButterflyTitle: { fr: "Choix du papillon", en: "The Butterfly Choice" },
  nsIdButterfly: {
    fr: "Le mot-signe a été construit de manière à faire émerger une silhouette proche du papillon, à travers une composition symétrique et déployée. Ce choix permet d'introduire une lecture plus symbolique dans l'identité visuelle : le papillon évoque à la fois la transformation, la légèreté, le mouvement et une forme de vibration visuelle, en résonance avec l'univers de la musique electro. Sa structure ouvre également un terrain de jeu graphique intéressant, entre impact typographique et forme presque organique.",
    en: "The word-mark was constructed to bring out a silhouette close to a butterfly, through a symmetrical and deployed composition. This choice introduces a more symbolic reading into the visual identity: the butterfly evokes transformation, lightness, movement and a form of visual vibration, in resonance with the electro music universe. Its structure also opens an interesting graphic playground, between typographic impact and almost organic form.",
  },
  nsIdIntentionTitle: { fr: "Intention", en: "Intention" },
  nsIdIntention: {
    fr: "L'ensemble a été pensé comme une identité à la fois construite, expressive et légèrement énigmatique. Le travail joue sur la tension entre lisibilité et expérimentation, entre structure et sensation, afin de créer un univers visuel immersif, cohérent avec une esthétique musicale plus digitale, intense et singulière.",
    en: "The whole was designed as an identity that is at once constructed, expressive and slightly enigmatic. The work plays on the tension between readability and experimentation, between structure and sensation, in order to create an immersive visual universe, coherent with a more digital, intense and singular musical aesthetic.",
  },
  nsQuoteImpact: {
    fr: "Un univers où le son devient image — chaque support prolonge l'intensité de la musique.",
    en: "A universe where sound becomes image — each medium extends the intensity of the music.",
  },
  nsQuoteSystem: {
    fr: "Un système visuel pensé pour vibrer — du vinyle au textile, de l'écran à l'affiche.",
    en: "A visual system designed to resonate — from vinyl to textile, from screen to poster.",
  },

  // ── Tarots & Oracles ──
  toTitle: { fr: "Tarots & Oracles", en: "Tarots & Oracles" },
  toSubtitle: { fr: "Redesign de flyer événementiel", en: "Event Flyer Redesign" },
  toCategory: { fr: "Direction Artistique", en: "Art Direction" },
  toYear: { fr: "2026", en: "2026" },
  toRole: { fr: "Graphiste / Directrice artistique", en: "Graphic Designer / Art Director" },
  toDesc: {
    fr: "Ce projet consistait à repenser le flyer d'un événement autour des tarots et oracles, à partir d'un support existant. L'objectif était de retravailler sa forme pour lui donner une identité plus forte, plus cohérente et plus immersive, tout en conservant la clarté des informations liées au programme.",
    en: "This project involved rethinking the flyer for an event centered around tarot and oracle readings, starting from an existing design. The goal was to reshape the format to give it a stronger, more coherent and immersive identity, while preserving the clarity of the program information.",
  },
  toDirection: {
    fr: "Le redesign s'est orienté vers un univers plus mystique, structuré et sophistiqué, en lien avec l'imaginaire ésotérique du sujet. Le travail a porté sur la hiérarchie typographique, la composition, l'ambiance générale et l'intégration de codes graphiques plus symboliques, afin de renforcer le caractère du support sans nuire à sa lisibilité.",
    en: "The redesign moved towards a more mystical, structured and sophisticated universe, in line with the esoteric imagery of the subject. The work focused on typographic hierarchy, composition, overall mood and integration of more symbolic graphic codes, to strengthen the identity of the medium without compromising readability.",
  },
  toObjective: {
    fr: "Transformer un flyer initialement très informatif en un support plus incarné visuellement, capable de mieux capter l'attention, de valoriser le thème de l'événement et d'installer une expérience graphique plus cohérente.",
    en: "Transform an initially very informative flyer into a more visually embodied medium, capable of better capturing attention, enhancing the event's theme and establishing a more coherent graphic experience.",
  },
  toApproach: {
    fr: "Deux propositions distinctes ont été développées, chacune explorant une manière différente d'interpréter le même contenu. L'une mettait davantage l'accent sur une lecture plus directe et structurée, tandis que l'autre assumait une approche plus graphique et immersive, en poussant davantage l'univers visuel.",
    en: "Two distinct proposals were developed, each exploring a different way of interpreting the same content. One placed more emphasis on a more direct and structured reading, while the other took a more graphic and immersive approach, pushing the visual universe further.",
  },
  toSectionOriginal: { fr: "SUPPORT ORIGINAL", en: "ORIGINAL DESIGN" },
  toSectionRedesign: { fr: "PROPOSITIONS DE REDESIGN", en: "REDESIGN PROPOSALS" },
  toSectionProp1: { fr: "PROPOSITION 1", en: "PROPOSAL 1" },
  toSectionProp2: { fr: "PROPOSITION 2", en: "PROPOSAL 2" },
  toOriginalNote: {
    fr: "Le support d'origine présentait les informations de manière fonctionnelle, mais manquait de cohérence visuelle et d'identité graphique propre à l'univers de l'événement.",
    en: "The original design presented information functionally, but lacked visual coherence and a graphic identity fitting the event's universe.",
  },
  toProp1Title: { fr: "Lecture structurée", en: "Structured Reading" },
  toProp1Desc: {
    fr: "Cette première direction privilégie la lisibilité et la hiérarchie de l'information. Le programme est présenté de manière claire et ordonnée, dans un cadre visuel qui emprunte à l'esthétique ésotérique sans compromettre l'accès au contenu. Les ornements dorés encadrent le texte avec élégance.",
    en: "This first direction prioritizes readability and information hierarchy. The program is presented clearly and in an orderly fashion, within a visual framework that borrows from esoteric aesthetics without compromising access to content. Gold ornaments frame the text with elegance.",
  },
  toProp2Title: { fr: "Immersion graphique", en: "Graphic Immersion" },
  toProp2Desc: {
    fr: "Cette seconde proposition pousse l'univers visuel plus loin en assumant pleinement le caractère mystique du sujet. La typographie décorative, les éléments géométriques sacrés et le jeu de couleurs or sur noir créent une atmosphère plus enveloppante, où le flyer devient un objet visuel à part entière.",
    en: "This second proposal pushes the visual universe further by fully embracing the mystical character of the subject. Decorative typography, sacred geometric elements and the gold-on-black color play create a more enveloping atmosphere, where the flyer becomes a visual object in its own right.",
  },
  toNoteHierarchy: {
    fr: "La hiérarchie typographique a été entièrement repensée — chaque niveau d'information trouve sa place sans effort, guidant le regard naturellement à travers le support.",
    en: "The typographic hierarchy was completely rethought — every level of information finds its place effortlessly, guiding the eye naturally through the medium.",
  },
  toNoteUniverse: {
    fr: "L'identité graphique s'ancre dans un vocabulaire visuel mystique et précieux, à la hauteur du sujet traité.",
    en: "The graphic identity is rooted in a mystical and precious visual vocabulary, matching the subject matter.",
  },
  toQuote: {
    fr: "Donner à un support de communication la présence visuelle que son sujet mérite.",
    en: "Give a communication medium the visual presence its subject deserves.",
  },

  // ── La Croisière de la Danse ──
  cdTitle: { fr: "La croisière de la danse", en: "The Dance Cruise" },
  cdSubtitle: { fr: "Redesign de flyer événementiel", en: "Event Flyer Redesign" },
  cdCategory: { fr: "Direction Artistique", en: "Art Direction" },
  cdYear: { fr: "2026", en: "2026" },
  cdRole: { fr: "Graphiste / Directrice artistique", en: "Graphic Designer / Art Director" },
  cdDesc: {
    fr: "Ce projet consistait à repenser le flyer d'un événement autour d'une croisière dédiée à la danse, à partir d'un support existant. L'objectif était de transformer une communication très chargée et visuellement datée en une proposition plus claire, plus cohérente et plus attractive, capable de mieux traduire l'univers du voyage et de l'événement.",
    en: "This project involved rethinking the flyer for a dance-themed cruise event, starting from an existing design. The goal was to transform an overloaded and visually dated communication into a clearer, more coherent and more attractive proposal, better able to convey the travel and event universe.",
  },
  cdDirection: {
    fr: "Le redesign s'est orienté vers une approche plus fraîche, lisible et contemporaine, en s'appuyant sur un langage visuel inspiré de l'univers maritime. La composition a été repensée autour d'une illustration plus épurée, d'une hiérarchie d'information plus claire et d'une palette dominée par des tons bleus et turquoise, en cohérence avec l'idée de croisière, d'évasion et de fluidité.",
    en: "The redesign moved towards a fresher, more readable and contemporary approach, drawing on a visual language inspired by the maritime universe. The composition was rethought around a more refined illustration, a clearer information hierarchy and a palette dominated by blue and turquoise tones, in keeping with the idea of cruising, escape and fluidity.",
  },
  cdApproach: {
    fr: "Le projet visait à conserver les informations essentielles tout en leur donnant une forme beaucoup plus harmonieuse. Le travail a consisté à simplifier la lecture, alléger l'ensemble et créer une ambiance plus identifiable, avec une iconographie plus cohérente et une mise en page plus structurée.",
    en: "The project aimed to retain essential information while giving it a much more harmonious form. The work consisted of simplifying the reading, lightening the overall design and creating a more identifiable atmosphere, with more coherent iconography and a more structured layout.",
  },
  cdObjective: {
    fr: "Transformer un flyer initialement dense et peu harmonisé en un support de communication plus incarné, capable de mieux capter l'attention et de valoriser le thème de l'événement à travers une direction visuelle plus forte.",
    en: "Transform an initially dense and poorly harmonized flyer into a more embodied communication medium, capable of better capturing attention and enhancing the event's theme through a stronger visual direction.",
  },
  cdSectionOriginal: { fr: "SUPPORT ORIGINAL", en: "ORIGINAL DESIGN" },
  cdSectionRedesign: { fr: "REDESIGN", en: "REDESIGN" },
  cdOriginalNote: {
    fr: "Le support d'origine présentait un surplus d'éléments visuels et textuels, sans hiérarchie claire. Les typographies, couleurs et visuels entraient en concurrence, rendant la lecture confuse et l'identité graphique difficile à percevoir.",
    en: "The original design presented an overload of visual and textual elements, with no clear hierarchy. Typefaces, colors and visuals competed with each other, making reading confusing and the graphic identity difficult to perceive.",
  },
  cdNoteHierarchy: {
    fr: "La hiérarchie de lecture a été entièrement restructurée — les informations clés émergent naturellement, sans bruit visuel.",
    en: "The reading hierarchy was completely restructured — key information emerges naturally, without visual noise.",
  },
  cdNotePalette: {
    fr: "La nouvelle palette de bleus et turquoises ancre le support dans l'univers maritime, renforçant immédiatement l'idée de voyage et de fraîcheur.",
    en: "The new palette of blues and turquoises anchors the medium in the maritime universe, immediately reinforcing the idea of travel and freshness.",
  },
  cdNoteIllustration: {
    fr: "L'illustration épurée du navire devient le point focal — un visuel fort, identifiable, qui remplace l'accumulation de photos par une identité graphique cohérente.",
    en: "The refined ship illustration becomes the focal point — a strong, identifiable visual that replaces the accumulation of photos with a coherent graphic identity.",
  },
  cdQuote: {
    fr: "Simplifier sans appauvrir — donner au voyage la clarté visuelle qu'il mérite.",
    en: "Simplify without diminishing — give the journey the visual clarity it deserves.",
  },

  // ── KH / Kitty Hub ──
  khTitle: { fr: "KH / Kitty Hub", en: "KH / Kitty Hub" },
  khSubtitle: { fr: "Concept marketplace pour cartes Pokémon — achat, vente et estimation intelligente de valeur", en: "Marketplace concept for Pokémon cards — buying, selling and intelligent value estimation" },
  khCategory: { fr: "Produit Digital / UX", en: "Digital Product / UX" },
  khYear: { fr: "2024", en: "2024" },
  khRole: { fr: "Product Designer / DA / Stratégie", en: "Product Designer / AD / Strategy" },
  khIntro: {
    fr: "Kitty Hub est un concept de produit digital pensé comme une marketplace dédiée aux cartes Pokémon. Le projet a été conçu pour répondre aux besoins des collectionneurs et acheteurs en créant une plateforme qui va au-delà de la simple logique d'annonces, avec une expérience utilisateur plus structurée, intuitive et intelligente. L'objectif était de repenser l'écosystème marketplace de cartes à travers une vision produit plus claire, combinant utilisabilité, confiance, positionnement stratégique et estimation de valeur assistée.",
    en: "Kitty Hub is a digital product concept designed as a marketplace dedicated to Pokémon cards. The project was built to address the needs of collectors and buyers by creating a platform that goes beyond simple listing logic, with a more structured, intuitive and intelligent user experience. The goal was to rethink the card marketplace ecosystem through a clearer product vision, combining usability, trust, strategic positioning and assisted value estimation.",
  },
  khContextTitle: { fr: "Contexte du projet", en: "Project Context" },
  khContextDesc: {
    fr: "Le marché des cartes Pokémon représente plus d'un milliard d'euros à l'échelle mondiale, avec plus de 50 millions de collectionneurs dans le monde et 4 millions en France. Un marché en hausse de 20%, porté par une communauté passionnée de 18-36 ans qui dépense en moyenne 100€/mois. Malgré cette dynamique, les plateformes existantes restent fragmentées, peu intuitives et manquent de fiabilité sur l'estimation des cartes.",
    en: "The Pokémon card market represents over one billion euros globally, with more than 50 million collectors worldwide and 4 million in France. A market growing 20%, driven by a passionate community aged 18-36 spending on average €100/month. Despite this momentum, existing platforms remain fragmented, unintuitive and lack reliability in card estimation.",
  },
  khProblemTitle: { fr: "Problématique", en: "Problem" },
  khProblemDesc: {
    fr: "Comment créer un écosystème digital qui combine marketplace, estimation intelligente et communauté de confiance pour les collectionneurs de cartes Pokémon ?",
    en: "How to create a digital ecosystem that combines marketplace, intelligent estimation and trusted community for Pokémon card collectors?",
  },
  khVisionTitle: { fr: "Vision produit", en: "Product Vision" },
  khVisionDesc: {
    fr: "Kitty Hub ne se limite pas à l'achat et la vente. La plateforme intègre un système d'estimation communautaire en temps réel, une logique de confiance via l'authentification des cartes, et une expérience gamifiée qui fidélise les utilisateurs. Le tout accessible sur Desktop, iPad et Smartphone, avec une communauté active sur Discord.",
    en: "Kitty Hub goes beyond buying and selling. The platform integrates a real-time community estimation system, a trust logic through card authentication, and a gamified experience that retains users. All accessible on Desktop, iPad and Smartphone, with an active Discord community.",
  },
  khTargetTitle: { fr: "Cible / Utilisateurs", en: "Target / Users" },
  khPersona1: {
    fr: "Xavier — Jeune cadre dynamique, célibataire. Recherche une plateforme conviviale et informative pour enrichir sa collection. Difficulté à faire estimer ses cartes de manière fiable.",
    en: "Xavier — Dynamic young executive, single. Looking for a user-friendly and informative platform to grow his collection. Difficulty getting reliable card estimates.",
  },
  khPersona2: {
    fr: "Océane — Agent de maîtrise et mère de deux enfants. Cherche à partager ses intérêts avec ses enfants et à se connecter avec d'autres parents collectionneurs. Difficulté à trouver des plateformes adaptées.",
    en: "Océane — Team leader and mother of two. Looking to share her interests with her children and connect with other collecting parents. Difficulty finding suitable platforms.",
  },
  khGoldenTitle: { fr: "Golden Circle", en: "Golden Circle" },
  khWhy: {
    fr: "Pour connaître la valeur de nos cartes en temps réel en toute sécurité par la communauté.",
    en: "To know the value of our cards in real time, safely, through the community.",
  },
  khHow: {
    fr: "Sur différents supports tel que Desktop, iPad ou Smartphone, avec la communauté sur Discord.",
    en: "On various devices such as Desktop, iPad or Smartphone, with the community on Discord.",
  },
  khWhat: {
    fr: "Création de comptes, recherche, estimation, achat et vente de cartes Pokémon.",
    en: "Account creation, search, estimation, buying and selling Pokémon cards.",
  },
  khSolutionTitle: { fr: "Solution", en: "Solution" },
  khFeature1: { fr: "Sécurité", en: "Security" },
  khFeature2: { fr: "Précision des estimations", en: "Estimation Accuracy" },
  khFeature3: { fr: "Authentification des cartes", en: "Card Authentication" },
  khFeature4: { fr: "Interface conviviale", en: "User-friendly Interface" },
  khFeature5: { fr: "Transactions des cartes", en: "Card Transactions" },
  khFeature6: { fr: "Communauté active", en: "Active Community" },
  khFeature7: { fr: "Contenu exclusif", en: "Exclusive Content" },
  khFeature8: { fr: "Gamification et récompenses", en: "Gamification & Rewards" },
  khKeyFeaturesTitle: { fr: "Fonctionnalités clés", en: "Key Features" },
  khEstimation: {
    fr: "Estimation précise des cartes Pokémon — Utilisation d'algorithmes avancés et analyse minutieuse des données du marché pour fournir des estimations précises.",
    en: "Precise Pokémon card estimation — Using advanced algorithms and thorough market data analysis to provide accurate estimates.",
  },
  khAuthenticity: {
    fr: "Garantie d'authenticité pour toutes les transactions — Mise en place de protocoles stricts de vérification pour chaque carte échangée.",
    en: "Authenticity guarantee for all transactions — Implementation of strict verification protocols for every card exchanged.",
  },
  khCommunity: {
    fr: "Interaction communautaire dynamique — Forums de discussion, espaces d'échange et fonctionnalités sociales entre passionnés.",
    en: "Dynamic community interaction — Discussion forums, exchange spaces and social features between enthusiasts.",
  },
  khIdentityTitle: { fr: "Identité visuelle", en: "Visual Identity" },
  khColorPalette: { fr: "Palette de couleurs", en: "Color Palette" },
  khTypography: { fr: "Typographie", en: "Typography" },
  khLogoSystem: { fr: "Système de logo", en: "Logo System" },
  khBusinessTitle: { fr: "Modèle économique", en: "Business Model" },
  khBusinessDesc: {
    fr: "Le modèle repose sur les abonnements premium, les commissions sur transactions, le contenu exclusif, la monétisation publicitaire ciblée et les programmes de fidélisation — créant un écosystème économique durable autour de la passion des collectionneurs.",
    en: "The model relies on premium subscriptions, transaction commissions, exclusive content, targeted advertising monetization and loyalty programs — creating a sustainable economic ecosystem around collectors' passion.",
  },
  khStrategyTitle: { fr: "Stratégie d'acquisition", en: "Acquisition Strategy" },
  khStrategyDesc: {
    fr: "Campagnes ciblées, réseaux sociaux, SEO, parrainage, avis clients, influenceurs — une approche multi-canal pour construire et fidéliser la communauté.",
    en: "Targeted campaigns, social media, SEO, referrals, customer reviews, influencers — a multi-channel approach to build and retain the community.",
  },
  khQuote: {
    fr: "Donner aux collectionneurs l'outil qu'ils méritent — intelligent, fiable et communautaire.",
    en: "Give collectors the tool they deserve — intelligent, reliable and community-driven.",
  },
  khInterfaceTitle: { fr: "Interface & Expérience", en: "Interface & Experience" },
  khMarketTitle: { fr: "Données marché", en: "Market Data" },

  // ── KH extended ──
  khProblemPoints: {
    fr: "Difficulté à estimer la valeur des cartes · Navigation complexe sur les plateformes existantes · Manque de confiance dans les annonces · Absence d'outils de gestion de collection · Expérience utilisateur fragmentée et peu intuitive",
    en: "Difficulty estimating card value · Complex navigation on existing platforms · Lack of trust in listings · No collection management tools · Fragmented and unintuitive user experience",
  },
  khVisionExtended: {
    fr: "Le concept Kitty Hub se positionne comme un hybride entre un outil marketplace pratique, une plateforme orientée collectionneurs et un produit digital à identité visuelle forte. L'intention est de combiner fonctionnalité marketplace, culture de la collection, navigation intuitive, logique de données et estimation, et une identité émotionnelle et visuelle plus marquée.",
    en: "The Kitty Hub concept positions itself as a hybrid between a practical marketplace tool, a collector-oriented platform and a digital product with a strong visual identity. The intention is to combine marketplace functionality, collection culture, intuitive navigation, data and estimation logic, and a more distinctive emotional and visual identity.",
  },
  khTargetDesc: {
    fr: "Le produit cible des collectionneurs passionnés, des acheteurs occasionnels cherchant à comprendre le marché, et des vendeurs souhaitant une plateforme fiable. L'audience principale se situe entre 18 et 36 ans, avec un rapport fort à la culture Pokémon et au monde digital.",
    en: "The product targets passionate collectors, occasional buyers looking to understand the market, and sellers seeking a reliable platform. The core audience is between 18 and 36 years old, with a strong connection to Pokémon culture and the digital world.",
  },
  khUxTitle: { fr: "Expérience utilisateur", en: "User Experience" },
  khUxDesc: {
    fr: "L'expérience utilisateur a été pensée pour créer un parcours clair et rassurant. Chaque écran guide l'utilisateur à travers la recherche, l'estimation, l'achat et la gestion de sa collection. La hiérarchie visuelle, la lisibilité des informations de cartes et la fluidité de navigation sont au cœur de chaque décision de design.",
    en: "The user experience was designed to create a clear and reassuring journey. Each screen guides the user through search, estimation, purchase and collection management. Visual hierarchy, card information readability and navigation fluidity are at the core of every design decision.",
  },
  khIdentityDesc: {
    fr: "L'identité visuelle de Kitty Hub n'est pas uniquement esthétique — elle sert aussi à positionner le projet, construire la mémorabilité et créer une connexion émotionnelle plus forte avec l'audience. L'univers sombre de l'interface crée une atmosphère premium et tech-driven. Les dégradés vifs et les accents saturés apportent un impact visuel contemporain. Les références au monde Pokémon restent ludiques mais contrôlées. Le design system soutient à la fois l'utilisabilité et une identité forte.",
    en: "Kitty Hub's visual identity is not purely aesthetic — it also serves to position the project, build memorability and create a stronger emotional connection with the audience. The dark interface universe creates a premium, tech-driven atmosphere. Vivid gradients and saturated accents bring contemporary visual impact. Pokémon world references remain playful but controlled. The design system supports both usability and a strong identity.",
  },
  khDesignChoicesTitle: { fr: "Choix graphiques", en: "Design Choices" },
  khDesignChoicesDesc: {
    fr: "Les choix graphiques ont été pensés pour rendre le produit plus premium, le distinguer des marketplaces génériques, créer un univers à la fois tech et collectionnable, soutenir la lisibilité et la hiérarchie, et renforcer le sentiment de confiance et de désirabilité.",
    en: "The graphic choices were designed to make the product feel more premium, distinguish it from generic marketplaces, create a universe that is both tech-oriented and collectible, support readability and hierarchy, and reinforce the feeling of trust and desirability.",
  },
  khPositionTitle: { fr: "Positionnement", en: "Positioning" },
  khPositionDesc: {
    fr: "Ce qui donne sa valeur au concept : une expérience utilisateur plus claire, une logique produit plus forte, un positionnement plus premium, un écosystème plus intelligent pour les collectionneurs et une expérience marketplace plus engageante.",
    en: "What gives the concept its value: a clearer user experience, stronger product logic, more premium positioning, a smarter ecosystem for collectors and a more engaging marketplace experience.",
  },
  khCardsTitle: { fr: "Cards pour l'application", en: "Cards for the Application" },
  khVisualElementsTitle: { fr: "Éléments visuels", en: "Visual Elements" },
  khWebTitle: { fr: "Interface web", en: "Web Interface" },
  khAppTitle: { fr: "Parcours utilisateur", en: "User Journey" },
  khPrintTitle: { fr: "Communication Print & Digital", en: "Print & Digital Communication" },
  khMockupsTitle: { fr: "Mises en situation", en: "Mockups" },
  khBentoTitle: { fr: "Présentation Bento UI", en: "Bento UI Presentation" },
  khRoadmapTitle: { fr: "Roadmap", en: "Roadmap" },
  khTeamTitle: { fr: "Équipe", en: "Team" },
  khClosingNote: {
    fr: "KH / Kitty Hub est avant tout un exercice de vision produit — une démonstration de la capacité à penser un écosystème digital complet, de la stratégie à l'interface, de l'identité visuelle à l'expérience utilisateur.",
    en: "KH / Kitty Hub is above all a product vision exercise — a demonstration of the ability to think through a complete digital ecosystem, from strategy to interface, from visual identity to user experience.",
  },

  // ── SNATSH Agency ──
  snTitle: { fr: "SNATSH", en: "SNATSH" },
  snSubtitle: { fr: "Conception d'une plaquette de présentation pour une agence de production audiovisuelle", en: "Designing a presentation brochure for an audiovisual production agency" },
  snCategory: { fr: "Direction Artistique", en: "Art Direction" },
  snYear: { fr: "2026", en: "2026" },
  snRole: { fr: "Graphiste / Directrice artistique", en: "Graphic Designer / Art Director" },
  snDesc: { fr: "Ce projet consistait à concevoir une plaquette de présentation pour SNATSH, une structure dédiée à la photo et à la vidéo. L'objectif était de traduire, à travers un support éditorial clair et attractif, la manière dont l'agence accompagne ses clients : de l'idée initiale jusqu'à la livraison finale, dans une logique à la fois fluide, collaborative et accessible.", en: "This project involved designing a presentation brochure for SNATSH, a company dedicated to photography and video. The goal was to convey, through a clear and attractive editorial medium, how the agency supports its clients: from the initial idea to final delivery, in a fluid, collaborative and accessible approach." },
  snDirection: { fr: "La plaquette a été pensée comme un support à la fois éditorial, humain et structuré, capable de valoriser les services de l'agence sans surcharger la lecture. Le travail visuel s'appuie sur une mise en page rythmée, une alternance entre grands visuels, blocs de texte et repères graphiques, afin de traduire un univers professionnel mais chaleureux. La direction artistique met en avant l'idée d'un accompagnement clair, d'un récit construit avec le client, et d'une image fidèle à son identité.", en: "The brochure was designed as an editorial, human and structured medium, capable of showcasing the agency's services without overloading the reading experience. The visual work relies on a rhythmic layout, alternating between large visuals, text blocks and graphic markers, to convey a professional yet warm universe. The art direction emphasizes the idea of clear guidance, a narrative built with the client, and an image true to their identity." },
  snObjective: { fr: "Créer un document capable de présenter de manière lisible et convaincante l'offre de SNATSH, son processus de travail et ses valeurs. L'enjeu était de concevoir une plaquette qui ne soit pas seulement informative, mais qui reflète aussi la promesse de l'agence : produire des contenus visuels utiles, accessibles et cohérents avec les objectifs du client.", en: "Create a document capable of presenting SNATSH's offer, work process and values in a readable and convincing way. The challenge was to design a brochure that is not only informative, but also reflects the agency's promise: producing visual content that is useful, accessible and consistent with the client's objectives." },
  snDirLabel: { fr: "Direction visuelle", en: "Visual Direction" },
  snObjLabel: { fr: "Enjeu du projet", en: "Project Challenge" },
  snAgencyTitle: { fr: "L'agence", en: "The Agency" },
  snAgencyDesc: { fr: "SNATSH est une structure de production audiovisuelle spécialisée en photo et vidéo. L'agence accompagne ses clients dans la création de contenus visuels sur-mesure — de la captation à la post-production — avec une approche humaine, collaborative et orientée résultat. Le positionnement repose sur un accompagnement de proximité, une écoute active des besoins et une volonté de rendre la production audiovisuelle accessible et fluide.", en: "SNATSH is an audiovisual production company specializing in photography and video. The agency supports its clients in creating bespoke visual content — from capture to post-production — with a human, collaborative and result-oriented approach. The positioning relies on close support, active listening to needs and a desire to make audiovisual production accessible and fluid." },
  snEditorialTitle: { fr: "Intention éditoriale", en: "Editorial Intention" },
  snEditorialDesc: { fr: "La plaquette a été pensée comme un outil de communication à la fois clair et engageant. Chaque double page joue un rôle précis dans la narration : présenter l'agence, expliquer le processus, détailler les services, affirmer les valeurs. La structure guide le lecteur à travers un récit progressif, pensé pour convaincre sans forcer.", en: "The brochure was designed as a communication tool that is both clear and engaging. Each spread plays a specific role in the narrative: presenting the agency, explaining the process, detailing services, affirming values. The structure guides the reader through a progressive narrative, designed to convince without pushing." },
  snCarouselTitle: { fr: "PAGES DE LA PLAQUETTE", en: "BROCHURE PAGES" },
  snCarouselDesc: { fr: "Chaque page de la plaquette contribue à construire un récit cohérent — de la couverture qui installe l'identité jusqu'à la dernière page qui ancre la marque dans la mémoire.", en: "Each page of the brochure contributes to building a coherent narrative — from the cover that establishes the identity to the last page that anchors the brand in memory." },
  snPageCover: { fr: "Couverture", en: "Cover" },
  snPageCoverDesc: { fr: "La couverture installe immédiatement l'univers visuel de SNATSH : un visuel fort en pleine page, le nom de l'agence et son positionnement. Le ton est posé dès le premier contact.", en: "The cover immediately establishes SNATSH's visual universe: a strong full-page visual, the agency name and its positioning. The tone is set from the first contact." },
  snPageSpread1: { fr: "Offre & Processus", en: "Offer & Process" },
  snPageSpread1Desc: { fr: "Cette double page présente la promesse de l'agence — \"Ensemble, donnons vie à vos idées\" — puis détaille le processus simple en quatre étapes. Le lecteur comprend immédiatement comment se déroule un projet.", en: "This spread presents the agency's promise — \"Together, let's bring your ideas to life\" — then details the simple four-step process. The reader immediately understands how a project unfolds." },
  snPageSpread2: { fr: "Accompagnement & Services", en: "Support & Services" },
  snPageSpread2Desc: { fr: "\"Votre histoire, notre projet commun\" — cette section met en avant l'approche collaborative et les différents formats de contenus audiovisuels proposés.", en: "\"Your story, our shared project\" — this section highlights the collaborative approach and the different audiovisual content formats offered." },
  snPageSpread3: { fr: "Identité & Valeurs", en: "Identity & Values" },
  snPageSpread3Desc: { fr: "\"Un film qui vous ressemble\" et \"Des valeurs partagées\" — les deux dernières sections affirment le positionnement humain de l'agence et présentent les valeurs qui fondent chaque collaboration.", en: "\"A film that looks like you\" and \"Shared values\" — the last two sections affirm the agency's human positioning and present the values that underpin every collaboration." },
  snPageBack: { fr: "Quatrième de couverture", en: "Back Cover" },
  snPageBackDesc: { fr: "La dernière page referme le récit avec le logo SNATSH sur un fond sage — une signature visuelle sobre qui ancre la marque dans la mémoire.", en: "The last page closes the narrative with the SNATSH logo on a sage background — a sober visual signature that anchors the brand in memory." },
  snServicesTitle: { fr: "Services mis en avant", en: "Highlighted Services" },
  snServicesDesc: { fr: "La plaquette met en lumière la diversité des prestations proposées par SNATSH, tout en maintenant une cohérence de lecture et une présentation accessible.", en: "The brochure highlights the diversity of services offered by SNATSH, while maintaining reading coherence and an accessible presentation." },
  snSvc1: { fr: "Captation photo & vidéo", en: "Photo & Video Capture" },
  snSvc1Desc: { fr: "Reportages, portraits, contenus corporate, production de films courts — une palette de formats adaptés à chaque besoin.", en: "Reportages, portraits, corporate content, short film production — a range of formats adapted to every need." },
  snSvc2: { fr: "Post-production", en: "Post-production" },
  snSvc2Desc: { fr: "Montage, étalonnage, retouches — un traitement soigné pour garantir un rendu professionnel et fidèle à l'intention.", en: "Editing, color grading, retouching — careful processing to ensure a professional result true to the intention." },
  snSvc3: { fr: "Direction artistique", en: "Art Direction" },
  snSvc3Desc: { fr: "Accompagnement créatif de la conception à la livraison — un regard cohérent sur l'image et le message.", en: "Creative guidance from conception to delivery — a coherent eye on image and message." },
  snSvc4: { fr: "Contenus sur-mesure", en: "Bespoke Content" },
  snSvc4Desc: { fr: "Chaque projet est unique — les contenus sont pensés et produits en fonction des objectifs et de l'identité du client.", en: "Each project is unique — content is designed and produced according to the client's objectives and identity." },
  snWorkflowTitle: { fr: "Un processus clair", en: "A Clear Process" },
  snWorkflowDesc: { fr: "La plaquette présente un workflow en quatre étapes qui traduit la logique d'accompagnement de SNATSH : un parcours fluide et transparent, de l'écoute initiale à la livraison finale.", en: "The brochure presents a four-step workflow that conveys SNATSH's support logic: a fluid and transparent journey, from initial listening to final delivery." },
  snStep1: { fr: "Écoute", en: "Listening" },
  snStep1Desc: { fr: "Comprendre le besoin, le contexte et les objectifs du client pour poser les bases du projet.", en: "Understanding the need, context and objectives of the client to lay the project foundations." },
  snStep2: { fr: "Conception", en: "Conception" },
  snStep2Desc: { fr: "Développer la direction créative, construire le récit visuel et planifier la production.", en: "Developing the creative direction, building the visual narrative and planning production." },
  snStep3: { fr: "Production", en: "Production" },
  snStep3Desc: { fr: "Réaliser les captations, le tournage et la prise de vue selon le plan défini.", en: "Carrying out captures, filming and photography according to the defined plan." },
  snStep4: { fr: "Livraison", en: "Delivery" },
  snStep4Desc: { fr: "Finaliser le montage, les retouches et livrer un rendu impeccable, prêt à l'emploi.", en: "Finalize editing, retouching and deliver a flawless result, ready to use." },
  snValuesTitle: { fr: "Des valeurs portées", en: "Core Values" },
  snValuesDesc: { fr: "Au-delà des services, la plaquette affirme les valeurs qui fondent l'approche de SNATSH — une manière de travailler qui se ressent dans chaque échange et chaque livrable.", en: "Beyond services, the brochure affirms the values that underpin SNATSH's approach — a way of working that is felt in every exchange and every deliverable." },
  snValue1: { fr: "Accessibilité", en: "Accessibility" },
  snValue1Desc: { fr: "Rendre la production audiovisuelle accessible à tous types de structures, sans jargon ni complexité inutile.", en: "Making audiovisual production accessible to all types of organizations, without jargon or unnecessary complexity." },
  snValue2: { fr: "Transparence", en: "Transparency" },
  snValue2Desc: { fr: "Un processus clair à chaque étape — le client sait toujours où en est son projet.", en: "A clear process at every stage — the client always knows where their project stands." },
  snValue3: { fr: "Collaboration", en: "Collaboration" },
  snValue3Desc: { fr: "Chaque projet est co-construit — l'agence travaille avec le client, pas seulement pour lui.", en: "Every project is co-built — the agency works with the client, not just for them." },
  snValue4: { fr: "Authenticité", en: "Authenticity" },
  snValue4Desc: { fr: "Produire des contenus fidèles à l'identité du client — pas de formule générique, mais un regard sur-mesure.", en: "Producing content true to the client's identity — no generic formula, but a bespoke perspective." },
  snMockupsTitle: { fr: "MISE EN SITUATION", en: "IN CONTEXT" },
  snMockupsDesc: { fr: "La plaquette prend forme dans un format imprimé bi-fold — un objet tangible qui renforce la crédibilité et le professionnalisme de l'agence.", en: "The brochure takes shape in a bi-fold printed format — a tangible object that reinforces the agency's credibility and professionalism." },
  snResultTitle: { fr: "Résultat", en: "Result" },
  snResultDesc: { fr: "Une plaquette de présentation claire, structurée et visuellement engageante, capable de traduire avec justesse l'identité, les services et les valeurs de SNATSH. Un support qui ne se contente pas d'informer, mais qui incarne la promesse de l'agence.", en: "A clear, structured and visually engaging presentation brochure, capable of accurately conveying SNATSH's identity, services and values. A medium that does not just inform, but embodies the agency's promise." },
  snQuoteEditorial: { fr: "Chaque double page raconte une étape — ensemble, elles construisent un récit.", en: "Each spread tells a step — together, they build a narrative." },
  snQuoteFinal: { fr: "Un support qui ne se contente pas d'informer — il incarne la promesse de l'agence.", en: "A medium that doesn't just inform — it embodies the agency's promise." },
  snLayoutTitle: { fr: "Choix éditoriaux", en: "Editorial Choices" },
  snLayoutDesc: { fr: "La mise en page alterne entre grands visuels immersifs, blocs de texte aérés et repères graphiques discrets. Ce rythme visuel guide la lecture naturellement, sans surcharge, et crée un équilibre entre image de marque et présentation de services.", en: "The layout alternates between large immersive visuals, airy text blocks and discreet graphic markers. This visual rhythm guides reading naturally, without overload, and creates a balance between brand image and service presentation." },
} as const;

type TransKey = keyof typeof t;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TransKey) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "fr",
  setLang: () => {},
  t: (key) => t[key]?.fr ?? key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("za-lang");
      if (stored === "fr" || stored === "en") return stored;
    } catch {}
    return "fr";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("za-lang", l); } catch {}
    document.documentElement.lang = l;
  }, []);

  // Set initial lang attribute on mount
  useEffect(() => {
    document.documentElement.lang = lang;
  }, []);

  const translate = useCallback(
    (key: TransKey) => {
      const entry = t[key];
      if (!entry) return key;
      return (entry as Record<Lang, string>)[lang] ?? (entry as Record<Lang, string>).fr ?? key;
    },
    [lang]
  );

  return (
    <Ctx.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);