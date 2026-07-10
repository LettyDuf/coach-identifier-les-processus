import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FondationView } from "@adapters/ui/fondations/FondationView";
import { F1_PROCESSUS, F4_MESURE } from "@content/fondations";
import { THEORY_KEY_MESSAGE } from "@content/theory";

function renderFondation(id: "processus" | "carte" | "grille" | "mesure") {
  const onToAtelier = vi.fn();
  render(<FondationView id={id} onBack={() => undefined} onToAtelier={onToAtelier} />);
  return { onToAtelier };
}

describe("FondationView", () => {
  it("F1 ouvre par un mini-problème (vote), puis révèle les trois tests", async () => {
    const { onToAtelier } = renderFondation("processus");
    expect(screen.getByText(/Votez : ceci est-il un processus ?/)).toBeInTheDocument();

    for (const vote of F1_PROCESSUS.votes) {
      await userEvent.click(
        screen.getByRole("button", { name: vote.isProcess ? /^Oui/ : "Non" }),
      );
      expect(screen.getByText(vote.explanation)).toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Continuer" }));
    }
    // Les trois tests apparaissent après les votes, jamais avant.
    for (const t of F1_PROCESSUS.tests) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole("button", { name: "Aller à l'atelier" }));
    expect(onToAtelier).toHaveBeenCalled();
  });

  it("F2 affiche la carte à trois zooms", () => {
    renderFondation("carte");
    expect(screen.getByRole("region", { name: "Vue macro" })).toBeInTheDocument();
  });

  it("F3 affiche la grille type x niveau", () => {
    renderFondation("grille");
    expect(screen.getByText(THEORY_KEY_MESSAGE)).toBeInTheDocument();
  });

  it("F4 enchaîne l'ancrage, les situations, la synthèse puis les familles", async () => {
    const { onToAtelier } = renderFondation("mesure");
    expect(screen.getByText(F4_MESURE.ancrage)).toBeInTheDocument();

    for (const situation of F4_MESURE.situations) {
      const bonne = situation.options.find((o) => o.correct)!;
      await userEvent.click(screen.getByRole("button", { name: bonne.label }));
      expect(screen.getByText(situation.lesson)).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole("button", { name: /situation suivante|voir la synthèse/i }),
      );
    }
    expect(screen.getByText(F4_MESURE.complement)).toBeInTheDocument();
    expect(screen.getByText("Qui utilise quoi, à quelle cadence")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Apprendre à les reconnaître" }));

    for (const round of F4_MESURE.families) {
      expect(screen.getByText(round.definition, { exact: false })).toBeInTheDocument();
      for (const item of round.items) {
        await userEvent.click(
          item.isKind
            ? screen.getByRole("button", { name: /^Oui/ })
            : screen.getByRole("button", { name: "Non" }),
        );
        await userEvent.click(screen.getByRole("button", { name: "Continuer" }));
      }
    }
    await userEvent.click(screen.getByRole("button", { name: "Aller à l'atelier" }));
    expect(onToAtelier).toHaveBeenCalled();
  });
});
