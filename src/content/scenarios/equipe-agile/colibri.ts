/**
 * Scénario n°1 : L'équipe Colibri.
 * Source de vérité pédagogique : SCENARIO-01-proposition.md, validé
 * par Lætitia le 2026-07-09 (D11), synthèse visuelle en vignettes et
 * cartes d'identité le 2026-07-09 (D12).
 */

import type { ProcessScenario } from "@domain/valueObjects/Scenario";

export const COLIBRI: ProcessScenario = {
  id: "colibri",
  group: "equipe-agile",
  title: "L'équipe Colibri",
  narrative: [
    {
      icon: "equipe",
      text: "L'équipe Colibri, huit personnes, développe un logiciel pour des cabinets vétérinaires : un PO, une Scrum Master, cinq développeurs, une testeuse.",
    },
    {
      icon: "bulle",
      text: "Chaque matin à 9h15, l'équipe se retrouve pour son daily devant le tableau Jira.",
    },
    {
      icon: "demande",
      text: "Un client signale un problème : sa demande arrive au support, est qualifiée, priorisée, corrigée, testée puis livrée. Quatre jours parfois, six semaines souvent.",
    },
    {
      icon: "entonnoir",
      text: "Le PO transforme les idées brutes en tickets prêts à développer, avec l'aide de la testeuse.",
    },
    {
      icon: "balance",
      text: "Tous les trimestres, il arbitre les priorités communes et les dépendances avec les deux autres équipes du produit.",
    },
    {
      icon: "courbe",
      text: "En janvier, un pic de tickets a mis tout le monde sous l'eau.",
    },
    {
      icon: "spirale",
      text: "À chaque rétrospective, l'équipe choisit une amélioration, la tente, et vérifie au sprint suivant si elle a porté.",
    },
    {
      icon: "porte",
      text: "Le mois dernier, une nouvelle développeuse est arrivée : sept semaines entre la signature de son contrat et son premier correctif livré en autonomie.",
    },
  ],
  candidates: [
    {
      id: "traitement-demande",
      shortLabel: "Les demandes client",
      icon: "demande",
      isProcess: true,
      explanation:
        "Une entrée (la demande), une transformation répétée (qualifier, prioriser, corriger, tester), une sortie livrée à un client : c'est un processus.",
      identity: {
        entree: "Un problème signalé par un client",
        sortie: "Un correctif livré",
        client: "Le client qui a signalé",
      },
      classification: {
        type: "operationnel",
        level: "equipe",
        typeRationale:
          "Ce flux produit directement ce que le client attend : son correctif livré.",
        levelRationale:
          "Il se déroule entièrement à l'intérieur de l'équipe Colibri, de la demande à la livraison.",
        typeTraps: {
          support:
            "Piège du mot : la demande arrive au guichet « support », mais ce mot désigne une équipe, pas le type de processus. Ce flux produit directement ce que le client attend.",
        },
      },
    },
    {
      id: "affinage-backlog",
      shortLabel: "L'affinage du backlog",
      icon: "entonnoir",
      isProcess: true,
      explanation:
        "Répétable, avec une entrée (l'idée brute), une sortie (le ticket prêt) et un client (l'équipe qui développe) : c'est un processus.",
      identity: {
        entree: "Une idée brute",
        sortie: "Un ticket prêt à développer",
        client: "L'équipe qui développe",
      },
      classification: {
        type: "operationnel",
        level: "equipe",
        typeRationale:
          "Sa sortie, le ticket prêt, alimente directement ce que le client recevra.",
        levelRationale:
          "Il vit dans l'équipe : le PO et la testeuse en font partie.",
        typeTraps: {
          pilotage:
            "Le PO décide, c'est vrai. Mais on classe un processus par ce qu'il produit, pas par qui le fait : sa sortie alimente directement ce que le client recevra.",
        },
      },
    },
    {
      id: "amelioration-continue",
      shortLabel: "L'amélioration continue",
      icon: "spirale",
      isProcess: true,
      explanation:
        "Un cycle répétable, avec une sortie vérifiable (l'amélioration qui a porté ou non) : c'est un processus, même sans outil dédié.",
      identity: {
        entree: "Un constat en rétrospective",
        sortie: "Une amélioration tentée et vérifiée",
        client: "L'équipe elle-même",
      },
      classification: {
        type: "pilotage",
        level: "equipe",
        typeRationale:
          "Il oriente la façon de travailler de l'équipe : c'est du pilotage.",
        levelRationale:
          "La boucle se joue dans l'équipe, de la rétrospective au sprint suivant.",
        typeTraps: {
          support:
            "Il ne fournit pas de moyens aux autres processus : il oriente la façon de travailler, c'est du pilotage.",
        },
      },
    },
    {
      id: "integration-equipiere",
      shortLabel: "L'arrivée d'une équipière",
      icon: "porte",
      isProcess: true,
      explanation:
        "Une transformation répétable (chaque arrivée), bornée, avec une sortie claire (une personne autonome) : c'est un processus.",
      identity: {
        entree: "Un contrat signé",
        sortie: "Une équipière autonome",
        client: "L'équipe qui l'accueille",
      },
      classification: {
        type: "support",
        level: "equipe",
        typeRationale:
          "Il fournit un moyen essentiel aux autres processus : une équipière autonome. Le client final n'en reçoit rien directement.",
        levelRationale:
          "C'est l'équipe qui accueille, accompagne et rend autonome sa nouvelle équipière.",
        typeTraps: {
          operationnel:
            "Le client final ne reçoit rien directement de ce processus : il fournit des moyens à l'équipe, c'est du support.",
        },
      },
    },
    {
      id: "arbitrage-priorites",
      shortLabel: "L'arbitrage trimestriel",
      icon: "balance",
      isProcess: true,
      explanation:
        "Répétable chaque trimestre, une entrée (les demandes concurrentes), une sortie (des priorités arbitrées) : c'est un processus.",
      identity: {
        entree: "Les demandes concurrentes des trois équipes",
        sortie: "Des priorités arbitrées",
        client: "Les trois équipes du produit",
      },
      classification: {
        type: "pilotage",
        level: "programme",
        typeRationale:
          "Il décide des priorités communes : il oriente le travail, il ne produit pas directement pour le client.",
        levelRationale:
          "Il implique les trois équipes du produit : il vit au niveau programme.",
        levelTraps: {
          equipe:
            "Le PO de Colibri y participe, mais la décision engage les trois équipes du produit : c'est un processus de niveau programme.",
        },
      },
    },
    {
      id: "daily",
      shortLabel: "Le daily de 9h15",
      icon: "bulle",
      isProcess: false,
      nature: "Cérémonie",
      explanation:
        "C'est une activité de pilotage à l'intérieur de processus plus larges : elle ne transforme pas une entrée en sortie livrée à un client.",
    },
    {
      id: "jira",
      shortLabel: "Jira",
      icon: "tableau",
      isProcess: false,
      nature: "Outil",
      explanation:
        "C'est l'outil qui supporte le travail, pas le travail lui-même. Le processus existerait sans lui.",
    },
    {
      id: "testeuse",
      shortLabel: "La testeuse",
      icon: "loupe",
      isProcess: false,
      nature: "Rôle",
      explanation:
        "C'est un rôle. Un rôle participe à des processus, il n'en est pas un.",
    },
    {
      id: "pic-janvier",
      shortLabel: "Le pic de janvier",
      icon: "courbe",
      isProcess: false,
      nature: "Événement ponctuel",
      explanation:
        "C'est un événement ponctuel, pas une transformation répétable. Il peut révéler un processus sous tension, il n'en est pas un.",
    },
  ],
  spottingFeedbacks: {
    success:
      "Les cinq processus sont repérés et aucun leurre n'est coché. Une entrée, une transformation répétée, une sortie attendue par quelqu'un : le réflexe est en place.",
    missed:
      "Aucun leurre coché, mais il reste des processus non repérés. Certains n'ont ni réunion ni outil dédié, et existent quand même.",
    falsePositive:
      "Tous les processus sont repérés, mais au moins un leurre s'est glissé dans la sélection. Pour chaque carte, trois tests : une entrée ? une transformation répétée ? une sortie livrée à quelqu'un ?",
    mixed:
      "Des processus manquent encore, et au moins un leurre est coché. Les trois tests aident : une entrée ? est-ce que ça se répète ? quelqu'un attend-il la sortie ?",
  },
  measure: {
    processLabel: "le traitement d'une demande client",
    chainExample:
      "Si l'équipe respecte sa limite de travaux en cours, alors les demandes traversent plus vite, et le client est servi plus tôt.",
    maxChainBlocks: 4,
    blocks: [
      {
        id: "kbi-wip",
        label: "Respect de la limite de travaux en cours",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Un comportement que l'équipe contrôle chaque jour, et qui influence le temps de traversée : un vrai KBI.",
      },
      {
        id: "kbi-relecture",
        label: "Chaque correctif est relu par un pair avant fusion",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Comportement contrôlable qui influence la qualité en aval : un vrai KBI.",
      },
      {
        id: "kpi-traversee",
        label: "Temps de traversée d'une demande, de la prise en charge à la livraison",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation:
          "Mesure la performance du processus lui-même : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-debit",
        label: "Débit : demandes livrées par semaine",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation:
          "Mesure ce que le processus produit réellement : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-reprise",
        label: "Taux de demandes rouvertes après livraison",
        kind: "kpi",
        timing: "lagging",
        explanation: "Mesure la qualité de sortie du processus : un KPI.",
      },
      {
        id: "kgi-satisfaction",
        label: "Note de satisfaction du client après résolution",
        kind: "kgi",
        timing: "lagging",
        explanation:
          "Le résultat visé : le client servi. On ne l'influence qu'à travers les KBI et les KPI.",
      },
      {
        id: "piege-occupation",
        label: "Taux d'occupation des développeurs",
        kind: "piege",
        explanation:
          "On mesurerait les gens, pas le flux. Une équipe occupée à 100 % livre souvent plus lentement.",
      },
      {
        id: "piege-velocite",
        label: "Vélocité comparée aux autres équipes",
        kind: "piege",
        explanation:
          "La vélocité ne se compare jamais entre équipes ; utilisée ainsi, elle juge les personnes.",
      },
      {
        id: "piege-lignes",
        label: "Nombre de lignes de code produites",
        kind: "piege",
        explanation: "Mesure l'activité, pas la valeur. Plus de lignes n'est pas mieux.",
      },
    ],
    chainFeedbacks: {
      success:
        "La chaîne tient : un comportement contrôlable en amont, la performance du processus au milieu, le résultat client au bout. Le fluide circule.",
      violations: {
        empty: "Aucun bloc sélectionné. Une chaîne de mesure commence par choisir quoi observer.",
        "trap-included":
          "Un bloc piège s'est glissé dans la chaîne : il mesure les personnes ou l'activité, pas le flux. Retirez-le : c'est la première règle de la mesure.",
        "too-many":
          "Trop de cadrans : un tableau de bord qui mesure tout ne pilote rien. Gardez l'essentiel : un comportement, une ou deux performances, un résultat.",
        "no-kgi":
          "Aucun résultat visé dans la chaîne. Sans KGI, on mesure le processus dans le vide : pour qui fait-on tout ça ?",
        "multiple-kgi":
          "Plusieurs résultats visés à la fois : la chaîne perd son cap. Un dispositif se construit autour d'un seul KGI.",
        "missing-kpi":
          "Rien ne mesure la performance du processus lui-même. Sans KPI, impossible de savoir si le flux s'améliore.",
        "missing-kbi":
          "Aucun comportement sous contrôle de l'équipe. Sans KBI, la chaîne constate mais ne donne aucun levier pour agir.",
        "missing-leading":
          "Tous les indicateurs regardent en arrière. Sans indicateur avancé (leading), on pilote dans le rétroviseur.",
        "missing-lagging":
          "Aucun indicateur de résultat. Sans lagging, on suit l'effort sans jamais vérifier qu'il produit quelque chose.",
      },
    },
    validExample: ["kbi-wip", "kpi-traversee", "kgi-satisfaction"],
    quiz: [
      {
        id: "lire-percentile",
        palier: 1,
        question:
          "Le temps de traversée des demandes de Colibri : moyenne 6 jours, 85e percentile 18 jours. Que peut-on promettre à un client qui signale un problème ?",
        options: [
          {
            id: "six-jours",
            label: "Environ 6 jours, c'est la moyenne",
            correct: false,
            feedback:
              "La moyenne cache les cas longs : presque une demande sur cinq dépasse 18 jours. Promettre 6 jours, c'est décevoir souvent.",
          },
          {
            id: "dix-huit-jours",
            label: "Moins de 18 jours dans environ 85 % des cas",
            correct: true,
            feedback:
              "C'est la lecture en percentiles : une promesse honnête, tenue la plupart du temps, fondée sur les données réelles.",
          },
          {
            id: "impossible",
            label: "Rien, chaque demande est unique",
            correct: false,
            feedback:
              "Chaque demande est unique, mais leur ensemble a un comportement prévisible : c'est tout l'intérêt des percentiles.",
          },
        ],
      },
      {
        id: "lire-wip",
        palier: 1,
        question:
          "Le débit de Colibri est stable à 8 demandes livrées par semaine, mais le nombre de demandes en cours a doublé. Qu'est-ce que cela annonce ?",
        options: [
          {
            id: "temps-allonge",
            label: "Les temps de traversée vont s'allonger",
            correct: true,
            feedback:
              "Même débit, deux fois plus de travaux en cours : chaque demande attendra plus longtemps. C'est mécanique (la loi de Little).",
          },
          {
            id: "equipe-productive",
            label: "L'équipe est plus productive, elle absorbe plus",
            correct: false,
            feedback:
              "Elle absorbe plus en parallèle, mais livre au même rythme : rien n'est produit plus vite, tout attend plus longtemps.",
          },
          {
            id: "rien",
            label: "Rien de particulier tant que le débit tient",
            correct: false,
            feedback:
              "Le débit tient, mais l'attente gonfle en silence : c'est justement le signal avancé qu'il faut savoir lire.",
          },
        ],
      },
      {
        id: "choisir-direction",
        palier: 2,
        question:
          "La direction veut savoir si les clients sont remis en marche plus vite qu'avant. Quelle mesure répond à sa question ?",
        options: [
          {
            id: "traversee",
            label: "Le temps de traversée d'une demande, en tendance",
            correct: true,
            feedback:
              "C'est la question posée : le flux vu du client, de la prise en charge à la livraison, suivi dans le temps.",
          },
          {
            id: "occupation",
            label: "Le taux d'occupation des développeurs",
            correct: false,
            feedback:
              "Piège classique : l'occupation mesure les gens, pas le service rendu. Une équipe saturée livre souvent plus lentement.",
          },
          {
            id: "velocite",
            label: "La vélocité de l'équipe comparée au trimestre dernier",
            correct: false,
            feedback:
              "La vélocité est un outil interne de planification : elle ne dit rien du délai vécu par le client.",
          },
        ],
      },
      {
        id: "choisir-equipe",
        palier: 2,
        question:
          "L'équipe veut un signal avancé, qu'elle contrôle elle-même, pour améliorer son flux. Que choisir ?",
        options: [
          {
            id: "respect-wip",
            label: "Le respect de sa limite de travaux en cours",
            correct: true,
            feedback:
              "Un comportement observable chaque jour, sous le contrôle de l'équipe, qui influence le temps de traversée : un KBI.",
          },
          {
            id: "satisfaction",
            label: "La note de satisfaction des clients",
            correct: false,
            feedback:
              "Essentielle, mais elle arrive tard et dépend de bien d'autres choses : c'est un KGI, pas un signal avancé contrôlable.",
          },
          {
            id: "lignes",
            label: "Le nombre de lignes de code produites",
            correct: false,
            feedback: "Mesure l'activité, pas la valeur : plus de lignes n'est pas mieux.",
          },
        ],
      },
    ],
  },
  classificationFeedbacks: {
    success:
      "Les cinq processus sont à leur place sur les deux axes, du premier coup. La grille est en place : ce que ça produit d'abord, où ça vit ensuite.",
    miss:
      "Le classement est terminé, avec des hésitations en route. En rejouant, reposez chaque fois la même question : qu'est-ce que ça produit, et pour qui ?",
  },
  signature: {
    trapPattern: "outil-ceremonie-role-evenement",
    theme: "editeur-logiciel-veterinaire",
  },
};
