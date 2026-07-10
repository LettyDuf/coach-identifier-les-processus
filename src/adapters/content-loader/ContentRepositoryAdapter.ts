/**
 * Adaptateur driven : sert le contenu validé au domaine.
 */

import type { ContentRepository } from "@domain/index";
import { ALL_GROUPS, ALL_SCENARIOS } from "@content/index";

export function createContentRepository(): ContentRepository {
  return {
    listGroups: () => ALL_GROUPS,
    listScenarios: (group) => ALL_SCENARIOS.filter((s) => s.group === group),
    getScenario: (id) => ALL_SCENARIOS.find((s) => s.id === id),
  };
}
