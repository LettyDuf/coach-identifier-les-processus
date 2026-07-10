/**
 * La théorie de la grille de classement : pure donnée pédagogique
 * (DOMAINE.md §2), affichée à la demande, jamais imposée.
 *
 * PROPOSITION à valider par Lætitia : les 9 exemples de la grille
 * croisée sont du contenu métier.
 */

import type { ProcessLevel, ProcessType } from "@domain/index";

export type TheoryEntry = {
  readonly label: string;
  readonly description: string;
};

export const THEORY_KEY_MESSAGE =
  "Les deux axes sont indépendants : chaque type de processus existe à chaque niveau. Le type dit ce que le processus fait ; le niveau dit où il vit.";

/** Le pont avec la carte à trois zooms : mêmes niveaux, deux vocabulaires. */
export const THEORY_BRIDGE =
  "Les niveaux de la grille sont les zooms de la carte : équipe correspond à la vue micro, programme à la vue médium, direction à la vue macro. Deux fiches, une seule réalité.";

export const TYPE_THEORY: Record<ProcessType, TheoryEntry> = {
  pilotage: {
    label: "Pilotage",
    description:
      "Il oriente et décide : il ne produit rien que le client final reçoive, il règle la façon dont les autres processus tournent.",
  },
  operationnel: {
    label: "Opérationnel",
    description:
      "Il produit directement ce que le client attend : c'est la chaîne de valeur, celle que le client voit.",
  },
  support: {
    label: "Support",
    description:
      "Il fournit les moyens : personnes, outils, budget. Sans lui, tout s'arrête, même si le client ne le voit jamais. Support ne veut pas dire moins important.",
  },
};

export const LEVEL_THEORY: Record<ProcessLevel, TheoryEntry> = {
  equipe: {
    label: "Équipe",
    description:
      "Il vit à l'intérieur d'une seule équipe, qui peut l'observer et l'améliorer sans demander la permission à personne.",
  },
  programme: {
    label: "Programme",
    description:
      "Il traverse plusieurs équipes d'un même produit : aucune équipe ne le possède seule, il faut se coordonner pour l'améliorer.",
  },
  direction: {
    label: "Direction",
    description:
      "Il engage l'organisation entière : ses décisions structurent le travail de tous.",
  },
};

/** Un exemple concret par case de la grille croisée type x niveau. */
export const GRID_EXAMPLES: Record<ProcessType, Record<ProcessLevel, string>> = {
  pilotage: {
    equipe: "La boucle d'amélioration continue : rétrospective, action, vérification.",
    programme: "L'arbitrage des priorités entre les demandes transverses en attente.",
    direction: "La revue stratégique qui alloue les budgets et fixe les grands caps.",
  },
  operationnel: {
    equipe: "Le traitement d'une demande client, de son arrivée à la livraison.",
    programme: "La gestion de la demande transversale, de la réception à la mise en service.",
    direction: "Le parcours complet d'un client, de la commande à la facturation.",
  },
  support: {
    equipe: "L'intégration d'une nouvelle équipière, de la signature à l'autonomie.",
    programme: "La mise à disposition d'une plateforme commune à toutes les équipes.",
    direction: "Le recrutement, la paie, les achats : les moyens de toute l'organisation.",
  },
};
