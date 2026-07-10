/**
 * Port d'entrée (driving) : la façade unique du moteur.
 *
 * L'UI ne connaît que ce contrat. Trois gestes prévus ; seul Repérer
 * est exposé en V1 incrément 1 (pas de méthode pour des mécaniques
 * hypothétiques, arbitrage du panel architecture).
 */

import type { CandidateId, ModuleId, ScenarioId, WorkGroupId } from "../valueObjects/ids";
import type { MasteryLevel } from "../valueObjects/Mastery";
import type { ProcessScenario, WorkGroup } from "../valueObjects/Scenario";
import type { SpottingReport } from "../valueObjects/Spotting";
import type {
  ClassAxis,
  ClassificationOutcome,
  ClassificationVerdict,
  ProcessLevel,
  ProcessType,
} from "../valueObjects/Classification";
import type { ChainReport, MeasureContent, QuizVerdict } from "../valueObjects/Measure";

export type ProcessCoachEngine = {
  listGroups(): ReadonlyArray<WorkGroup>;
  listScenarios(group: WorkGroupId): ReadonlyArray<ProcessScenario>;
  getScenario(id: ScenarioId): ProcessScenario | undefined;

  /**
   * Tire un scénario du groupe (source de hasard injectée) : la
   * variation entre scénarios nourrit la consolidation (D7).
   */
  pickScenario(group: WorkGroupId): ProcessScenario | undefined;

  /**
   * Présente les candidats d'un scénario dans un ordre mélangé,
   * stable pour une même graine (RandomSource injectée).
   */
  shuffledCandidateIds(id: ScenarioId): ReadonlyArray<CandidateId>;

  /**
   * Évalue une sélection. Enregistre la passe réussie dans le suivi
   * de maîtrise quand le résultat est un succès.
   */
  evaluateSpotting(id: ScenarioId, selected: ReadonlyArray<CandidateId>): SpottingReport;

  /**
   * Évalue le classement d'un processus sur UN axe (jamais les deux
   * ensemble, D3). Le message vient du corpus.
   */
  evaluateClassification(
    id: ScenarioId,
    candidateId: CandidateId,
    axis: ClassAxis,
    value: ProcessType | ProcessLevel,
  ): ClassificationVerdict;

  /**
   * Clôt un parcours de classement (les deux axes joués). Enregistre
   * la passe de maîtrise si toutes les réponses étaient justes du
   * premier coup.
   */
  completeClassificationRun(
    id: ScenarioId,
    firstTryResults: ReadonlyArray<boolean>,
  ): ClassificationOutcome;

  /** Le matériau du geste Mesurer d'un scénario. Lance si absent. */
  getMeasureContent(id: ScenarioId): MeasureContent;

  /** Paliers Lire et Choisir : répond à un item de QCM. */
  evaluateQuiz(id: ScenarioId, itemId: string, optionId: string): QuizVerdict;

  /**
   * Palier 3 : vérifie la chaîne construite. Enregistre la passe de
   * maîtrise sur un succès.
   */
  evaluateMeasureChain(id: ScenarioId, selectedBlockIds: ReadonlyArray<string>): ChainReport;

  getMastery(module: ModuleId): MasteryLevel;
};
