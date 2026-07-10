import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TheoryGrid } from "@adapters/ui/theory/TheoryGrid";
import { GRID_EXAMPLES, THEORY_KEY_MESSAGE } from "@content/theory";

describe("TheoryGrid", () => {
  it("affiche le message clé et les 9 exemples de la grille croisée", () => {
    render(<TheoryGrid />);
    expect(screen.getByText(THEORY_KEY_MESSAGE)).toBeInTheDocument();
    for (const byLevel of Object.values(GRID_EXAMPLES)) {
      for (const example of Object.values(byLevel)) {
        expect(screen.getByText(example)).toBeInTheDocument();
      }
    }
    // Tableau accessible : 3 colonnes de niveau + 3 lignes de type.
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getAllByRole("rowheader")).toHaveLength(3);
  });
});
