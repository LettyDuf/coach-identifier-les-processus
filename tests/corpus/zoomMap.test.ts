/**
 * Intégrité de la carte à trois zooms (D14). Le schéma Zod du module
 * s'exécute au chargement : importer suffit à valider. On revérifie
 * ici les invariants métier lisiblement.
 */

import { describe, expect, it } from "vitest";
import { ZOOM_MAP } from "@content/zoomMap";

describe("carte à trois zooms", () => {
  it("respecte la triade de noms validée (D14)", () => {
    expect(ZOOM_MAP.macro.title).toContain("processus d'affaires");
    for (const m of Object.values(ZOOM_MAP.mediums)) {
      expect(m.title).toContain("processus transversal");
    }
    for (const m of Object.values(ZOOM_MAP.micros)) {
      expect(m.title).toContain("processus d'équipe");
    }
  });

  it("n'utilise jamais « opérationnel » comme nom de niveau", () => {
    const titres = [
      ZOOM_MAP.macro.title,
      ...Object.values(ZOOM_MAP.mediums).map((m) => m.title),
      ...Object.values(ZOOM_MAP.micros).map((m) => m.title),
    ];
    for (const t of titres) {
      expect(t.toLowerCase().includes("opérationnel"), t).toBe(false);
    }
  });

  it("chaque zoom mène quelque part", () => {
    for (const c of ZOOM_MAP.macro.cases.filter((c) => c.opensMedium)) {
      expect(ZOOM_MAP.mediums[c.opensMedium!]).toBeDefined();
    }
    for (const [key, m] of Object.entries(ZOOM_MAP.mediums)) {
      expect(ZOOM_MAP.micros[m.microKey], `micro de ${key}`).toBeDefined();
      expect(m.cases.filter((c) => c.opensMicro)).toHaveLength(1);
    }
  });

  it("ne contient aucun tiret long", () => {
    const textes: string[] = [ZOOM_MAP.intro, ZOOM_MAP.macro.owner, ZOOM_MAP.mediumOwner, ZOOM_MAP.microOwner];
    const collecte = (cases: ReadonlyArray<{ label: string; info?: { title: string; text: string } }>) => {
      for (const c of cases) {
        textes.push(c.label);
        if (c.info) textes.push(c.info.title, c.info.text);
      }
    };
    collecte(ZOOM_MAP.macro.cases);
    for (const m of Object.values(ZOOM_MAP.mediums)) collecte(m.cases);
    for (const m of Object.values(ZOOM_MAP.micros)) textes.push(...m.steps);
    for (const t of textes) {
      expect(t.includes("—"), `Tiret long dans : ${t}`).toBe(false);
    }
  });
});
