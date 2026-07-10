import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeasureBoard } from "@adapters/ui/measure/MeasureBoard";
import { createProcessCoachEngine } from "@domain/index";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { COLIBRI } from "@content/scenarios/equipe-agile/colibri";

function renderBoard() {
  const engine = createProcessCoachEngine({
    content: createContentRepository(),
    masteryStore: createInMemoryMasteryStore(),
    clock: { now: () => 1000 },
    random: { nextInt: () => 0 },
  });
  return render(<MeasureBoard scenario={COLIBRI} engine={engine} onBack={() => undefined} />);
}

const measure = COLIBRI.measure!;
const quiz1 = measure.quiz.filter((q) => q.palier === 1);
const quiz2 = measure.quiz.filter((q) => q.palier === 2);

/** Répond juste à tous les items d'un palier de quiz. */
async function passQuiz(items: typeof quiz1) {
  for (const item of items) {
    const bonne = item.options.find((o) => o.correct)!;
    await userEvent.click(screen.getByRole("button", { name: bonne.label }));
    expect(screen.getByText("Exact")).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: /question suivante|palier suivant/i }),
    );
  }
}

describe("MeasureBoard", () => {
  it("démarre au palier Lire, avec le renvoi vers la fondation", () => {
    renderBoard();
    expect(screen.getByText("Palier 1 : lire une mesure")).toBeInTheDocument();
    expect(screen.getByText(quiz1[0]!.question)).toBeInTheDocument();
    expect(
      screen.getByText("Revoir la fondation : les familles d'indicateurs"),
    ).toBeInTheDocument();
  });

  it("montre le feedback du corpus sur une mauvaise réponse", async () => {
    renderBoard();
    const mauvaise = quiz1[0]!.options.find((o) => !o.correct)!;
    await userEvent.click(screen.getByRole("button", { name: mauvaise.label }));
    expect(screen.getByText("Pas tout à fait")).toBeInTheDocument();
    expect(screen.getByText(mauvaise.feedback)).toBeInTheDocument();
  });

  it("traverse les trois paliers et valide une chaîne complète", async () => {
    renderBoard();
    await passQuiz(quiz1);
    expect(screen.getByText("Palier 2 : choisir la bonne métrique")).toBeInTheDocument();
    await passQuiz(quiz2);
    expect(screen.getByText("Palier 3 : construire la chaîne de mesure")).toBeInTheDocument();
    expect(screen.getByText(measure.chainExample)).toBeInTheDocument();

    for (const id of measure.validExample) {
      const bloc = measure.blocks.find((b) => b.id === id)!;
      await userEvent.click(screen.getByRole("button", { name: bloc.label }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Mettre la chaîne en service" }));
    expect(screen.getByText("Le fluide circule")).toBeInTheDocument();
    expect(screen.getByText(/effleurée/)).toBeInTheDocument();
  });

  it("une chaîne avec piège casse avec le message du corpus", async () => {
    renderBoard();
    await passQuiz(quiz1);
    await passQuiz(quiz2);
    const piege = measure.blocks.find((b) => b.kind === "piege")!;
    await userEvent.click(screen.getByRole("button", { name: piege.label }));
    await userEvent.click(screen.getByRole("button", { name: "Mettre la chaîne en service" }));
    expect(screen.getByText("La chaîne casse")).toBeInTheDocument();
    expect(
      screen.getByText(measure.chainFeedbacks.violations["trap-included"]),
    ).toBeInTheDocument();
  });

  it("tout sélectionner ne passe pas : trop de cadrans", async () => {
    renderBoard();
    await passQuiz(quiz1);
    await passQuiz(quiz2);
    for (const bloc of measure.blocks.filter((b) => b.kind !== "piege")) {
      await userEvent.click(screen.getByRole("button", { name: bloc.label }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Mettre la chaîne en service" }));
    expect(screen.getByText("La chaîne casse")).toBeInTheDocument();
    expect(screen.getByText(measure.chainFeedbacks.violations["too-many"])).toBeInTheDocument();
  });
});
