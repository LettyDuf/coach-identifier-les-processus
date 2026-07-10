/**
 * Évaluation des paliers 1 et 2 (QCM). Le moteur sélectionne le
 * feedback de l'option choisie, rédigé dans le corpus.
 */

import type { QuizItem, QuizVerdict } from "../valueObjects/Measure";

export function evaluateQuizAnswer(item: QuizItem, optionId: string): QuizVerdict {
  const option = item.options.find((o) => o.id === optionId);
  if (!option) {
    throw new Error(`Option inconnue : ${optionId} (item ${item.id})`);
  }
  return { correct: option.correct, feedback: option.feedback };
}
