import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassificationBoard } from "@adapters/ui/classification/ClassificationBoard";
import { createProcessCoachEngine, type ProcessType } from "@domain/index";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { COLIBRI } from "@content/scenarios/equipe-agile/colibri";
import { LEVEL_OPTIONS, TYPE_OPTIONS } from "@content/axisGuide";

function renderBoard() {
  const engine = createProcessCoachEngine({
    content: createContentRepository(),
    masteryStore: createInMemoryMasteryStore(),
    clock: { now: () => 1000 },
    random: { nextInt: () => 0 },
  });
  return render(
    <ClassificationBoard scenario={COLIBRI} engine={engine} onBack={() => undefined} />,
  );
}

const processes = COLIBRI.candidates.filter((c) => c.classification);

/** La carte affichée (le h2 du plateau). */
function currentCandidate() {
  const heading = screen.getByRole("heading", { level: 2 });
  const found = processes.find((p) => p.shortLabel === heading.textContent);
  expect(found).toBeDefined();
  return found!;
}

function optionLabel(options: ReadonlyArray<{ value: string; label: string }>, value: string) {
  return options.find((o) => o.value === value)!.label;
}

/** Les cibles portent un aria-label explicite : "Label. Question d'aide". */
function targetButton(label: string) {
  return screen.getByRole("button", { name: new RegExp(`^${label}\\.`) });
}

describe("ClassificationBoard", () => {
  it("démarre sur l'axe du type, première carte, trois cibles", () => {
    renderBoard();
    expect(screen.getByText(/Axe 1 : le type/)).toBeInTheDocument();
    expect(
      screen.getByText(`carte 1 sur ${processes.length}`, { exact: false }),
    ).toBeInTheDocument();
    for (const o of TYPE_OPTIONS) {
      expect(targetButton(o.label)).toBeInTheDocument();
    }
  });

  it("sert le message de confusion du corpus sur la mauvaise case prévue", async () => {
    renderBoard();
    const c = currentCandidate();
    const spec = c.classification!;
    const wrong = (Object.keys(spec.typeTraps ?? {})[0] ??
      TYPE_OPTIONS.find((o) => o.value !== spec.type)!.value) as ProcessType;
    const expectedMessage = spec.typeTraps?.[wrong] ?? spec.typeRationale;
    await userEvent.click(targetButton(optionLabel(TYPE_OPTIONS, wrong)));
    expect(screen.getByText("Pas tout à fait")).toBeInTheDocument();
    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });

  it("un parcours parfait traverse les deux axes et fait progresser la maîtrise", async () => {
    renderBoard();
    for (let i = 0; i < processes.length; i += 1) {
      const c = currentCandidate();
      await userEvent.click(targetButton(optionLabel(TYPE_OPTIONS, c.classification!.type)));
      expect(screen.getByText("Exact")).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole("button", { name: /carte suivante|voir le résultat/i }),
      );
    }
    expect(screen.getByText(/Axe 2 : le niveau/)).toBeInTheDocument();
    for (let i = 0; i < processes.length; i += 1) {
      const c = currentCandidate();
      await userEvent.click(targetButton(optionLabel(LEVEL_OPTIONS, c.classification!.level)));
      expect(screen.getByText("Exact")).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole("button", { name: /carte suivante|voir le résultat/i }),
      );
    }
    expect(screen.getByText("Classement impeccable")).toBeInTheDocument();
    expect(screen.getByText(COLIBRI.classificationFeedbacks.success)).toBeInTheDocument();
    expect(screen.getByText(/effleurée/)).toBeInTheDocument();
  });

  it("répond aussi au clavier (touches 1 à 3)", async () => {
    renderBoard();
    await userEvent.keyboard("1");
    expect(screen.getByText(/Exact|Pas tout à fait/)).toBeInTheDocument();
  });
});
