/**
 * Intégrité du matériau du geste Mesurer.
 */

import { describe, expect, it } from "vitest";
import { ALL_SCENARIOS } from "@content/index";
import { evaluateMeasureChain, evaluateQuizAnswer } from "@domain/index";

describe("corpus mesure", () => {
  it("chaque scénario porte son matériau de mesure", () => {
    for (const s of ALL_SCENARIOS) {
      expect(s.measure, `Scénario ${s.id}`).toBeDefined();
    }
  });

  it("la chaîne de référence de chaque scénario est valide", () => {
    for (const s of ALL_SCENARIOS) {
      const m = s.measure!;
      const report = evaluateMeasureChain(
        m.blocks,
        [...m.validExample],
        m.chainFeedbacks,
        m.maxChainBlocks,
      );
      expect(report.outcome, `Scénario ${s.id} : ${report.violations.join(", ")}`).toBe("success");
    }
  });

  it("tout sélectionner ne gagne pas (l'exercice force un choix)", () => {
    for (const s of ALL_SCENARIOS) {
      const m = s.measure!;
      const tout = m.blocks.filter((b) => b.kind !== "piege").map((b) => b.id);
      const report = evaluateMeasureChain(m.blocks, tout, m.chainFeedbacks, m.maxChainBlocks);
      expect(report.outcome, `Scénario ${s.id}`).toBe("miss");
    }
  });

  it("chaque item de quiz a exactement une bonne réponse et des feedbacks partout", () => {
    for (const s of ALL_SCENARIOS) {
      for (const q of s.measure!.quiz) {
        expect(q.options.filter((o) => o.correct), `Item ${q.id}`).toHaveLength(1);
        const bonne = q.options.find((o) => o.correct)!;
        expect(evaluateQuizAnswer(q, bonne.id).correct).toBe(true);
        for (const o of q.options) {
          expect(o.feedback.trim().length, `Feedback vide : ${q.id}/${o.id}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it("les métriques de flux sont des KPI (D4), jamais un autre type", () => {
    for (const s of ALL_SCENARIOS) {
      for (const b of s.measure!.blocks.filter((b) => b.isFlowMetric)) {
        expect(b.kind, `Bloc ${b.id}`).toBe("kpi");
      }
    }
  });

  it("aucun tiret long dans les textes de mesure", () => {
    for (const s of ALL_SCENARIOS) {
      const m = s.measure!;
      const textes = [
        m.processLabel,
        m.chainExample,
        m.chainFeedbacks.success,
        ...Object.values(m.chainFeedbacks.violations),
        ...m.blocks.flatMap((b) => [b.label, b.explanation]),
        ...m.quiz.flatMap((q) => [q.question, ...q.options.flatMap((o) => [o.label, o.feedback])]),
      ];
      for (const t of textes) {
        expect(t.includes("—"), `Tiret long dans : ${t}`).toBe(false);
      }
    }
  });
});
