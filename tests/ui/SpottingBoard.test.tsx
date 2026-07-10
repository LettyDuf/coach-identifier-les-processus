import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { SpottingBoard } from "@adapters/ui/spotting/SpottingBoard";
import { createProcessCoachEngine } from "@domain/index";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { COLIBRI } from "@content/scenarios/equipe-agile/colibri";

function makeEngine() {
  return createProcessCoachEngine({
    content: createContentRepository(),
    masteryStore: createInMemoryMasteryStore(),
    clock: { now: () => 1000 },
    random: { nextInt: () => 0 }, // ordre déterministe en test
  });
}

function renderBoard(over: Partial<Parameters<typeof SpottingBoard>[0]> = {}) {
  return render(
    <SpottingBoard scenario={COLIBRI} engine={makeEngine()} onBack={() => undefined} {...over} />,
  );
}

describe("SpottingBoard", () => {
  it("affiche le récit et les neuf candidats à bascule", () => {
    renderBoard();
    expect(screen.getByRole("heading", { level: 1, name: "L'équipe Colibri" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(9);
  });

  it("marque et démarque un candidat (aria-pressed)", async () => {
    renderBoard();
    const jira = screen.getByRole("button", { name: /jira/i });
    await userEvent.click(jira);
    expect(jira).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(jira);
    expect(jira).toHaveAttribute("aria-pressed", "false");
  });

  it("donne le succès et la maîtrise quand la sélection est le corrigé", async () => {
    renderBoard();
    for (const c of COLIBRI.candidates.filter((c) => c.isProcess)) {
      await userEvent.click(screen.getByRole("button", { name: c.shortLabel }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.getByText(COLIBRI.spottingFeedbacks.success)).toBeInTheDocument();
    expect(screen.getByText(/effleurée/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rejouer" })).toBeInTheDocument();
  });

  it("révèle le tampon de nature et le pourquoi sur un leurre coché", async () => {
    renderBoard();
    await userEvent.click(screen.getByRole("button", { name: /jira/i }));
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.getByText("C'était un leurre")).toBeInTheDocument();
    expect(screen.getByText("Outil")).toBeInTheDocument();
    expect(
      screen.getByText(/l'outil qui supporte le travail, pas le travail lui-même/i),
    ).toBeInTheDocument();
  });

  it("révèle la carte d'identité (Entrée / Sortie / Client) des processus après vérification", async () => {
    renderBoard();
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.getAllByText("Entrée")).toHaveLength(5);
    expect(screen.getAllByText("Sortie")).toHaveLength(5);
    expect(screen.getAllByText("Client")).toHaveLength(5);
    expect(screen.getByText("Un ticket prêt à développer")).toBeInTheDocument();
  });

  it("affiche le récit en vignettes, pas en pavé", () => {
    renderBoard();
    const region = screen.getByRole("region", { name: /récit en vignettes/i });
    expect(within(region).getAllByRole("listitem")).toHaveLength(COLIBRI.narrative.length);
  });

  it("propose le renvoi vers la fondation après deux échecs consécutifs (D16), jamais avant", async () => {
    const onOpen = vi.fn();
    renderBoard({ deepLinkFondation: { titre: "Qu'est-ce qu'un processus ?", onOpen } });

    // 1er échec : rien sélectionné.
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Rejouer" }));

    // 2e échec consécutif : le renvoi apparaît.
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.getByRole("note")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /revoir en entier/i }));
    expect(onOpen).toHaveBeenCalledOnce();
  });

  it("n'affiche aucun renvoi quand aucune fondation liée n'est fournie", async () => {
    renderBoard();
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    await userEvent.click(screen.getByRole("button", { name: "Rejouer" }));
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("remet le compteur d'échecs à zéro après un succès", async () => {
    const onOpen = vi.fn();
    renderBoard({ deepLinkFondation: { titre: "Qu'est-ce qu'un processus ?", onOpen } });

    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    await userEvent.click(screen.getByRole("button", { name: "Rejouer" }));

    for (const c of COLIBRI.candidates.filter((c) => c.isProcess)) {
      await userEvent.click(screen.getByRole("button", { name: c.shortLabel }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Rejouer" }));

    await userEvent.click(screen.getByRole("button", { name: "Vérifier mon repérage" }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("est sans violation d'accessibilité détectable", async () => {
    const { container } = renderBoard();
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
