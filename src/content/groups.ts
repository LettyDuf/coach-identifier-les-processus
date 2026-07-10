/**
 * Les groupes de travail : pure donnée (D8). Ouvrir un atelier = passer
 * open à true et fournir ses scénarios, sans toucher au code.
 */

import type { WorkGroup } from "@domain/valueObjects/Scenario";

export const GROUPS: ReadonlyArray<WorkGroup> = [
  {
    id: "equipe-agile",
    label: "Équipe agile",
    tagline: "Les processus vécus au ras de l'équipe : livraison, demandes, amélioration.",
    open: true,
  },
  {
    id: "programme",
    label: "Programme",
    tagline: "Les processus transverses qu'aucune équipe ne possède seule : gestion de la demande, arbitrages, moyens communs.",
    open: true,
  },
  {
    id: "management-direction",
    label: "Management / direction",
    tagline: "Pilotage, budget, priorisation stratégique.",
    open: false,
  },
];
