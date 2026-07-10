/**
 * La carte à trois zooms (DOMAINE.md §2 bis, D14) : pure donnée.
 * Concept, triade de noms et étapes validés par Lætitia le 2026-07-09.
 *
 * Le schéma Zod vit ici avec les données (échec bruyant au chargement,
 * comme le reste du contenu) car la structure est propre à cette fiche.
 */

import { z } from "zod";

export type ZoomInfo = { readonly title: string; readonly text: string };

export type ZoomCase = {
  readonly id: string;
  readonly label: string;
  /** Explication affichée dans le panneau. */
  readonly info?: ZoomInfo;
  /** Pour la vue macro : clé du transversal ouvert par cette case. */
  readonly opensMedium?: string;
  /** Pour la vue médium : cette case ouvre la vue micro du transversal. */
  readonly opensMicro?: boolean;
};

export type ZoomMedium = {
  readonly title: string;
  readonly microKey: string;
  readonly cases: ReadonlyArray<ZoomCase>;
};

export type ZoomMicro = {
  readonly title: string;
  readonly steps: ReadonlyArray<string>;
};

export type ZoomMapContent = {
  readonly intro: string;
  readonly macro: {
    readonly title: string;
    readonly owner: string;
    readonly cases: ReadonlyArray<ZoomCase>;
  };
  readonly mediumOwner: string;
  readonly microOwner: string;
  readonly mediums: Readonly<Record<string, ZoomMedium>>;
  readonly micros: Readonly<Record<string, ZoomMicro>>;
};

export const ZOOM_MAP: ZoomMapContent = {
  intro:
    "Une même réalité, trois niveaux de zoom. Une case avec loupe ouvre la vue suivante ; une case avec info s'explique. Chaque rôle est responsable d'identifier les processus à son niveau.",
  macro: {
    title: "Vue macro · le parcours du client (le processus d'affaires de bout en bout)",
    owner: "Identifié par la direction · observé chez le client",
    cases: [
      {
        id: "decouvrir",
        label: "Découvrir",
        info: {
          title: "Découvrir : la veille du client",
          text: "Le client fait sa veille marché et technologique : salons, confrères, comparatifs, presse spécialisée. C'est un processus du client ; on ne le pilote pas, on l'observe pour comprendre comment être trouvé.",
        },
      },
      {
        id: "choisir",
        label: "Choisir",
        info: {
          title: "Choisir : l'évaluation des options",
          text: "Le client compare les solutions, demande des démonstrations, essaie, consulte des références.",
        },
      },
      {
        id: "commander",
        label: "Commander",
        opensMedium: "evolution",
        info: {
          title: "Commander : case zoomable",
          text: "Côté client : évaluer le besoin, évaluer la valeur, contractualiser. Et c'est depuis la commande que les demandes d'évolution entrent dans notre processus transversal de gestion de la demande (les cadres à l'échelle l'appellent flux de valeur de développement).",
        },
      },
      {
        id: "demarrer",
        label: "Démarrer",
        info: {
          title: "Démarrer : la mise en service",
          text: "Installer, migrer les données, se former, configurer. Souvent la première vraie épreuve du client, et un angle mort classique des équipes de développement.",
        },
      },
      {
        id: "utiliser",
        label: "Utiliser",
        info: {
          title: "Utiliser : là où naît la valeur",
          text: "L'usage au quotidien est l'étape où la valeur se réalise, et où naissent les demandes d'évolution et les problèmes. C'est ici que se mesure le vrai résultat (le KGI).",
        },
      },
      {
        id: "aide",
        label: "Obtenir de l'aide",
        opensMedium: "correctif",
        info: {
          title: "Obtenir de l'aide : case zoomable",
          text: "Le client signale un problème et attend d'être remis en marche. Le zoom ouvre le processus transversal correctif.",
        },
      },
      {
        id: "renouveler",
        label: "Renouveler ou quitter",
        info: {
          title: "Renouveler ou quitter : le verdict",
          text: "Au terme du contrat, le client renouvelle, étend, ou part. C'est la mesure ultime de tout le parcours.",
        },
      },
    ],
  },
  mediumOwner: "Identifié par la gestion de produit · avec les équipes traversées",
  microOwner: "Identifié par l'équipe elle-même",
  mediums: {
    evolution: {
      title: "Vue médium · le processus transversal (ici : la gestion de la demande)",
      microKey: "fonctionnalite",
      cases: [
        { id: "recevoir", label: "Recevoir la demande d'évolution" },
        {
          id: "qualifier",
          label: "Qualifier le besoin",
          info: {
            title: "Qualifier le besoin",
            text: "Comprendre le problème derrière la demande, avec le demandeur : le chemin conjoint avec la gestion de produit commence ici.",
          },
        },
        { id: "estimer", label: "Estimer la valeur" },
        { id: "prioriser", label: "Prioriser" },
        { id: "analyser", label: "Analyser, traduire en solution TI" },
        { id: "decouper", label: "Découper en fonctionnalités" },
        { id: "confier", label: "Confier aux équipes TI", opensMicro: true },
        {
          id: "verifier",
          label: "Vérifier la valeur en service",
          info: {
            title: "Vérifier la valeur en service",
            text: "Une fois livré : la demande a-t-elle produit la valeur estimée ? La boucle que presque toutes les organisations oublient.",
          },
        },
      ],
    },
    correctif: {
      title: "Vue médium · le processus transversal (ici : le flux correctif)",
      microKey: "correctif",
      cases: [
        { id: "signaler", label: "Signaler au support" },
        {
          id: "qualifier-reproduire",
          label: "Qualifier et reproduire",
          info: {
            title: "Qualifier et reproduire",
            text: "Comprendre le problème et le reproduire pour le localiser.",
          },
        },
        { id: "prioriser-severite", label: "Prioriser selon la sévérité" },
        { id: "corriger", label: "Corriger", opensMicro: true },
        { id: "livrer", label: "Livrer le correctif" },
        {
          id: "confirmer",
          label: "Confirmer la résolution avec le client",
          info: {
            title: "Confirmer la résolution",
            text: "Le flux ne se termine pas à la livraison : il se termine quand le client confirme qu'il est remis en marche.",
          },
        },
      ],
    },
  },
  micros: {
    fonctionnalite: {
      title: "Vue micro · le processus d'équipe (réaliser une fonctionnalité)",
      steps: [
        "Prendre en charge",
        "Affiner avec le PO",
        "Concevoir",
        "Réaliser",
        "Relire entre pairs",
        "Tester",
        "Intégrer et livrer",
        "Surveiller en production",
      ],
    },
    correctif: {
      title: "Vue micro · le processus d'équipe (traiter un correctif)",
      steps: [
        "Prendre le ticket",
        "Reproduire le défaut",
        "Corriger",
        "Tester la non-régression",
        "Relire entre pairs",
        "Livrer",
        "Surveiller en production",
      ],
    },
  },
};

/* Validation à échec bruyant. */

const sansTiretLong = (s: string) => !s.includes("—");
const court = z.string().trim().min(3).refine(sansTiretLong, { message: "Tiret long interdit" });
const long = z.string().trim().min(20).refine(sansTiretLong, { message: "Tiret long interdit" });

const infoSchema = z.object({ title: court, text: long });
const caseSchema = z.object({
  id: court,
  label: court,
  info: infoSchema.optional(),
  opensMedium: z.string().optional(),
  opensMicro: z.boolean().optional(),
});

const zoomMapSchema = z
  .object({
    intro: long,
    macro: z.object({ title: court, owner: court, cases: z.array(caseSchema).min(5) }),
    mediumOwner: court,
    microOwner: court,
    mediums: z.record(
      z.object({ title: court, microKey: z.string(), cases: z.array(caseSchema).min(3) }),
    ),
    micros: z.record(z.object({ title: court, steps: z.array(court).min(3) })),
  })
  .superRefine((m, ctx) => {
    for (const c of m.macro.cases) {
      if (c.opensMedium && !(c.opensMedium in m.mediums)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Case ${c.id} : transversal inconnu ${c.opensMedium}`,
        });
      }
    }
    if (!m.macro.cases.some((c) => c.opensMedium)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Aucune case macro zoomable" });
    }
    for (const [key, medium] of Object.entries(m.mediums)) {
      if (!(medium.microKey in m.micros)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Transversal ${key} : vue micro inconnue ${medium.microKey}`,
        });
      }
      if (medium.cases.filter((c) => c.opensMicro).length !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Transversal ${key} : il faut exactement une case zoomable vers la vue micro`,
        });
      }
    }
  });

zoomMapSchema.parse(ZOOM_MAP);
