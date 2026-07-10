/**
 * Intégrité du corpus pédagogique : le contenu chargé passe le schéma
 * et respecte les règles de rédaction (dont : aucun tiret long,
 * exigence de Lætitia sur tout texte destiné à l'apprenant).
 */

import { describe, expect, it } from "vitest";
import { ALL_GROUPS, ALL_SCENARIOS, validateContent } from "@content/index";
import {
  GRID_EXAMPLES,
  LEVEL_THEORY,
  THEORY_KEY_MESSAGE,
  TYPE_THEORY,
} from "@content/theory";
import { evaluateSpotting, PROCESS_LEVELS, PROCESS_TYPES } from "@domain/index";

describe("corpus", () => {
  it("valide le schéma au chargement", () => {
    expect(() => validateContent(ALL_GROUPS, ALL_SCENARIOS)).not.toThrow();
  });

  it("contient les scénarios Colibri et Harfang avec 5 processus et 4 leurres chacun", () => {
    for (const id of ["colibri", "harfang"]) {
      const s = ALL_SCENARIOS.find((x) => x.id === id);
      expect(s, id).toBeDefined();
      expect(s!.candidates.filter((c) => c.isProcess), id).toHaveLength(5);
      expect(s!.candidates.filter((c) => !c.isProcess), id).toHaveLength(4);
    }
  });

  it("le scénario gestion-demande (groupe programme) a 3 processus et 4 leurres, tous de niveau programme", () => {
    const s = ALL_SCENARIOS.find((x) => x.id === "gestion-demande");
    expect(s).toBeDefined();
    expect(s!.group).toBe("programme");
    const processes = s!.candidates.filter((c) => c.isProcess);
    expect(processes).toHaveLength(3);
    expect(s!.candidates.filter((c) => !c.isProcess)).toHaveLength(4);
    for (const p of processes) {
      expect(p.classification?.level, p.id).toBe("programme");
    }
    const types = new Set(processes.map((p) => p.classification?.type));
    expect(types).toEqual(new Set(["pilotage", "operationnel", "support"]));
  });

  it("les signatures des scénarios d'un même groupe sont distinctes (consolidation par variation)", () => {
    const parGroupe = new Map<string, string[]>();
    for (const s of ALL_SCENARIOS) {
      const list = parGroupe.get(s.group) ?? [];
      list.push(s.signature.trapPattern);
      parGroupe.set(s.group, list);
    }
    for (const [groupe, patterns] of parGroupe) {
      expect(new Set(patterns).size, `Groupe ${groupe}`).toBe(patterns.length);
    }
  });

  it("ne contient aucun tiret long dans les textes apprenant", () => {
    for (const s of ALL_SCENARIOS) {
      const textes = [
        s.title,
        ...s.narrative.map((v) => v.text),
        ...s.candidates.flatMap((c) => [
          c.shortLabel,
          c.explanation,
          c.nature ?? "",
          ...(c.identity ? [c.identity.entree, c.identity.sortie, c.identity.client] : []),
        ]),
        ...Object.values(s.spottingFeedbacks),
      ];
      for (const t of textes) {
        expect(t.includes("—"), `Tiret long dans : ${t}`).toBe(false);
      }
    }
  });

  it("chaque processus porte sa carte d'identité, chaque leurre sa nature", () => {
    for (const s of ALL_SCENARIOS) {
      for (const c of s.candidates) {
        if (c.isProcess) {
          expect(c.identity, `Processus ${c.id}`).toBeDefined();
        } else {
          expect(c.nature, `Leurre ${c.id}`).toBeDefined();
        }
      }
    }
  });

  it("chaque processus porte son corrigé de classement, sans piège sur la bonne case", () => {
    for (const s of ALL_SCENARIOS) {
      for (const c of s.candidates.filter((c) => c.isProcess)) {
        const spec = c.classification;
        expect(spec, `Processus ${c.id}`).toBeDefined();
        expect(spec!.typeTraps?.[spec!.type], `typeTraps de ${c.id}`).toBeUndefined();
        expect(spec!.levelTraps?.[spec!.level], `levelTraps de ${c.id}`).toBeUndefined();
      }
    }
  });

  it("le corrigé de chaque scénario est atteignable (succès rejouable)", () => {
    for (const s of ALL_SCENARIOS) {
      const bonneSelection = s.candidates.filter((c) => c.isProcess).map((c) => c.id);
      const report = evaluateSpotting(s, bonneSelection);
      expect(report.outcome, `Scénario ${s.id}`).toBe("success");
    }
  });

  it("la théorie couvre les 9 cases de la grille, sans tiret long ni texte vide", () => {
    const textes: string[] = [THEORY_KEY_MESSAGE];
    for (const t of PROCESS_TYPES) {
      textes.push(TYPE_THEORY[t].label, TYPE_THEORY[t].description);
      for (const l of PROCESS_LEVELS) {
        textes.push(GRID_EXAMPLES[t][l]);
      }
    }
    for (const l of PROCESS_LEVELS) {
      textes.push(LEVEL_THEORY[l].label, LEVEL_THEORY[l].description);
    }
    expect(textes).toHaveLength(1 + 3 * 2 + 9 + 3 * 2);
    for (const t of textes) {
      expect(t.trim().length, `Texte vide : ${t}`).toBeGreaterThan(2);
      expect(t.includes("—"), `Tiret long dans : ${t}`).toBe(false);
    }
  });

  it("chaque groupe ouvert a au moins un scénario", () => {
    for (const g of ALL_GROUPS.filter((g) => g.open)) {
      expect(ALL_SCENARIOS.some((s) => s.group === g.id), `Groupe ${g.id}`).toBe(true);
    }
  });
});
