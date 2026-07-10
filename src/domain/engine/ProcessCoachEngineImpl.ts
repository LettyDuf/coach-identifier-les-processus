/**
 * Implémentation du moteur. Orchestration pure : le contenu vient du
 * ContentRepository, l'évaluation des services, la progression du
 * MasteryStore. Aucune formulation de texte ici.
 */

import type { ProcessCoachEngine } from "../ports/ProcessCoachEngine";
import type { ContentRepository } from "../ports/ContentRepository";
import type { MasteryStore } from "../ports/MasteryStore";
import type { Clock } from "../ports/Clock";
import type { RandomSource } from "../ports/RandomSource";
import type { CandidateId, ModuleId, ScenarioId, WorkGroupId } from "../valueObjects/ids";
import type { SpottingReport } from "../valueObjects/Spotting";
import type {
  ClassAxis,
  ClassificationOutcome,
  ClassificationVerdict,
  ProcessLevel,
  ProcessType,
} from "../valueObjects/Classification";
import type { ChainReport, MeasureContent, QuizVerdict } from "../valueObjects/Measure";
import { evaluateSpotting } from "../services/SpottingEvaluator";
import {
  evaluateClassification,
  summarizeClassificationRun,
} from "../services/ClassificationEvaluator";
import { evaluateMeasureChain } from "../services/MeasureChainEvaluator";
import { evaluateQuizAnswer } from "../services/QuizEvaluator";
import { computeMasteryLevel } from "../services/MasteryProgressor";

export type EngineDeps = {
  readonly content: ContentRepository;
  readonly masteryStore: MasteryStore;
  readonly clock: Clock;
  readonly random: RandomSource;
};

export function createProcessCoachEngine(deps: EngineDeps): ProcessCoachEngine {
  const { content, masteryStore, clock, random } = deps;

  function requireScenario(id: ScenarioId) {
    const scenario = content.getScenario(id);
    if (!scenario) {
      throw new Error(`Scénario inconnu : ${id}`);
    }
    return scenario;
  }

  return {
    listGroups: () => content.listGroups(),
    listScenarios: (group: WorkGroupId) => content.listScenarios(group),
    getScenario: (id: ScenarioId) => content.getScenario(id),

    pickScenario(group: WorkGroupId) {
      const list = content.listScenarios(group);
      if (list.length === 0) return undefined;
      return list[random.nextInt(list.length)];
    },

    shuffledCandidateIds(id: ScenarioId): ReadonlyArray<CandidateId> {
      const ids = requireScenario(id).candidates.map((c) => c.id);
      // Fisher-Yates avec la source injectée : déterministe en test.
      for (let i = ids.length - 1; i > 0; i -= 1) {
        const j = random.nextInt(i + 1);
        const tmp = ids[i]!;
        ids[i] = ids[j]!;
        ids[j] = tmp;
      }
      return ids;
    },

    evaluateSpotting(id: ScenarioId, selected: ReadonlyArray<CandidateId>): SpottingReport {
      const scenario = requireScenario(id);
      const report = evaluateSpotting(scenario, selected);
      if (report.outcome === "success") {
        masteryStore.appendPass({
          module: "reperer",
          signature: scenario.signature,
          at: clock.now(),
        });
      }
      return report;
    },

    evaluateClassification(
      id: ScenarioId,
      candidateId: CandidateId,
      axis: ClassAxis,
      value: ProcessType | ProcessLevel,
    ): ClassificationVerdict {
      const scenario = requireScenario(id);
      const candidate = scenario.candidates.find((c) => c.id === candidateId);
      if (!candidate?.classification) {
        throw new Error(`Candidat sans corrigé de classement : ${candidateId}`);
      }
      return evaluateClassification(candidate.classification, axis, value);
    },

    completeClassificationRun(
      id: ScenarioId,
      firstTryResults: ReadonlyArray<boolean>,
    ): ClassificationOutcome {
      const scenario = requireScenario(id);
      const outcome = summarizeClassificationRun(firstTryResults);
      if (outcome === "success") {
        masteryStore.appendPass({
          module: "classer",
          signature: scenario.signature,
          at: clock.now(),
        });
      }
      return outcome;
    },

    getMeasureContent(id: ScenarioId): MeasureContent {
      const scenario = requireScenario(id);
      if (!scenario.measure) {
        throw new Error(`Scénario sans matériau de mesure : ${id}`);
      }
      return scenario.measure;
    },

    evaluateQuiz(id: ScenarioId, itemId: string, optionId: string): QuizVerdict {
      const measure = this.getMeasureContent(id);
      const item = measure.quiz.find((q) => q.id === itemId);
      if (!item) {
        throw new Error(`Item de quiz inconnu : ${itemId}`);
      }
      return evaluateQuizAnswer(item, optionId);
    },

    evaluateMeasureChain(id: ScenarioId, selectedBlockIds: ReadonlyArray<string>): ChainReport {
      const scenario = requireScenario(id);
      const measure = this.getMeasureContent(id);
      const report = evaluateMeasureChain(
        measure.blocks,
        selectedBlockIds,
        measure.chainFeedbacks,
        measure.maxChainBlocks,
      );
      if (report.outcome === "success") {
        masteryStore.appendPass({
          module: "mesurer",
          signature: scenario.signature,
          at: clock.now(),
        });
      }
      return report;
    },

    getMastery: (module: ModuleId) =>
      computeMasteryLevel(masteryStore.readAllPasses(), module),
  };
}
