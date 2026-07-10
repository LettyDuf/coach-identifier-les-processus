/**
 * Résultat du geste Repérer.
 *
 * Le verdict est rendu par candidat (pédagogie du pourquoi), et
 * globalement : la réussite exige tous les processus trouvés ET zéro
 * faux positif (arbitrage consigné, panel architecture).
 */

import type { CandidateId } from "./ids";

export type CandidateVerdict =
  | "trouve"
  | "manque"
  | "faux-positif"
  | "bien-ecarte";

export type CandidateReport = {
  readonly candidateId: CandidateId;
  readonly label: string;
  readonly verdict: CandidateVerdict;
  readonly explanation: string;
};

export type SpottingOutcome = "success" | "miss";

export type SpottingReport = {
  readonly perCandidate: ReadonlyArray<CandidateReport>;
  readonly outcome: SpottingOutcome;
  /** Message global, sélectionné parmi ceux du corpus. */
  readonly message: string;
};
