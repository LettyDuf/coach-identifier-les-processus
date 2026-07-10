/**
 * Port de sortie (driven) : accès au contenu pédagogique.
 *
 * Le domaine ignore d'où viennent les scénarios (données TS validées
 * par schéma en V1). Ajouter un groupe de travail ne touche jamais ce
 * port (D8).
 */

import type { ScenarioId, WorkGroupId } from "../valueObjects/ids";
import type { ProcessScenario, WorkGroup } from "../valueObjects/Scenario";

export type ContentRepository = {
  listGroups(): ReadonlyArray<WorkGroup>;
  listScenarios(group: WorkGroupId): ReadonlyArray<ProcessScenario>;
  getScenario(id: ScenarioId): ProcessScenario | undefined;
};
