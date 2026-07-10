/**
 * Point d'entrée du contenu pédagogique. Valide tout au chargement :
 * un contenu invalide fait échouer bruyamment le build et les tests.
 */

import type { ProcessScenario, WorkGroup } from "@domain/valueObjects/Scenario";
import { GROUPS } from "./groups";
import { COLIBRI } from "./scenarios/equipe-agile/colibri";
import { HARFANG } from "./scenarios/equipe-agile/harfang";
import { GESTION_DEMANDE } from "./scenarios/programme/gestion-demande";
import { validateContent } from "./schema";

export const ALL_GROUPS: ReadonlyArray<WorkGroup> = GROUPS;
export const ALL_SCENARIOS: ReadonlyArray<ProcessScenario> = [COLIBRI, HARFANG, GESTION_DEMANDE];

validateContent(ALL_GROUPS, ALL_SCENARIOS);

export { validateContent };
