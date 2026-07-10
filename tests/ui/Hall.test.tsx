import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hall } from "@adapters/ui/hall/Hall";
import { GROUPS } from "@content/groups";
import { FONDATIONS } from "@content/fondations";

function renderHall(over: Partial<Parameters<typeof Hall>[0]> = {}) {
  return render(
    <Hall
      groups={GROUPS}
      visitedFondations={new Set()}
      onEnter={() => undefined}
      onOpenFondation={() => undefined}
      {...over}
    />,
  );
}

describe("Hall", () => {
  it("affiche le bureau d'études avec les quatre fondations", () => {
    renderHall();
    expect(screen.getByRole("region", { name: "Le bureau d'études" })).toBeInTheDocument();
    for (const f of FONDATIONS) {
      expect(screen.getByRole("button", { name: new RegExp(f.title) })).toBeInTheDocument();
    }
    expect(screen.getAllByText("À découvrir")).toHaveLength(4);
  });

  it("allume la lampe des fondations visitées", () => {
    renderHall({ visitedFondations: new Set(["processus", "carte"]) });
    expect(screen.getAllByText("Visitée")).toHaveLength(2);
    expect(screen.getAllByText("À découvrir")).toHaveLength(2);
  });

  it("ouvre une fondation au clic", async () => {
    const onOpenFondation = vi.fn();
    renderHall({ onOpenFondation });
    await userEvent.click(screen.getByRole("button", { name: /Qu'est-ce qu'un processus/ }));
    expect(onOpenFondation).toHaveBeenCalledWith("processus");
  });

  it("affiche les trois ateliers, deux ouverts", async () => {
    const onEnter = vi.fn();
    renderHall({ onEnter });
    expect(screen.getAllByText("Atelier en préparation")).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: /équipe agile/i }));
    expect(onEnter).toHaveBeenCalledWith("equipe-agile");
    await userEvent.click(screen.getByRole("button", { name: /^Programme/i }));
    expect(onEnter).toHaveBeenCalledWith("programme");
  });
});
