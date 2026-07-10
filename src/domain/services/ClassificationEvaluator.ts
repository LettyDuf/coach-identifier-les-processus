/**
 * Évaluation du geste Classer : affectation exacte par axe, feedback
 * de confusion par case erronée (le moteur sélectionne le message du
 * corpus, il ne formule jamais).
 *
 * Règle de réussite d'un parcours complet : toutes les cartes justes
 * du premier coup, sur les deux axes.
 */

import type {
  ClassAxis,
  ClassificationOutcome,
  ClassificationSpec,
  ClassificationVerdict,
  ProcessLevel,
  ProcessType,
} from "../valueObjects/Classification";

export function evaluateClassification(
  spec: ClassificationSpec,
  axis: ClassAxis,
  value: ProcessType | ProcessLevel,
): ClassificationVerdict {
  if (axis === "type") {
    const correct = value === spec.type;
    return {
      correct,
      expected: spec.type,
      message: correct
        ? spec.typeRationale
        : (spec.typeTraps?.[value as ProcessType] ?? spec.typeRationale),
    };
  }
  const correct = value === spec.level;
  return {
    correct,
    expected: spec.level,
    message: correct
      ? spec.levelRationale
      : (spec.levelTraps?.[value as ProcessLevel] ?? spec.levelRationale),
  };
}

/** Un parcours est réussi si chaque réponse était juste du premier coup. */
export function summarizeClassificationRun(
  firstTryResults: ReadonlyArray<boolean>,
): ClassificationOutcome {
  return firstTryResults.length > 0 && firstTryResults.every(Boolean)
    ? "success"
    : "miss";
}
