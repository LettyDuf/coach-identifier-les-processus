import { describe, expect, it } from "vitest";
import { createProcessCoachEngine } from "@domain/engine/ProcessCoachEngineImpl";
import type { ContentRepository } from "@domain/ports/ContentRepository";
import type { MasteryStore, SuccessfulPass } from "@domain/ports/MasteryStore";
import type { ProcessScenario } from "@domain/valueObjects/Scenario";

const scenario: ProcessScenario = {
  id: "s1",
  group: "equipe-agile",
  title: "Scénario moteur",
  narrative: [{ icon: "equipe", text: "Un récit de test suffisamment long pour le schéma." }],
  candidates: [
    {
      id: "p1",
      shortLabel: "Processus 1",
      icon: "demande",
      isProcess: true,
      explanation: "Entrée, transformation, sortie.",
      classification: {
        type: "operationnel",
        level: "equipe",
        typeRationale: "Il produit pour le client.",
        levelRationale: "Il vit dans l'équipe.",
      },
    },
    { id: "l1", shortLabel: "Leurre 1", icon: "tableau", isProcess: false, explanation: "C'est un outil, pas un processus." },
  ],
  spottingFeedbacks: {
    success: "Succès.",
    missed: "Manqués.",
    falsePositive: "Faux positifs.",
    mixed: "Mixte.",
  },
  classificationFeedbacks: {
    success: "Classement parfait.",
    miss: "Classement avec hésitations.",
  },
  signature: { trapPattern: "outil", theme: "test" },
};

function makeEngine() {
  const content: ContentRepository = {
    listGroups: () => [
      { id: "equipe-agile", label: "Équipe agile", tagline: "Test", open: true },
    ],
    listScenarios: (g) => (g === "equipe-agile" ? [scenario] : []),
    getScenario: (id) => (id === "s1" ? scenario : undefined),
  };
  const passes: SuccessfulPass[] = [];
  const masteryStore: MasteryStore = {
    readAllPasses: () => [...passes],
    appendPass: (p) => {
      passes.push(p);
    },
  };
  const engine = createProcessCoachEngine({
    content,
    masteryStore,
    clock: { now: () => 1000 },
    random: { nextInt: () => 0 }, // déterministe
  });
  return { engine, passes };
}

describe("ProcessCoachEngine", () => {
  it("enregistre une passe et fait progresser la maîtrise sur un succès", () => {
    const { engine, passes } = makeEngine();
    expect(engine.getMastery("reperer")).toBe("non-commencee");

    const report = engine.evaluateSpotting("s1", ["p1"]);
    expect(report.outcome).toBe("success");
    expect(passes).toHaveLength(1);
    expect(passes[0]).toMatchObject({ module: "reperer", at: 1000 });
    expect(engine.getMastery("reperer")).toBe("effleuree");
  });

  it("n'enregistre rien sur un échec", () => {
    const { engine, passes } = makeEngine();
    engine.evaluateSpotting("s1", ["p1", "l1"]);
    expect(passes).toHaveLength(0);
    expect(engine.getMastery("reperer")).toBe("non-commencee");
  });

  it("refuse un scénario inconnu", () => {
    const { engine } = makeEngine();
    expect(() => engine.evaluateSpotting("inconnu", [])).toThrow();
  });

  it("mélange les candidats sans en perdre", () => {
    const { engine } = makeEngine();
    const ids = engine.shuffledCandidateIds("s1");
    expect([...ids].sort()).toEqual(["l1", "p1"]);
  });

  it("tire un scénario du groupe via la source de hasard injectée", () => {
    const { engine } = makeEngine();
    expect(engine.pickScenario("equipe-agile")?.id).toBe("s1");
    expect(engine.pickScenario("groupe-vide")).toBeUndefined();
  });

  it("évalue un classement et sert le message du corpus", () => {
    const { engine } = makeEngine();
    const ok = engine.evaluateClassification("s1", "p1", "type", "operationnel");
    expect(ok).toMatchObject({ correct: true, message: "Il produit pour le client." });
    const ko = engine.evaluateClassification("s1", "p1", "niveau", "programme");
    expect(ko).toMatchObject({ correct: false, expected: "equipe" });
  });

  it("refuse d'évaluer le classement d'un leurre", () => {
    const { engine } = makeEngine();
    expect(() => engine.evaluateClassification("s1", "l1", "type", "support")).toThrow();
  });

  it("un parcours de classement parfait enregistre une passe du module classer", () => {
    const { engine, passes } = makeEngine();
    expect(engine.completeClassificationRun("s1", [true, true])).toBe("success");
    expect(passes).toHaveLength(1);
    expect(passes[0]).toMatchObject({ module: "classer" });
    expect(engine.getMastery("classer")).toBe("effleuree");
  });

  it("un parcours avec erreur n'enregistre rien", () => {
    const { engine, passes } = makeEngine();
    expect(engine.completeClassificationRun("s1", [true, false])).toBe("miss");
    expect(passes).toHaveLength(0);
  });
});
