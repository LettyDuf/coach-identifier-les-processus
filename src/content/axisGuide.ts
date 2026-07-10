/**
 * Les guides des deux axes de classement : la question vulgarisée qui
 * aide à choisir (DOMAINE.md §2). Pure donnée pédagogique.
 *
 * Ici les icônes catégorielles sont légitimes : ce sont les cibles de
 * la réponse, pas les candidats (contrairement à la règle D12 côté
 * cartes).
 */

import type { ProcessLevel, ProcessType } from "@domain/index";

export type AxisOption<V extends string> = {
  readonly value: V;
  readonly label: string;
  readonly hint: string;
  readonly icon: string;
};

export const TYPE_OPTIONS: ReadonlyArray<AxisOption<ProcessType>> = [
  {
    value: "pilotage",
    label: "Pilotage",
    hint: "Ça oriente et ça décide comment on travaille.",
    icon: "boussole",
  },
  {
    value: "operationnel",
    label: "Opérationnel",
    hint: "Ça produit directement ce que le client attend.",
    icon: "engrenage",
  },
  {
    value: "support",
    label: "Support",
    hint: "Ça fournit les moyens aux autres processus.",
    icon: "pilier",
  },
];

export const LEVEL_OPTIONS: ReadonlyArray<AxisOption<ProcessLevel>> = [
  {
    value: "equipe",
    label: "Équipe",
    hint: "Il vit à l'intérieur d'une seule équipe.",
    icon: "equipe",
  },
  {
    value: "programme",
    label: "Programme",
    hint: "Il traverse plusieurs équipes d'un même produit.",
    icon: "reseau",
  },
  {
    value: "direction",
    label: "Direction",
    hint: "Il engage l'organisation entière.",
    icon: "fanion",
  },
];
