import { describe, expect, it } from "vitest";
import { evaluateMeasureChain } from "@domain/services/MeasureChainEvaluator";
import type { ChainFeedbacks, MeasureBlock } from "@domain/valueObjects/Measure";

const blocks: MeasureBlock[] = [
  { id: "kbi", label: "Un comportement", kind: "kbi", timing: "leading", explanation: "Comportement contrôlable de l'équipe." },
  { id: "kpi", label: "Une performance", kind: "kpi", timing: "lagging", isFlowMetric: true, explanation: "Performance du processus." },
  { id: "kpi2", label: "Une autre performance", kind: "kpi", timing: "lagging", explanation: "Performance du processus aussi." },
  { id: "kgi", label: "Un résultat", kind: "kgi", timing: "lagging", explanation: "Le résultat visé au bout." },
  { id: "kgi2", label: "Un autre résultat", kind: "kgi", timing: "lagging", explanation: "Un second résultat visé." },
  { id: "piege", label: "Un piège", kind: "piege", explanation: "On mesurerait les gens, pas le flux." },
];

const feedbacks: ChainFeedbacks = {
  success: "Succès.",
  violations: {
    empty: "Vide.",
    "trap-included": "Piège inclus.",
    "too-many": "Trop de cadrans.",
    "no-kgi": "Pas de KGI.",
    "multiple-kgi": "Trop de KGI.",
    "missing-kpi": "Pas de KPI.",
    "missing-kbi": "Pas de KBI.",
    "missing-leading": "Pas de leading.",
    "missing-lagging": "Pas de lagging.",
  },
};

const run = (ids: string[]) => evaluateMeasureChain(blocks, ids, feedbacks, 4);

describe("evaluateMeasureChain", () => {
  it("valide une chaîne complète", () => {
    const r = run(["kbi", "kpi", "kgi"]);
    expect(r.outcome).toBe("success");
    expect(r.violations).toEqual([]);
    expect(r.message).toBe("Succès.");
  });

  it("refuse la chaîne vide", () => {
    expect(run([]).message).toBe("Vide.");
  });

  it("le piège prime sur tout le reste dans le message", () => {
    const r = run(["piege"]);
    expect(r.outcome).toBe("miss");
    expect(r.violations[0]).toBe("trap-included");
    expect(r.message).toBe("Piège inclus.");
  });

  it("exige exactement un KGI", () => {
    expect(run(["kbi", "kpi"]).violations).toContain("no-kgi");
    expect(run(["kbi", "kpi", "kgi", "kgi2"]).violations).toContain("multiple-kgi");
  });

  it("exige au moins un KPI et un KBI", () => {
    expect(run(["kbi", "kgi"]).violations).toContain("missing-kpi");
    expect(run(["kpi", "kgi"]).violations).toContain("missing-kbi");
  });

  it("exige au moins un leading et un lagging", () => {
    const r = run(["kpi", "kpi2", "kgi"]);
    expect(r.violations).toContain("missing-leading");
  });

  it("refuse l'usine à métriques : tout sélectionner ne gagne pas", () => {
    const r = run(["kbi", "kpi", "kpi2", "kgi", "kgi2"]);
    expect(r.violations).toContain("too-many");
  });
});
