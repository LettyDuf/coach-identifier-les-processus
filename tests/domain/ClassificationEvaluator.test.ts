import { describe, expect, it } from "vitest";
import {
  evaluateClassification,
  summarizeClassificationRun,
} from "@domain/services/ClassificationEvaluator";
import type { ClassificationSpec } from "@domain/valueObjects/Classification";

const spec: ClassificationSpec = {
  type: "operationnel",
  level: "equipe",
  typeRationale: "Il produit directement pour le client.",
  levelRationale: "Il vit dans une seule équipe.",
  typeTraps: {
    support: "Piège du mot support : c'est un guichet, pas le type.",
  },
};

describe("evaluateClassification", () => {
  it("valide la bonne case avec le rationale du corpus", () => {
    const v = evaluateClassification(spec, "type", "operationnel");
    expect(v.correct).toBe(true);
    expect(v.message).toBe("Il produit directement pour le client.");
    expect(v.expected).toBe("operationnel");
  });

  it("sert le message de confusion spécifique quand le piège est prévu", () => {
    const v = evaluateClassification(spec, "type", "support");
    expect(v.correct).toBe(false);
    expect(v.message).toBe("Piège du mot support : c'est un guichet, pas le type.");
  });

  it("retombe sur le rationale quand la mauvaise case n'a pas de piège dédié", () => {
    const v = evaluateClassification(spec, "type", "pilotage");
    expect(v.correct).toBe(false);
    expect(v.message).toBe("Il produit directement pour le client.");
  });

  it("évalue l'axe niveau indépendamment du type", () => {
    const v = evaluateClassification(spec, "niveau", "programme");
    expect(v.correct).toBe(false);
    expect(v.expected).toBe("equipe");
    expect(v.message).toBe("Il vit dans une seule équipe.");
  });
});

describe("summarizeClassificationRun", () => {
  it("réussit seulement si tout est juste du premier coup", () => {
    expect(summarizeClassificationRun([true, true, true])).toBe("success");
    expect(summarizeClassificationRun([true, false, true])).toBe("miss");
    expect(summarizeClassificationRun([])).toBe("miss");
  });
});
