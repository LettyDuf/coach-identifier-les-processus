/**
 * Le contenu déclare des identifiants d'icônes ; l'UI doit tous les
 * connaître (sinon icône générique, acceptable mais signalé ici).
 */

import { describe, expect, it } from "vitest";
import { CANDIDATE_ICONS } from "@adapters/ui/icons/CandidateIcon";
import { ALL_SCENARIOS } from "@content/index";
import { LEVEL_OPTIONS, TYPE_OPTIONS } from "@content/axisGuide";

describe("CandidateIcon", () => {
  it("couvre toutes les icônes déclarées par le corpus", () => {
    const declared = new Set<string>();
    for (const s of ALL_SCENARIOS) {
      for (const v of s.narrative) declared.add(v.icon);
      for (const c of s.candidates) declared.add(c.icon);
    }
    for (const o of [...TYPE_OPTIONS, ...LEVEL_OPTIONS]) declared.add(o.icon);
    for (const id of declared) {
      expect(CANDIDATE_ICONS[id], `Icône manquante : ${id}`).toBeDefined();
    }
  });
});
