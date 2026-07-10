import { describe, expect, it } from "vitest";
import { evaluateSpotting } from "@domain/services/SpottingEvaluator";
import type { ProcessScenario } from "@domain/valueObjects/Scenario";

const scenario: ProcessScenario = {
  id: "test",
  group: "equipe-agile",
  title: "Scénario de test",
  narrative: [{ icon: "equipe", text: "Un récit de test suffisamment long pour le schéma." }],
  candidates: [
    { id: "p1", shortLabel: "Processus 1", icon: "demande", isProcess: true, explanation: "Entrée, transformation, sortie." },
    { id: "p2", shortLabel: "Processus 2", icon: "balance", isProcess: true, explanation: "Entrée, transformation, sortie." },
    { id: "l1", shortLabel: "Leurre 1", icon: "tableau", isProcess: false, explanation: "C'est un outil, pas un processus." },
    { id: "l2", shortLabel: "Leurre 2", icon: "loupe", isProcess: false, explanation: "C'est un rôle, pas un processus." },
  ],
  spottingFeedbacks: {
    success: "Message de succès.",
    missed: "Message processus manqués.",
    falsePositive: "Message faux positifs.",
    mixed: "Message mixte.",
  },
  classificationFeedbacks: {
    success: "Classement parfait.",
    miss: "Classement avec hésitations.",
  },
  signature: { trapPattern: "test", theme: "test" },
};

describe("evaluateSpotting", () => {
  it("réussit quand tous les processus sont trouvés et aucun leurre coché", () => {
    const report = evaluateSpotting(scenario, ["p1", "p2"]);
    expect(report.outcome).toBe("success");
    expect(report.message).toBe("Message de succès.");
    expect(report.perCandidate.map((r) => r.verdict)).toEqual([
      "trouve",
      "trouve",
      "bien-ecarte",
      "bien-ecarte",
    ]);
  });

  it("signale les processus manqués sans faux positif", () => {
    const report = evaluateSpotting(scenario, ["p1"]);
    expect(report.outcome).toBe("miss");
    expect(report.message).toBe("Message processus manqués.");
    expect(report.perCandidate.find((r) => r.candidateId === "p2")?.verdict).toBe("manque");
  });

  it("signale les faux positifs quand tous les processus sont trouvés", () => {
    const report = evaluateSpotting(scenario, ["p1", "p2", "l1"]);
    expect(report.outcome).toBe("miss");
    expect(report.message).toBe("Message faux positifs.");
    expect(report.perCandidate.find((r) => r.candidateId === "l1")?.verdict).toBe("faux-positif");
  });

  it("choisit le message mixte quand il y a manqués ET faux positifs", () => {
    const report = evaluateSpotting(scenario, ["l1"]);
    expect(report.outcome).toBe("miss");
    expect(report.message).toBe("Message mixte.");
  });

  it("porte l'explication du corpus sur chaque verdict", () => {
    const report = evaluateSpotting(scenario, ["l2"]);
    expect(report.perCandidate.find((r) => r.candidateId === "l2")?.explanation).toBe(
      "C'est un rôle, pas un processus.",
    );
  });
});
