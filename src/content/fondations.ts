/**
 * Le bureau d'études : les fondations transversales (D16).
 *
 * Règle d'urbanisme : toute compréhension transversale vit ici ; les
 * ateliers ne font que de l'entraînement contextualisé. Chaque
 * fondation s'ouvre par un mini-problème, jamais par un cours.
 *
 * Contenu neutre (aucune référence à un scénario d'atelier), validé
 * par schéma Zod local à échec bruyant.
 */

import { z } from "zod";

export type FondationId = "processus" | "carte" | "grille" | "mesure";

export type FondationMeta = {
  readonly id: FondationId;
  readonly title: string;
  readonly question: string;
  /** Geste d'atelier qui s'appuie sur cette fondation (pour les renvois). */
  readonly gesteLie: "reperer" | "classer" | "mesurer" | null;
};

export const FONDATIONS: ReadonlyArray<FondationMeta> = [
  {
    id: "processus",
    title: "Qu'est-ce qu'un processus ?",
    question: "Reconnaître un processus, et ce qui n'en est pas un.",
    gesteLie: "reperer",
  },
  {
    id: "carte",
    title: "La carte à trois zooms",
    question: "Où vivent les processus, et qui les identifie.",
    gesteLie: null,
  },
  {
    id: "grille",
    title: "La grille type et niveau",
    question: "Ce que les processus font, et où ils se rangent.",
    gesteLie: "classer",
  },
  {
    id: "mesure",
    title: "Mesurer un processus",
    question: "Pourquoi on mesure, comment, et pour qui.",
    gesteLie: "mesurer",
  },
];

/* F1 : Qu'est-ce qu'un processus ? */

export type VoteItem = {
  readonly id: string;
  readonly label: string;
  readonly isProcess: boolean;
  readonly explanation: string;
};

export const F1_PROCESSUS = {
  votes: [
    {
      id: "onboarding-client",
      label: "L'accueil d'un nouveau client, de la signature du contrat à sa première utilisation réussie",
      isProcess: true,
      explanation:
        "Une entrée (le contrat signé), une transformation qui se répète à chaque nouveau client, une sortie que quelqu'un attend (un client autonome) : c'est un processus.",
    },
    {
      id: "logiciel-tickets",
      label: "Le logiciel de gestion des tickets",
      isProcess: false,
      explanation:
        "C'est un outil : il supporte le travail, il n'est pas le travail. Le processus existerait sans lui, avec un tableau et des post-it.",
    },
  ] as ReadonlyArray<VoteItem>,
  tests: [
    "Y a-t-il une entrée qui déclenche et une sortie livrée ? (le bornage)",
    "Est-ce que cela se répète ? (un événement ponctuel n'est pas un processus)",
    "Quelqu'un attend-il la sortie ? (pas de client, pas de processus)",
  ],
  moral:
    "Trois tests, et la plupart des faux processus tombent : les outils, les rôles, les réunions, les événements. Un processus non documenté existe quand même ; un beau document sans transformation répétable n'en fait pas un.",
  versAtelier:
    "Maintenant, allez le vivre : dans l'atelier, le geste Repérer vous fait chasser les vrais processus dans le récit d'un groupe de travail.",
};

/* F4 : Mesurer un processus : pourquoi, comment, pour qui */

export type QuizOption = {
  readonly id: string;
  readonly label: string;
  readonly correct: boolean;
  readonly feedback: string;
};

export type SenseSituation = {
  readonly id: string;
  readonly kind: "kbi" | "kpi" | "kgi";
  readonly context: string;
  readonly question: string;
  readonly options: ReadonlyArray<QuizOption>;
  readonly lesson: string;
};

export type FamilyRound = {
  readonly kind: "kbi" | "kpi" | "kgi";
  readonly definition: string;
  readonly question: string;
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly isKind: boolean;
    readonly explanation: string;
  }>;
};

export const F4_MESURE = {
  ancrage:
    "Un indicateur appartient à une famille selon qui le lit et à quelle cadence. Trois familles d'indicateurs suffisent à piloter un processus : le comportement (KBI), la performance (KPI), le résultat (KGI).",
  situations: [
    {
      id: "kgi-seul",
      kind: "kgi",
      context:
        "Imaginez : le tableau de bord d'une équipe n'affiche qu'une seule aiguille, la note de satisfaction des clients. Ce trimestre, elle chute.",
      question: "Lundi matin, que peut décider l'équipe avec cette seule information ?",
      options: [
        {
          id: "travailler-plus",
          label: "Travailler plus dur",
          correct: false,
          feedback:
            "Plus dur sur quoi ? La note ne dit pas où ça coince : elle constate, elle ne guide pas.",
        },
        {
          id: "rien-decider",
          label: "Pas grand-chose : elle sait que ça va mal, pas pourquoi ni quoi changer",
          correct: true,
          feedback:
            "Voilà l'angle mort du résultat seul : il arrive tard et ne désigne aucun levier. Il faut des indicateurs plus proches du travail quotidien.",
        },
        {
          id: "audit",
          label: "Commander un audit externe",
          correct: false,
          feedback:
            "Coûteux et lent, pour découvrir ce qu'un bon tableau de bord aurait montré : le problème est de ne regarder que la fin de l'histoire.",
        },
      ],
      lesson:
        "Le KGI répond à « est-ce que ça vaut le coup ? ». Indispensable, mais seul, il constate sans guider.",
    },
    {
      id: "kbi-seul",
      kind: "kbi",
      context:
        "Deuxième essai : le tableau de bord ne suit plus que les pratiques de l'équipe. Limite de travaux en cours respectée, relectures faites : tous les voyants sont verts.",
      question: "Que sait l'équipe de l'effet de ses efforts ?",
      options: [
        {
          id: "rien-effet",
          label: "Rien : elle sait qu'elle fait bien, pas si ça produit quelque chose",
          correct: true,
          feedback:
            "L'angle mort du comportement seul : on peut appliquer toutes les bonnes pratiques et ne rien améliorer. Il faut aussi lire la sortie du processus.",
        },
        {
          id: "tout-va-bien",
          label: "Tout va bien, puisque les pratiques sont bonnes",
          correct: false,
          feedback:
            "C'est le piège du moyen pris pour le but : des pratiques parfaites peuvent coexister avec des clients qui attendent six semaines.",
        },
        {
          id: "clients-contents",
          label: "Les clients sont forcément satisfaits",
          correct: false,
          feedback:
            "Rien ne le garantit : entre le comportement de l'équipe et le client, il y a tout le processus.",
        },
      ],
      lesson:
        "Le KBI répond à « que faire dès demain ? ». C'est le levier, mais seul, il tourne à vide.",
    },
    {
      id: "kpi-seul",
      kind: "kpi",
      context:
        "Troisième essai : le tableau de bord ne suit plus que le temps de traversée des demandes. Il s'améliore chaque mois.",
      question: "L'équipe peut-elle ouvrir le champagne ?",
      options: [
        {
          id: "pas-encore",
          label: "Pas encore : plus vite, oui, mais personne ne vérifie le but",
          correct: true,
          feedback:
            "L'angle mort de la performance seule : on peut livrer très vite des choses qui ne règlent pas les vrais problèmes. Le résultat doit rester en vue.",
        },
        {
          id: "champagne",
          label: "Oui : le flux s'améliore, c'est gagné",
          correct: false,
          feedback:
            "Livrer plus vite des choses qui ne servent pas le client n'a jamais sauvé un produit : la vitesse n'est pas le but.",
        },
        {
          id: "accelerer",
          label: "Non : il faut encore accélérer",
          correct: false,
          feedback:
            "Accélérer sans but, c'est la roue du hamster : la question n'est pas d'aller plus vite, mais de savoir vers quoi.",
        },
      ],
      lesson:
        "Le KPI répond à « le processus s'améliore-t-il ? ». Précieux, mais seul, il optimise à l'aveugle.",
    },
  ] as ReadonlyArray<SenseSituation>,
  complement:
    "Les trois familles d'indicateurs se complètent comme le levier, l'effet et le but : le KBI donne quoi faire, le KPI dit si le processus y répond, le KGI vérifie que ça valait le coup. Retirez-en une, et le pilotage devient aveugle d'un œil.",
  users: [
    {
      kind: "kbi",
      who: "Le groupe de travail lui-même",
      cadence: "Chaque jour",
      usage: "S'observer au quotidien et ajuster ses pratiques sans attendre personne.",
    },
    {
      kind: "kpi",
      who: "Le groupe de travail et son responsable",
      cadence: "À chaque point d'avancement régulier",
      usage: "Vérifier que le flux s'améliore et repérer où ça coince.",
    },
    {
      kind: "kgi",
      who: "Le responsable et la direction",
      cadence: "Chaque trimestre",
      usage: "Vérifier que le but est atteint et arbitrer les priorités.",
    },
  ],
  families: [
    {
      kind: "kbi",
      definition:
        "Un KBI (indicateur de comportement) observe ce que fait le groupe de travail, pas ce qu'il obtient. C'est le levier du quotidien.",
      question: "Le test : peut-on le décider dès demain matin, sans attendre personne ?",
      items: [
        {
          id: "kbi-oui-wip",
          label: "Respecter une limite de travaux en cours",
          isKind: true,
          explanation:
            "On peut le décider demain matin : c'est un comportement sous contrôle direct. Un KBI.",
        },
        {
          id: "kbi-oui-relecture",
          label: "Faire relire chaque livraison par un pair",
          isKind: true,
          explanation:
            "Une pratique qu'on choisit d'appliquer ou non : un comportement, donc un KBI.",
        },
        {
          id: "kbi-non-traversee",
          label: "Le temps de traversée d'une demande",
          isKind: false,
          explanation:
            "On ne peut pas le décider directement : on l'influence par ses comportements. C'est une performance du processus, un KPI.",
        },
        {
          id: "kbi-non-satisfaction",
          label: "La note de satisfaction des clients",
          isKind: false,
          explanation:
            "Personne ne peut la décider demain matin : elle résulte de tout le reste. C'est un résultat, un KGI.",
        },
      ],
    },
    {
      kind: "kpi",
      definition:
        "Un KPI (indicateur de performance) mesure ce que le processus produit : vitesse, débit, qualité. On l'observe, on ne le décide pas.",
      question: "Le test : est-ce que ça se lit à la sortie du processus ?",
      items: [
        {
          id: "kpi-oui-debit",
          label: "Le nombre de demandes livrées par semaine",
          isKind: true,
          explanation:
            "Se lit à la sortie du processus, semaine après semaine : une performance, un KPI (et une métrique de flux).",
        },
        {
          id: "kpi-oui-reprise",
          label: "Le taux de demandes rouvertes après livraison",
          isKind: true,
          explanation: "La qualité de ce qui sort du processus : une performance, un KPI.",
        },
        {
          id: "kpi-non-daily",
          label: "Tenir le point d'équipe chaque matin",
          isKind: false,
          explanation:
            "C'est un comportement que le groupe de travail décide : un KBI, pas une performance.",
        },
        {
          id: "kpi-non-renouvellement",
          label: "Le renouvellement du contrat par le client",
          isKind: false,
          explanation:
            "Ça arrive bien après la sortie du processus et ça dépend de tout le parcours : un résultat, un KGI.",
        },
      ],
    },
    {
      kind: "kgi",
      definition:
        "Un KGI (indicateur de résultat) mesure si le but est atteint, chez le client ou pour l'organisation. Il arrive en dernier, et on ne l'influence qu'à travers les KBI et les KPI.",
      question: "Le test : est-ce la raison pour laquelle le processus existe ?",
      items: [
        {
          id: "kgi-oui-satisfaction",
          label: "La note de satisfaction du client après résolution",
          isKind: true,
          explanation: "C'est pour cela que le processus existe : le client servi. Un KGI.",
        },
        {
          id: "kgi-oui-renouvellement",
          label: "Le taux de clients qui renouvellent leur contrat",
          isKind: true,
          explanation:
            "Le verdict final du parcours entier, bien au-delà d'une seule demande : un KGI.",
        },
        {
          id: "kgi-non-traversee",
          label: "Le temps de traversée d'une demande",
          isKind: false,
          explanation:
            "Précieux, mais ce n'est pas le but : c'est la performance qui mène au but. Un KPI.",
        },
        {
          id: "kgi-non-wip",
          label: "Respecter la limite de travaux en cours",
          isKind: false,
          explanation: "Le levier du quotidien, pas le but : un KBI.",
        },
      ],
    },
  ] as ReadonlyArray<FamilyRound>,
  versAtelier:
    "Maintenant, allez le vivre : dans l'atelier, le geste Mesurer vous fait lire des chiffres réels, choisir le bon thermomètre et construire une chaîne complète.",
};

/* Validation à échec bruyant. */

const sansTiretLong = (s: string) => !s.includes("—");
const court = z.string().trim().min(3).refine(sansTiretLong, { message: "Tiret long interdit" });
const long = z.string().trim().min(20).refine(sansTiretLong, { message: "Tiret long interdit" });
const kindEnum = z.enum(["kbi", "kpi", "kgi"]);

const optionsSchema = z
  .array(z.object({ id: court, label: court, correct: z.boolean(), feedback: long }))
  .min(2)
  .refine((o) => o.filter((x) => x.correct).length === 1, {
    message: "Exactement une bonne réponse",
  });

z.array(
  z.object({ id: z.enum(["processus", "carte", "grille", "mesure"]), title: court, question: long, gesteLie: z.enum(["reperer", "classer", "mesurer"]).nullable() }),
)
  .length(4)
  .parse(FONDATIONS);

z.object({
  votes: z
    .array(z.object({ id: court, label: court, isProcess: z.boolean(), explanation: long }))
    .min(2),
  tests: z.array(long).length(3),
  moral: long,
  versAtelier: long,
}).parse(F1_PROCESSUS);

z.object({
  ancrage: long,
  situations: z
    .array(
      z.object({ id: court, kind: kindEnum, context: long, question: long, options: optionsSchema, lesson: long }),
    )
    .length(3)
    .refine((s) => new Set(s.map((x) => x.kind)).size === 3, {
      message: "Les trois situations couvrent les trois familles",
    }),
  complement: long,
  users: z
    .array(z.object({ kind: kindEnum, who: court, cadence: court, usage: long }))
    .length(3),
  families: z
    .array(
      z.object({
        kind: kindEnum,
        definition: long,
        question: long,
        items: z
          .array(z.object({ id: court, label: court, isKind: z.boolean(), explanation: long }))
          .min(3)
          .refine((i) => i.some((x) => x.isKind) && i.some((x) => !x.isKind), {
            message: "Il faut des oui et des non",
          }),
      }),
    )
    .length(3)
    .refine((f) => f.map((x) => x.kind).join(",") === "kbi,kpi,kgi", {
      message: "Ordre des familles : KBI, KPI, KGI",
    }),
}).parse(F4_MESURE);
