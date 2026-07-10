/**
 * Scénario n°3 : la gestion de la demande transverse.
 * Ouvre le groupe "programme". Source de vérité pédagogique :
 * SCENARIO-03-proposition.md, validé par Lætitia le 2026-07-09 (D18) :
 * pas de train de livraison façon SAFe, des rôles transverses
 * individuels, l'ancrage déjà validé en D14 (vue médium de la carte à
 * trois zooms).
 */

import type { ProcessScenario } from "@domain/valueObjects/Scenario";

export const GESTION_DEMANDE: ProcessScenario = {
  id: "gestion-demande",
  group: "programme",
  title: "La gestion de la demande transverse",
  narrative: [
    {
      icon: "equipe",
      text: "Un gestionnaire de portefeuille, deux analystes d'affaires, un architecte de solution : quatre rôles transverses, chacun au service de plusieurs équipes de livraison, sans former eux-mêmes une équipe.",
    },
    {
      icon: "entonnoir",
      text: "Une direction métier remonte un besoin : il est reçu, qualifié, priorisé, traduit en solution, découpé, confié à une équipe, puis vérifié en service. Trois semaines parfois, quatre mois souvent.",
    },
    {
      icon: "balance",
      text: "Chaque trimestre, le gestionnaire de portefeuille arbitre l'ordre des demandes en attente avec les directions métier concernées.",
    },
    {
      icon: "pilier",
      text: "L'architecte de solution tient à jour un référentiel de standards et de patrons réutilisables, à la disposition de toutes les équipes de livraison.",
    },
    {
      icon: "tableau",
      text: "Chaque demande est suivie sur Virelo, un tableau kanban qui rend visible en temps réel le travail en cours et les priorités.",
    },
    {
      icon: "bulle",
      text: "Chaque semaine, les quatre rôles transverses se réunissent une heure ou deux devant Virelo pour faire le point ensemble sur l'avancement et les priorités.",
    },
    {
      icon: "porte",
      text: "Fin décembre, un gel des nouvelles demandes protège la clôture budgétaire : aucune nouvelle demande n'est acceptée pendant trois semaines.",
    },
  ],
  candidates: [
    {
      id: "gestion-demande-transverse",
      shortLabel: "La gestion de la demande",
      icon: "entonnoir",
      isProcess: true,
      explanation:
        "Une entrée (le besoin brut), une transformation répétée (qualifier, prioriser, traduire, découper, confier, vérifier), une sortie mise en service : c'est un processus.",
      identity: {
        entree: "Un besoin métier brut remonté par une direction",
        sortie: "Une solution mise en service et vérifiée",
        client: "La direction métier demandeuse",
      },
      classification: {
        type: "operationnel",
        level: "programme",
        typeRationale:
          "Sa sortie va jusqu'à la mise en service : c'est bien ce que la direction demandeuse reçoit, un vrai opérationnel.",
        levelRationale:
          "Aucune équipe ne le mène seule de bout en bout : il traverse plusieurs équipes de livraison, il vit au niveau programme.",
        typeTraps: {
          pilotage:
            "Il y a de l'analyse et de la priorisation, c'est vrai. Mais sa sortie va jusqu'à la mise en service : c'est bien ce que la direction demandeuse reçoit, un vrai opérationnel.",
        },
        levelTraps: {
          equipe:
            "Une équipe reçoit une part du travail, mais aucune ne mène seule la demande de bout en bout : elle traverse plusieurs équipes, niveau programme.",
        },
      },
    },
    {
      id: "arbitrage-priorites-transverse",
      shortLabel: "L'arbitrage trimestriel",
      icon: "balance",
      isProcess: true,
      explanation:
        "Répétable chaque trimestre, une entrée (les demandes concurrentes), une sortie (un ordre arbitré) : c'est un processus.",
      identity: {
        entree: "Les demandes en attente de plusieurs directions métier",
        sortie: "Un ordre de priorité arbitré",
        client: "Les équipes qui recevront le travail",
      },
      classification: {
        type: "pilotage",
        level: "programme",
        typeRationale:
          "Il décide de l'ordre de traitement : il oriente le travail des équipes, il ne produit rien directement pour la direction demandeuse.",
        levelRationale:
          "Il implique plusieurs directions métier et plusieurs équipes concurrentes : il vit au niveau programme.",
        typeTraps: {
          operationnel:
            "Il produit un livrable concret, un ordre arbitré, c'est vrai. Mais ce livrable oriente le travail des équipes, il ne va pas jusqu'à la direction demandeuse : c'est du pilotage.",
        },
      },
    },
    {
      id: "referentiel-architecture-commun",
      shortLabel: "Le référentiel commun",
      icon: "pilier",
      isProcess: true,
      explanation:
        "Une entrée (un besoin de cohérence technique), une transformation continue (documenter, tenir à jour), une sortie utilisée par les équipes : c'est un processus.",
      identity: {
        entree: "Un besoin de cohérence technique remonté par une équipe",
        sortie: "Des standards et des patrons réutilisables, tenus à jour",
        client: "Les équipes de livraison",
      },
      classification: {
        type: "support",
        level: "programme",
        typeRationale:
          "Il fournit un moyen aux équipes, des standards réutilisables : son client est interne, ce n'est pas la direction demandeuse.",
        levelRationale:
          "Il est tenu à la disposition de toutes les équipes de livraison à la fois : il vit au niveau programme.",
        typeTraps: {
          operationnel:
            "Il est utilisé au quotidien par les équipes, c'est vrai. Mais son client est interne aux équipes, pas la direction demandeuse : c'est du support.",
        },
      },
    },
    {
      id: "outil-virelo",
      shortLabel: "Virelo",
      icon: "tableau",
      isProcess: false,
      nature: "Outil",
      explanation:
        "C'est l'outil qui suit les demandes, pas le travail lui-même. La gestion de la demande existerait sans lui.",
    },
    {
      id: "architecte-solution",
      shortLabel: "L'architecte de solution",
      icon: "boussole",
      isProcess: false,
      nature: "Rôle",
      explanation:
        "C'est un rôle. Un rôle participe à des processus, il n'en est pas un.",
    },
    {
      id: "synchronisation-hebdomadaire",
      shortLabel: "La synchronisation hebdomadaire",
      icon: "bulle",
      isProcess: false,
      nature: "Cérémonie",
      explanation:
        "C'est une activité de coordination à l'intérieur de la gestion de la demande : elle ne transforme pas elle-même une entrée en sortie livrée.",
    },
    {
      id: "gel-fin-annee",
      shortLabel: "Le gel de fin d'année",
      icon: "porte",
      isProcess: false,
      nature: "Événement ponctuel",
      explanation:
        "C'est un événement ponctuel, pas une transformation répétable. Il suspend la gestion de la demande, il n'en est pas un.",
    },
  ],
  spottingFeedbacks: {
    success:
      "Les trois processus sont repérés et aucun leurre n'est coché. Ni l'outil, ni le rôle, ni la cérémonie, ni l'événement ne vous ont piégé : le réflexe se renforce au niveau programme.",
    missed:
      "Aucun leurre coché, mais il reste des processus non repérés. Un référentiel qui se tient à jour en continu peut se cacher dans une seule phrase du récit.",
    falsePositive:
      "Tous les processus sont repérés, mais au moins un leurre s'est glissé dans la sélection. Un outil, un rôle, une cérémonie ou un événement ne transforme rien : appliquez les trois tests.",
    mixed:
      "Des processus manquent, et au moins un leurre est coché. Les trois tests aident : une entrée ? est-ce que ça se répète ? quelqu'un attend-il la sortie ?",
  },
  classificationFeedbacks: {
    success:
      "Les trois processus sont à leur place sur les deux axes, du premier coup. Les trois types existent bien au niveau programme, sans qu'aucun ne suppose une équipe.",
    miss:
      "Le classement est terminé, avec des hésitations. Rejouez en posant chaque fois la même question : qu'est-ce que ça produit, et pour qui ?",
  },
  measure: {
    processLabel: "la gestion de la demande transverse",
    chainExample:
      "Si chaque demande est qualifiée avec le gabarit standard dès sa réception, alors elle se traduit plus vite en solution prête à confier à une équipe, et la direction demandeuse reçoit une solution qui répond vraiment à son besoin.",
    maxChainBlocks: 4,
    blocks: [
      {
        id: "kbi-qualification-gabarit",
        label: "Chaque demande est qualifiée avec le gabarit standard dès sa réception",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Un comportement que les analystes contrôlent dès l'arrivée de la demande, et qui débloque tout l'aval : un KBI.",
      },
      {
        id: "kbi-revue-avant-confiage",
        label: "Chaque demande découpée est revue avec l'équipe qui la recevra avant d'être confiée",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Comportement contrôlable qui influence directement la qualité de ce qui est confié : un KBI.",
      },
      {
        id: "kpi-delai-traduction",
        label: "Délai de traduction d'une demande en solution prête à confier",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation:
          "Mesure la performance de la gestion de la demande elle-même : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-attente-qualification",
        label: "Nombre de demandes en attente de qualification",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation:
          "Mesure ce qui s'accumule avant traitement, des travaux en cours : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-retour-clarification",
        label: "Taux de demandes qui repassent en clarification après un premier découpage",
        kind: "kpi",
        timing: "lagging",
        explanation: "Mesure la qualité de sortie du découpage : un KPI.",
      },
      {
        id: "kgi-part-solutions",
        label: "Part des solutions livrées qui répondent au besoin métier initial, vérifiée en service",
        kind: "kgi",
        timing: "lagging",
        explanation:
          "Le résultat visé : la direction demandeuse est servie. On ne l'influence qu'à travers les KBI et les KPI.",
      },
      {
        id: "piege-nombre-analyste",
        label: "Nombre de demandes traitées par analyste",
        kind: "piege",
        explanation: "Mesurerait l'activité d'une personne, pas le flux des demandes.",
      },
      {
        id: "piege-occupation-analystes",
        label: "Taux d'occupation des analystes",
        kind: "piege",
        explanation: "Mesurerait les gens, pas le flux.",
      },
      {
        id: "piege-velocite-analystes",
        label: "Vélocité comparée entre analystes",
        kind: "piege",
        explanation:
          "Ne se compare jamais entre personnes ; jugerait les gens plutôt que le flux.",
      },
    ],
    chainFeedbacks: {
      success:
        "La chaîne tient : une qualification soignée en amont, la performance de la gestion de la demande au milieu, le besoin métier servi au bout. Le fluide circule.",
      violations: {
        empty: "Aucun bloc sélectionné. Une chaîne de mesure commence par choisir quoi observer.",
        "trap-included":
          "Un bloc piège s'est glissé dans la chaîne : il mesure les personnes ou l'activité, pas le flux. Retirez-le : c'est la première règle de la mesure.",
        "too-many":
          "Trop de cadrans : un tableau de bord qui mesure tout ne pilote rien. Gardez l'essentiel : un comportement, une ou deux performances, un résultat.",
        "no-kgi":
          "Aucun résultat visé dans la chaîne. Sans KGI, on traite des demandes dans le vide : pour qui fait-on tout ça ?",
        "multiple-kgi":
          "Plusieurs résultats visés à la fois : la chaîne perd son cap. Un dispositif se construit autour d'un seul KGI.",
        "missing-kpi":
          "Rien ne mesure la performance de la gestion de la demande elle-même. Sans KPI, impossible de savoir si le flux s'améliore.",
        "missing-kbi":
          "Aucun comportement sous contrôle des analystes. Sans KBI, la chaîne constate mais ne donne aucun levier pour agir.",
        "missing-leading":
          "Tous les indicateurs regardent en arrière. Sans indicateur avancé (leading), on pilote dans le rétroviseur.",
        "missing-lagging":
          "Aucun indicateur de résultat. Sans lagging, on suit l'effort sans jamais vérifier qu'il produit quelque chose.",
      },
    },
    validExample: ["kbi-qualification-gabarit", "kpi-delai-traduction", "kgi-part-solutions"],
    quiz: [
      {
        id: "lire-tendance-attente",
        palier: 1,
        question:
          "Le délai de traduction d'une demande reste stable, mais le nombre de demandes en attente de qualification a doublé en deux mois. Que lire ?",
        options: [
          {
            id: "signal-faible",
            label: "Un signal faible à surveiller : ça s'accumule avant traitement",
            correct: true,
            feedback:
              "Deux cadrans se lisent ensemble : un délai stable qui cache une file d'attente qui grossit annonce un ralentissement à venir.",
          },
          {
            id: "tout-va-bien",
            label: "Tout va bien puisque le délai de traduction n'a pas bougé",
            correct: false,
            feedback:
              "Un seul cadran ne suffit jamais : la file d'attente qui double annonce mécaniquement des délais plus longs demain.",
          },
          {
            id: "moins-analystes",
            label: "Réduire le nombre d'analystes puisqu'ils suivent",
            correct: false,
            feedback:
              "C'est l'intuition inverse du flux : réduire la capacité pendant que la file grossit aggrave l'accumulation.",
          },
        ],
      },
      {
        id: "lire-deux-cadrans-clarification",
        palier: 1,
        question:
          "Le délai de traduction d'une demande a baissé, mais le taux de retour en clarification après découpage a doublé. Que lire ?",
        options: [
          {
            id: "vite-mais-mal",
            label: "Traité plus vite, mais moins bien : à investiguer",
            correct: true,
            feedback:
              "Deux cadrans se lisent ensemble : un délai qui s'améliore payé par plus d'allers-retours n'est pas un vrai progrès.",
          },
          {
            id: "progres-net",
            label: "Un progrès net, le délai est ce qui compte",
            correct: false,
            feedback:
              "Le délai seul ne dit rien de la qualité du découpage : le retour en clarification qui double est le signal à lire.",
          },
          {
            id: "ignorer",
            label: "Un détail à ignorer tant que le délai s'améliore",
            correct: false,
            feedback:
              "Ignorer ce cadran revient à optimiser la vitesse au prix de la qualité : les deux se lisent ensemble.",
          },
        ],
      },
      {
        id: "choisir-direction-transverse",
        palier: 2,
        question:
          "Une direction métier demande : « la solution qu'on a reçue répond-elle vraiment à notre besoin ? ». Quelle mesure répond à sa question ?",
        options: [
          {
            id: "part-solutions",
            label: "La part des solutions livrées qui répondent au besoin initial, en tendance",
            correct: true,
            feedback:
              "C'est le résultat vécu par la direction demandeuse : un KGI, lu en tendance. Exactement la question posée.",
          },
          {
            id: "delai-traduction",
            label: "Le délai de traduction d'une demande en solution",
            correct: false,
            feedback:
              "C'est la performance de la gestion de la demande, pas le résultat chez la direction : traduire vite ne garantit pas de répondre au besoin.",
          },
          {
            id: "occupation-analystes",
            label: "Le taux d'occupation des analystes",
            correct: false,
            feedback:
              "Piège classique : l'occupation mesure les personnes, pas le service rendu.",
          },
        ],
      },
      {
        id: "choisir-signal-avance",
        palier: 2,
        question:
          "Les analystes veulent un signal avancé, sous leur contrôle, pour améliorer la gestion de la demande. Que choisir ?",
        options: [
          {
            id: "qualification-gabarit",
            label: "La qualification au gabarit standard dès réception",
            correct: true,
            feedback:
              "Observable à chaque demande, décidé par les analystes, débloque tout l'aval : un KBI.",
          },
          {
            id: "delai-traduction-signal",
            label: "Le délai de traduction d'une demande",
            correct: false,
            feedback:
              "Précieux, mais il constate après coup : c'est la performance qui mesure, pas le levier qui accélère.",
          },
          {
            id: "nombre-traite",
            label: "Le nombre de demandes traitées par analyste",
            correct: false,
            feedback: "Mesure l'activité d'une personne, pas le flux : un piège.",
          },
        ],
      },
    ],
  },
  signature: {
    trapPattern: "outil-role-ceremonie-evenement",
    theme: "gestion-demande-transverse",
  },
};
