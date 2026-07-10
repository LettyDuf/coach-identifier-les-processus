/**
 * Intégrité du bureau d'études (D16). Le schéma Zod du module
 * s'exécute au chargement : importer valide déjà.
 */

import { describe, expect, it } from "vitest";
import { F1_PROCESSUS, F4_MESURE, FONDATIONS } from "@content/fondations";

describe("fondations", () => {
  it("expose quatre fondations, chacune liée à un geste ou transversale", () => {
    expect(FONDATIONS).toHaveLength(4);
    expect(FONDATIONS.map((f) => f.id)).toEqual(["processus", "carte", "grille", "mesure"]);
    expect(FONDATIONS.filter((f) => f.gesteLie !== null).map((f) => f.gesteLie)).toEqual([
      "reperer",
      "classer",
      "mesurer",
    ]);
  });

  it("F1 a des votes des deux bords et trois tests", () => {
    expect(F1_PROCESSUS.votes.some((v) => v.isProcess)).toBe(true);
    expect(F1_PROCESSUS.votes.some((v) => !v.isProcess)).toBe(true);
    expect(F1_PROCESSUS.tests).toHaveLength(3);
  });

  it("F4 couvre les trois familles, en situations comme en manches, dans l'ordre", () => {
    expect(new Set(F4_MESURE.situations.map((s) => s.kind)).size).toBe(3);
    expect(F4_MESURE.families.map((f) => f.kind)).toEqual(["kbi", "kpi", "kgi"]);
    expect(new Set(F4_MESURE.users.map((u) => u.kind)).size).toBe(3);
    expect(F4_MESURE.ancrage).toContain("familles d'indicateurs");
  });

  it("F4 reste neutre sur les rôles : ni « équipe », ni « PO » dans son contenu définitionnel (D16, D18)", () => {
    // Le bureau d'études est transversal (D16) : il ne doit pas supposer
    // qu'un groupe de travail est organisé en équipe avec un PO. Régression
    // du 2026-07-09 : la table "qui utilise quoi" et le test du KBI le
    // faisaient, invisible tant qu'un seul groupe (équipe agile) existait.
    const textesNeutres: string[] = [
      ...F4_MESURE.users.map((u) => u.who),
      ...F4_MESURE.families.map((f) => f.definition),
      ...F4_MESURE.families.map((f) => f.question),
    ];
    for (const t of textesNeutres) {
      expect(t.includes("équipe"), `« équipe » dans un texte définitionnel : ${t}`).toBe(false);
      expect(t.includes("PO"), `« PO » dans un texte définitionnel : ${t}`).toBe(false);
    }
  });

  it("aucun tiret long dans les textes des fondations", () => {
    const textes: string[] = [
      ...FONDATIONS.flatMap((f) => [f.title, f.question]),
      ...F1_PROCESSUS.votes.flatMap((v) => [v.label, v.explanation]),
      ...F1_PROCESSUS.tests,
      F1_PROCESSUS.moral,
      F1_PROCESSUS.versAtelier,
      F4_MESURE.ancrage,
      F4_MESURE.complement,
      F4_MESURE.versAtelier,
      ...F4_MESURE.situations.flatMap((s) => [
        s.context,
        s.question,
        s.lesson,
        ...s.options.flatMap((o) => [o.label, o.feedback]),
      ]),
      ...F4_MESURE.users.flatMap((u) => [u.who, u.cadence, u.usage]),
      ...F4_MESURE.families.flatMap((f) => [
        f.definition,
        f.question,
        ...f.items.flatMap((i) => [i.label, i.explanation]),
      ]),
    ];
    for (const t of textes) {
      expect(t.includes("—"), `Tiret long dans : ${t}`).toBe(false);
    }
  });
});
