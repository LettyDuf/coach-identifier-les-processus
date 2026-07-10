/**
 * Scénario n°2 : L'équipe Harfang (remplace Baobab, jugé trop éloigné
 * du vécu des publics : équipes plateforme TI, PM, architectes).
 * Signature distincte de Colibri (D7) : leurres document, objectif,
 * département, indicateur. PROPOSITION à valider (SCENARIO-02).
 */

import type { ProcessScenario } from "@domain/valueObjects/Scenario";

export const HARFANG: ProcessScenario = {
  id: "harfang",
  group: "equipe-agile",
  title: "L'équipe Harfang",
  narrative: [
    {
      icon: "equipe",
      text: "L'équipe Harfang, huit personnes, fait vivre les outils de fondation d'une grande organisation : Fluxo le moteur de processus, Sésame la gestion des accès, Rouage les robots logiciels, Balise l'adoption numérique, Lanterne le minage de processus. Un PM, un architecte de plateforme, deux architectes intégrateurs, quatre développeurs. Douze équipes de livraison s'appuient sur ces outils.",
    },
    {
      icon: "demande",
      text: "Quand une équipe de livraison demande un service (un accès dans Sésame, un nouveau workflow Fluxo, un robot Rouage), la demande arrive au guichet, est qualifiée par un architecte intégrateur, réalisée, testée puis livrée. Deux jours parfois, cinq semaines souvent.",
    },
    {
      icon: "engrenage",
      text: "Chaque jeudi, les mises à jour des outils partent en production : tests, revue à deux, déploiement en heures creuses.",
    },
    {
      icon: "spirale",
      text: "Une fois par mois, l'architecte de plateforme arbitre les choix structurants au comité d'architecture, avec ses homologues des autres domaines.",
    },
    {
      icon: "porte",
      text: "Un nouvel architecte intégrateur est arrivé le mois dernier : entre sa signature et sa première intégration livrée seul, huit semaines.",
    },
    {
      icon: "tableau",
      text: "Le dossier d'architecture de référence, sur le wiki, vient d'être remis à jour. Au mur, l'objectif du trimestre : réduire de moitié le délai de livraison des demandes. En bas du tableau : la disponibilité des outils de fondation, 99,7 %.",
    },
    {
      icon: "reseau",
      text: "Quand un incident touche plusieurs équipes de livraison, une cellule se monte : diagnostic conjoint, correctif, bilan partagé entre les équipes concernées.",
    },
  ],
  candidates: [
    {
      id: "demandes-acces",
      shortLabel: "Les demandes de service",
      icon: "demande",
      isProcess: true,
      explanation:
        "Une entrée (la demande : accès, workflow, robot), une transformation répétée (qualifier, réaliser, tester, livrer), une sortie attendue par un client interne : c'est un processus, le même quel que soit l'outil traversé.",
      identity: {
        entree: "Une demande d'une équipe de livraison (accès, workflow, robot)",
        sortie: "Le service livré et testé",
        client: "L'équipe de livraison demandeuse",
      },
      classification: {
        type: "operationnel",
        level: "equipe",
        typeRationale:
          "Il livre directement ce que le client d'Harfang attend : son service. Le client est interne, mais c'est bien l'opérationnel de l'équipe.",
        levelRationale: "Harfang le mène seule, du guichet à la livraison.",
        typeTraps: {
          support:
            "Vu de l'entreprise, une équipe de fondations rend service ; mais le type se juge du point de vue du processus et de son client direct : ce flux livre directement la valeur d'Harfang à son client. C'est son opérationnel.",
        },
      },
    },
    {
      id: "mises-en-production",
      shortLabel: "Les mises à jour des outils",
      icon: "engrenage",
      isProcess: true,
      explanation:
        "Une entrée (les évolutions prêtes), une transformation répétée chaque semaine (tester, relire, déployer), une sortie en service : c'est un processus, unique même si les outils sont multiples.",
      identity: {
        entree: "Les évolutions prêtes de la semaine, tous outils confondus",
        sortie: "Des outils de fondation à jour en production",
        client: "Les équipes de livraison utilisatrices",
      },
      classification: {
        type: "operationnel",
        level: "equipe",
        typeRationale: "Il livre les outils eux-mêmes, ce que les clients internes utilisent.",
        levelRationale: "Il se joue entièrement dans l'équipe, des tests au déploiement.",
      },
    },
    {
      id: "arbitrage-architecture",
      shortLabel: "L'arbitrage d'architecture",
      icon: "spirale",
      isProcess: true,
      explanation:
        "Répétable chaque mois, une entrée (les choix structurants en attente), une sortie (des décisions d'architecture) : c'est un processus.",
      identity: {
        entree: "Les choix structurants en attente",
        sortie: "Des décisions d'architecture arbitrées",
        client: "Les domaines et équipes concernés",
      },
      classification: {
        type: "pilotage",
        level: "programme",
        typeRationale:
          "Il décide comment on construira : il oriente, il ne livre rien directement aux utilisateurs.",
        levelRationale:
          "Il réunit les architectes de plusieurs domaines : il traverse les équipes, il vit au niveau programme.",
        levelTraps: {
          equipe:
            "L'architecte de plateforme y siège, mais la décision engage plusieurs domaines : c'est un processus de niveau programme.",
        },
      },
    },
    {
      id: "integration-architecte",
      shortLabel: "L'intégration d'un nouvel architecte",
      icon: "porte",
      isProcess: true,
      explanation:
        "Une transformation répétable à chaque arrivée, bornée (de la signature à l'autonomie), avec une sortie claire : c'est un processus.",
      identity: {
        entree: "Un contrat signé",
        sortie: "Un architecte intégrateur autonome",
        client: "L'équipe qui l'accueille",
      },
      classification: {
        type: "support",
        level: "equipe",
        typeRationale:
          "Il fournit un moyen aux autres processus : une personne autonome. Les clients de la plateforme n'en voient rien directement.",
        levelRationale: "C'est l'équipe qui accueille, accompagne et rend autonome.",
        typeTraps: {
          operationnel:
            "Le client de la plateforme ne reçoit rien directement de ce processus : il fournit des moyens à l'équipe, c'est du support.",
        },
      },
    },
    {
      id: "cellule-incident",
      shortLabel: "La cellule d'incident multi-équipes",
      icon: "reseau",
      isProcess: true,
      explanation:
        "Répétable (à chaque incident majeur), une entrée (l'incident), une sortie (le service rétabli et le bilan partagé) : c'est un processus.",
      identity: {
        entree: "Un incident d'un outil de fondation touchant plusieurs équipes",
        sortie: "Le service rétabli, un bilan partagé",
        client: "Les équipes de livraison touchées",
      },
      classification: {
        type: "operationnel",
        level: "programme",
        typeRationale:
          "Il remet en marche ce que les clients utilisent : c'est de l'opérationnel, même en mode exceptionnel.",
        levelRationale:
          "Le diagnostic et le bilan traversent les équipes touchées : il vit au niveau programme.",
        levelTraps: {
          equipe:
            "Harfang pilote la cellule, mais le diagnostic et le bilan impliquent toutes les équipes touchées : niveau programme.",
        },
      },
    },
    {
      id: "dossier-architecture",
      shortLabel: "Le dossier d'architecture de référence",
      icon: "tableau",
      isProcess: false,
      nature: "Document",
      explanation:
        "C'est la description d'une cible, pas une transformation. Un processus non documenté existe ; un document sans transformation répétable n'est pas un processus.",
    },
    {
      id: "objectif-delai",
      shortLabel: "L'objectif : délai de livraison réduit de moitié",
      icon: "fanion",
      isProcess: false,
      nature: "Objectif",
      explanation:
        "C'est une destination, pas un chemin : il dit où aller, il ne transforme aucune entrée en sortie. Les processus servent l'objectif, ils ne se confondent pas avec lui.",
    },
    {
      id: "direction-infrastructures",
      shortLabel: "La direction des infrastructures",
      icon: "equipe",
      isProcess: false,
      nature: "Département",
      explanation:
        "C'est une case de l'organigramme. Un département héberge et traverse des processus, il n'en est pas un.",
    },
    {
      id: "disponibilite",
      shortLabel: "La disponibilité des outils : 99,7 %",
      icon: "courbe",
      isProcess: false,
      nature: "Indicateur",
      explanation:
        "C'est une mesure : elle observe le résultat de processus, elle ne transforme rien. Un indicateur sans processus dessous n'est qu'un chiffre au mur.",
    },
  ],
  spottingFeedbacks: {
    success:
      "Les cinq processus sont repérés et aucun leurre n'est coché. Ni le dossier, ni l'objectif, ni le département, ni l'indicateur ne vous ont piégé : le réflexe se renforce.",
    missed:
      "Aucun leurre coché, mais il reste des processus non repérés. Certains tiennent dans une seule phrase du récit : cherchez les transformations répétées.",
    falsePositive:
      "Tous les processus sont repérés, mais au moins un leurre s'est glissé dans la sélection. Un document, un objectif, un département ou un indicateur ne transforme rien : appliquez les trois tests.",
    mixed:
      "Des processus manquent, et au moins un leurre est coché. Les trois tests aident : une entrée ? est-ce que ça se répète ? quelqu'un attend-il la sortie ?",
  },
  classificationFeedbacks: {
    success:
      "Les cinq processus sont à leur place sur les deux axes, du premier coup. La grille tient, même quand l'opérationnel vit au niveau programme.",
    miss:
      "Le classement est terminé, avec des hésitations. Rejouez en posant chaque fois la même question : qu'est-ce que ça produit, et pour qui ?",
  },
  measure: {
    processLabel: "le traitement d'une demande de service",
    chainExample:
      "Si chaque demande est qualifiée sous 48 heures par un architecte intégrateur, alors les demandes se livrent plus vite, et les équipes de livraison démarrent leurs projets à la date prévue.",
    maxChainBlocks: 4,
    blocks: [
      {
        id: "kbi-qualification",
        label: "Chaque demande est qualifiée sous 48 h par un architecte intégrateur",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Un comportement que l'équipe contrôle à chaque demande, et qui débloque tout l'aval : un KBI.",
      },
      {
        id: "kbi-gabarit",
        label: "Les demandes standard passent par le gabarit en libre-service",
        kind: "kbi",
        timing: "leading",
        explanation:
          "Une pratique que l'équipe et ses clients choisissent d'appliquer : un comportement, donc un KBI.",
      },
      {
        id: "kpi-delai",
        label: "Délai de livraison d'une demande, de la demande à la livraison",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation:
          "Mesure la performance du processus lui-même : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-debit",
        label: "Demandes livrées par mois",
        kind: "kpi",
        timing: "lagging",
        isFlowMetric: true,
        explanation: "Le débit du processus : un KPI, et une métrique de flux.",
      },
      {
        id: "kpi-reprise",
        label: "Taux de demandes à reprendre après livraison",
        kind: "kpi",
        timing: "lagging",
        explanation: "La qualité de sortie du processus : un KPI.",
      },
      {
        id: "kgi-demarrage",
        label: "Part des projets des équipes de livraison qui démarrent à la date prévue",
        kind: "kgi",
        timing: "lagging",
        explanation:
          "Le résultat visé : des équipes clientes qui démarrent sans attendre. On ne l'influence qu'à travers les KBI et les KPI.",
      },
      {
        id: "piege-occupation",
        label: "Taux d'occupation des architectes intégrateurs",
        kind: "piege",
        explanation:
          "On mesurerait les personnes, pas le flux. Des architectes saturés ouvrent des accès plus lentement.",
      },
      {
        id: "piege-comparaison",
        label: "Nombre de demandes traitées, comparé entre architectes",
        kind: "piege",
        explanation:
          "Les demandes n'ont pas la même taille : cette comparaison juge les personnes au lieu d'éclairer le processus.",
      },
      {
        id: "piege-heures",
        label: "Heures supplémentaires de l'équipe",
        kind: "piege",
        explanation:
          "Mesure l'effort, pas le résultat, et récompense l'épuisement : exactement ce qu'un bon dispositif évite.",
      },
    ],
    chainFeedbacks: {
      success:
        "La chaîne tient : une qualification rapide en amont, la performance du flux d'accès au milieu, des projets qui démarrent à l'heure au bout. Le fluide circule.",
      violations: {
        empty: "Aucun bloc sélectionné. Une chaîne de mesure commence par choisir quoi observer.",
        "trap-included":
          "Un bloc piège s'est glissé dans la chaîne : il mesure les personnes ou l'effort, pas le flux. Retirez-le : c'est la première règle de la mesure.",
        "too-many":
          "Trop de cadrans : un tableau de bord qui mesure tout ne pilote rien. Gardez l'essentiel : un comportement, une ou deux performances, un résultat.",
        "no-kgi":
          "Aucun résultat visé dans la chaîne. Sans KGI, on livre des demandes dans le vide : pour qui fait-on tout ça ?",
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
    validExample: ["kbi-qualification", "kpi-delai", "kgi-demarrage"],
    quiz: [
      {
        id: "lire-tendance",
        palier: 1,
        question:
          "Le taux de demandes à reprendre après livraison : 9 % en mars, 2 % en avril, 8 % en mai, 3 % en juin. Que peut-on en dire ?",
        options: [
          {
            id: "instable",
            label: "Il oscille : rien ne prouve une amélioration, il faut lire la tendance sur la durée",
            correct: true,
            feedback:
              "Un indicateur se lit en tendance, jamais sur un point : deux bons mois isolés ne font pas un progrès.",
          },
          {
            id: "juin-bon",
            label: "Juin est bon, le problème est réglé",
            correct: false,
            feedback:
              "Mars et mai disaient déjà le contraire de leur mois suivant : un point isolé ne prouve rien.",
          },
          {
            id: "moyenne",
            label: "La moyenne est de 5,5 %, c'est le chiffre à retenir",
            correct: false,
            feedback:
              "La moyenne écrase justement ce que la série montre : une instabilité, qui est l'information la plus utile ici.",
          },
        ],
      },
      {
        id: "lire-deux-cadrans",
        palier: 1,
        question:
          "Le taux de reprise reste à 2 %, mais le délai de livraison d'une demande a doublé depuis deux mois. Que lire ?",
        options: [
          {
            id: "signal",
            label: "La qualité tient, mais quelque chose ralentit le flux : à investiguer",
            correct: true,
            feedback:
              "Deux cadrans se lisent ensemble : une qualité stable payée par un flux qui ralentit est un signal, pas une victoire.",
          },
          {
            id: "tout-va-bien",
            label: "Tout va bien : le taux de reprise est excellent",
            correct: false,
            feedback:
              "Un seul cadran ne suffit jamais : le délai qui double annonce des files d'attente, donc des projets clients retardés.",
          },
          {
            id: "ralentir",
            label: "Ralentir encore les ouvertures pour sécuriser davantage",
            correct: false,
            feedback:
              "C'est l'intuition inverse du flux : allonger l'attente ne fiabilise rien, elle accumule les demandes et la pression.",
          },
        ],
      },
      {
        id: "choisir-direction",
        palier: 2,
        question:
          "La direction demande : « les équipes de livraison démarrent-elles leurs projets à temps ? ». Quelle mesure répond à sa question ?",
        options: [
          {
            id: "demarrage",
            label: "La part des projets qui démarrent à la date prévue, en tendance",
            correct: true,
            feedback:
              "C'est le résultat vécu par les clients de la plateforme : un KGI, lu en tendance. Exactement la question posée.",
          },
          {
            id: "debit",
            label: "Le nombre de demandes livrées par mois",
            correct: false,
            feedback:
              "C'est la performance du processus, pas le résultat chez le client : livrer beaucoup ne garantit pas des projets à l'heure.",
          },
          {
            id: "occupation",
            label: "Le taux d'occupation des architectes intégrateurs",
            correct: false,
            feedback:
              "Piège classique : l'occupation mesure les personnes, pas le service rendu. Des architectes saturés ralentissent le flux.",
          },
        ],
      },
      {
        id: "choisir-equipe",
        palier: 2,
        question:
          "L'équipe veut un signal avancé, sous son contrôle, pour accélérer la livraison des demandes. Que choisir ?",
        options: [
          {
            id: "qualification",
            label: "Chaque demande qualifiée sous 48 h",
            correct: true,
            feedback:
              "Observable à chaque demande, décidé par l'équipe, débloque tout l'aval : un KBI.",
          },
          {
            id: "delai",
            label: "Le délai de livraison d'une demande",
            correct: false,
            feedback:
              "Précieux, mais il constate après coup : c'est la performance qui mesure, pas le levier qui accélère.",
          },
          {
            id: "heures",
            label: "Les heures supplémentaires de l'équipe",
            correct: false,
            feedback: "Mesure l'effort, pas le flux, et pousse au sur-régime : un piège.",
          },
        ],
      },
    ],
  },
  signature: {
    trapPattern: "document-objectif-departement-indicateur",
    theme: "plateforme-integration-ti",
  },
};
