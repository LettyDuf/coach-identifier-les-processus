/**
 * Identifiants du domaine.
 *
 * WorkGroupId est volontairement une chaîne ouverte (DECISIONS.md D8) :
 * ajouter un groupe de travail se fait par pur ajout de contenu, le
 * domaine n'énumère jamais les groupes.
 */

export type WorkGroupId = string;
export type ScenarioId = string;
export type CandidateId = string;

/** Les trois gestes du parcours. Stables conceptuellement, donc fermés. */
export type ModuleId = "reperer" | "classer" | "mesurer";
