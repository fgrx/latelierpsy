export const siteConfig = {
  seo: {
    title: "L'atelier Psy — Psychothérapie en ligne",
    description:
      "Des ateliers de psychologie accessibles, scientifiquement fondés, pour particuliers et professionnels.",
    referer: "no-referrer-when-downgrade",
  },

  nav: {
    links: [
      { label: "Ateliers psy", href: "/ateliers" },
      { label: "Contenus psy", href: "/contenus" },
      { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
      { label: "Contact", href: "/contact" },
    ],
    actions: [
      { label: "Connexion →", href: "https://ctpsy.podia.com/login", variant: "filled" },
    ],
  },

  hero: {
    surtitle: "Psychothérapie en ligne · Depuis 2021",
    title: "Commencez le travail chez vous, sans contraintes",
    text: "Des ateliers de psychologie accessibles, scientifiquement fondés, pour particuliers et professionnels.",
  },

  newsletter: {
    surtitle: "La Lettre Psy",
    title: "Une newsletter bimensuelle sur la psychologie",
    text: "Pour mieux comprendre la psychologie et la psychothérapie. Gratuite, fondée sur des contenus sourcés.",
    perks: ["Contenus sourcés", "Pratique & accessible", "Bimensuelle", "Gratuite"],
    apiUrl: "https://email-server-api-production.up.railway.app/add-contact",
    defaultCampaignId: "qD1uT",
  },

  ateliers: {
    surtitle: "Nos ateliers psy",
    title: "Des ateliers en ligne accessibles",
    text: "Ils vous accompagnent sur des sujets précis, à votre rythme, chez vous.",
  },

  contenus: {
    surtitle: "Nos contenus",
    title: "Retrouvez-nous partout",
    text: "Des ressources gratuites sur la psychologie et la psychothérapie.",
  },

  equipe: {
    surtitle: "L'équipe",
    title: "Derrière le projet, plusieurs personnes !",
    text: [
      "Catherine la Psy est partie d'un constat simple : la psychothérapie a besoin d'être démocratisée. Catherine et Fabien ont créé ce projet en 2021 pour proposer des ateliers accessibles.",
      "Prendre soin de son cerveau et l'aider à surmonter ses difficultés permet une vie épanouie — et c'est là toute notre mission.",
    ],
  },

  livre: {
    surtitle: "Publication",
    title: "Bienvenue\nchez le psy",
    subtitle: "par Catherine la Psy",
    text: "Un guide bienveillant et démystificateur pour comprendre ce qui se passe vraiment en thérapie. Idéal pour celles et ceux qui hésitent à franchir le pas ou qui souhaitent mieux comprendre leur parcours thérapeutique.",
  },

  videos: {
    surtitle: "Nos vidéos",
    title: "Toutes nos vidéos",
    text: "Retrouvez toutes nos vidéos Youtube sur la psychothérapie.",
  },

  stats: {
    lettrePsy: { fallback: 19_970, label: "abonnés Lettre Psy" },
    youtube: { fallback: 27_000, label: "abonnés YouTube" },
    ateliers: { label: "ateliers disponibles" },
  },

  contact: {
    surtitle: "Contact",
    title: "Une question ?\nUn renseignement ?",
    text: "N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.",
    categories: [
      { value: "renseignement_atelier", label: "Renseignement sur les ateliers" },
      { value: "aide_commande", label: "Aide sur une commande" },
      { value: "therapie", label: "Demande de thérapie" },
      { value: "supervision", label: "Demande de supervision" },
      { value: "autre", label: "Autre" },
    ],
  },
};
