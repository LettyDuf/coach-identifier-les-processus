/**
 * La classification à deux axes (DOMAINE.md §2).
 *
 * Les deux axes sont fermés et stables conceptuellement, donc ils
 * vivent dans le domaine (contrairement aux groupes de travail, D8).
 * On ne classe jamais les deux axes en même temps (D3).
 */

export const PROCESS_TYPES = ["pilotage", "operationnel", "support"] as const;
export type ProcessType = (typeof PROCESS_TYPES)[number];

export const PROCESS_LEVELS = ["equipe", "programme", "direction"] as const;
export type ProcessLevel = (typeof PROCESS_LEVELS)[number];

export type ClassAxis = "type" | "niveau";

/**
 * Le corrigé de classement d'un processus, rédigé dans le corpus :
 * la bonne case par axe, le pourquoi, et les messages de confusion
 * spécifiques aux mauvaises cases prévues (pièges du terrain).
 */
export type ClassificationSpec = {
  readonly type: ProcessType;
  readonly level: ProcessLevel;
  readonly typeRationale: string;
  readonly levelRationale: string;
  readonly typeTraps?: Partial<Record<ProcessType, string>>;
  readonly levelTraps?: Partial<Record<ProcessLevel, string>>;
};

export type ClassificationVerdict = {
  readonly correct: boolean;
  /** La bonne case de l'axe joué. */
  readonly expected: ProcessType | ProcessLevel;
  /** Message du corpus : rationale si juste, piège spécifique ou rationale sinon. */
  readonly message: string;
};

export type ClassificationOutcome = "success" | "miss";
