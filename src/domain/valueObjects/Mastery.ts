/**
 * État de maîtrise par module (repris du modèle validé de Coach Risques,
 * réutilisé par Coach Example Mapping ; DECISIONS.md D7 de ce projet).
 *
 * 4 états qualitatifs, pas de score numérique. La consolidation se
 * mérite par variation (items de signatures distinctes), pas par
 * répétition du même item.
 */

import type { ModuleId } from "./ids";

export type MasteryLevel =
  | "non-commencee"
  | "effleuree"
  | "travaillee"
  | "consolidee";

export const MASTERY_LEVELS: ReadonlyArray<MasteryLevel> = [
  "non-commencee",
  "effleuree",
  "travaillee",
  "consolidee",
] as const;

/** Signature pédagogique d'un item : sert à mesurer la variation. */
export type ItemSignature = {
  readonly trapPattern: string;
  readonly theme: string;
};

export type ModuleMastery = {
  readonly module: ModuleId;
  readonly level: MasteryLevel;
};
