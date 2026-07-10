/**
 * Port de sortie (driven) : suivi de la progression.
 *
 * V1 : store en mémoire uniquement, pas de persistance entre sessions
 * (aligné sur les coachs frères, D7).
 */

import type { ModuleId } from "../valueObjects/ids";
import type { ItemSignature } from "../valueObjects/Mastery";

/** Trace minimale d'un exercice réussi : quel module, quelle signature, quand. */
export type SuccessfulPass = {
  readonly module: ModuleId;
  readonly signature: ItemSignature;
  readonly at: number; // epoch ms, fourni par Clock pour la testabilité
};

export type MasteryStore = {
  readAllPasses(): ReadonlyArray<SuccessfulPass>;
  appendPass(pass: SuccessfulPass): void;
};
