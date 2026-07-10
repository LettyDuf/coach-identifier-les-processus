/**
 * Évaluation du geste Repérer : comparaison ensembliste entre la
 * sélection de l'apprenant et le corrigé du scénario (D5).
 *
 * Règle de réussite : tous les processus trouvés ET aucun faux
 * positif. Le feedback reste pédagogique : verdict et explication
 * par candidat, message global choisi selon le type d'écart.
 */

import type { CandidateId } from "../valueObjects/ids";
import type { ProcessScenario } from "../valueObjects/Scenario";
import type { CandidateReport, SpottingReport } from "../valueObjects/Spotting";

export function evaluateSpotting(
  scenario: ProcessScenario,
  selected: ReadonlyArray<CandidateId>,
): SpottingReport {
  const selectedSet = new Set(selected);

  const perCandidate: CandidateReport[] = scenario.candidates.map((c) => {
    const isSelected = selectedSet.has(c.id);
    const verdict = c.isProcess
      ? isSelected
        ? "trouve"
        : "manque"
      : isSelected
        ? "faux-positif"
        : "bien-ecarte";
    return {
      candidateId: c.id,
      label: c.shortLabel,
      verdict,
      explanation: c.explanation,
    };
  });

  const hasMissed = perCandidate.some((r) => r.verdict === "manque");
  const hasFalsePositive = perCandidate.some((r) => r.verdict === "faux-positif");

  const f = scenario.spottingFeedbacks;
  const message =
    !hasMissed && !hasFalsePositive
      ? f.success
      : hasMissed && hasFalsePositive
        ? f.mixed
        : hasMissed
          ? f.missed
          : f.falsePositive;

  return {
    perCandidate,
    outcome: !hasMissed && !hasFalsePositive ? "success" : "miss",
    message,
  };
}
