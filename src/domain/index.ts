/**
 * Surface publique du domaine. Les adaptateurs n'importent que d'ici.
 */

export type { ProcessCoachEngine } from "./ports/ProcessCoachEngine";
export type { ContentRepository } from "./ports/ContentRepository";
export type { MasteryStore, SuccessfulPass } from "./ports/MasteryStore";
export type { Clock } from "./ports/Clock";
export type { RandomSource } from "./ports/RandomSource";
export type { WorkGroupId, ScenarioId, CandidateId, ModuleId } from "./valueObjects/ids";
export type {
  ProcessScenario,
  ProcessCandidate,
  ProcessIdentity,
  NarrativeScene,
  SpottingFeedbacks,
  ClassificationFeedbacks,
  WorkGroup,
} from "./valueObjects/Scenario";
export type {
  ProcessType,
  ProcessLevel,
  ClassAxis,
  ClassificationSpec,
  ClassificationVerdict,
  ClassificationOutcome,
} from "./valueObjects/Classification";
export { PROCESS_TYPES, PROCESS_LEVELS } from "./valueObjects/Classification";
export type {
  MeasureBlock,
  MeasureBlockKind,
  MeasureTiming,
  MeasureContent,
  ChainReport,
  ChainViolation,
  ChainFeedbacks,
  QuizItem,
  QuizOption,
  QuizVerdict,
} from "./valueObjects/Measure";
export {
  evaluateClassification,
  summarizeClassificationRun,
} from "./services/ClassificationEvaluator";
export { evaluateMeasureChain } from "./services/MeasureChainEvaluator";
export { evaluateQuizAnswer } from "./services/QuizEvaluator";
export type {
  SpottingReport,
  CandidateReport,
  CandidateVerdict,
  SpottingOutcome,
} from "./valueObjects/Spotting";
export type { MasteryLevel, ItemSignature, ModuleMastery } from "./valueObjects/Mastery";
export { MASTERY_LEVELS } from "./valueObjects/Mastery";
export { createProcessCoachEngine } from "./engine/ProcessCoachEngineImpl";
export { evaluateSpotting } from "./services/SpottingEvaluator";
export { computeMasteryLevel, SEUILS_V1 } from "./services/MasteryProgressor";
