import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RenvoiApresEchecs, SEUIL_ECHECS_RENVOI } from "@adapters/ui/fondations/RenvoiApresEchecs";

const DEEP_LINK = { titre: "Qu'est-ce qu'un processus ?", onOpen: vi.fn() };

describe("RenvoiApresEchecs (D16)", () => {
  it("ne s'affiche pas sous le seuil d'échecs", () => {
    render(<RenvoiApresEchecs echecsConsecutifs={SEUIL_ECHECS_RENVOI - 1} deepLink={DEEP_LINK} />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("s'affiche au seuil, avec le titre de la fondation liée", () => {
    render(<RenvoiApresEchecs echecsConsecutifs={SEUIL_ECHECS_RENVOI} deepLink={DEEP_LINK} />);
    expect(screen.getByRole("note")).toBeInTheDocument();
    expect(screen.getByText(/Qu'est-ce qu'un processus \?/)).toBeInTheDocument();
  });

  it("ne s'affiche jamais sans fondation liée, même au-delà du seuil", () => {
    render(<RenvoiApresEchecs echecsConsecutifs={5} />);
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("ouvre la fondation au clic, jamais bloquant (pas de disabled ailleurs)", async () => {
    const onOpen = vi.fn();
    render(
      <RenvoiApresEchecs echecsConsecutifs={SEUIL_ECHECS_RENVOI} deepLink={{ ...DEEP_LINK, onOpen }} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /revoir en entier/i }));
    expect(onOpen).toHaveBeenCalledOnce();
  });
});
