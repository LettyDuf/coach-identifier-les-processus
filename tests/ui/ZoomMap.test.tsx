import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ZoomMap } from "@adapters/ui/zoommap/ZoomMap";

function queryMedium() {
  return screen.queryByRole("region", { name: "Vue médium" });
}
function queryMicro() {
  return screen.queryByRole("region", { name: "Vue micro" });
}

describe("ZoomMap", () => {
  it("n'affiche que la vue macro à l'ouverture", () => {
    render(<ZoomMap />);
    expect(screen.getByRole("region", { name: "Vue macro" })).toBeInTheDocument();
    expect(queryMedium()).not.toBeInTheDocument();
    expect(queryMicro()).not.toBeInTheDocument();
  });

  it("une case info explique sans ouvrir de vue", async () => {
    render(<ZoomMap />);
    await userEvent.click(screen.getByRole("button", { name: /Découvrir/ }));
    expect(screen.getByText(/veille marché et technologique/)).toBeInTheDocument();
    expect(queryMedium()).not.toBeInTheDocument();
  });

  it("descend jusqu'à la vue micro puis remonte par la pastille fermer", async () => {
    render(<ZoomMap />);
    await userEvent.click(screen.getByRole("button", { name: /Commander/ }));
    expect(queryMedium()).toBeInTheDocument();
    expect(
      screen.getByText("Vue médium · le processus transversal (ici : la gestion de la demande)"),
    ).toBeInTheDocument();

    const confier = screen.getByRole("button", { name: /Confier aux équipes TI/ });
    await userEvent.click(confier);
    expect(queryMicro()).toBeInTheDocument();
    expect(screen.getByText(/réaliser une fonctionnalité/)).toBeInTheDocument();
    expect(confier).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(confier);
    expect(queryMicro()).not.toBeInTheDocument();
    expect(confier).toHaveAttribute("aria-expanded", "false");
  });

  it("la touche Échap remonte d'un niveau à la fois", async () => {
    render(<ZoomMap />);
    await userEvent.click(screen.getByRole("button", { name: /Obtenir de l'aide/ }));
    expect(screen.getByText(/flux correctif/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /^Corriger/ }));
    expect(queryMicro()).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(queryMicro()).not.toBeInTheDocument();
    expect(queryMedium()).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(queryMedium()).not.toBeInTheDocument();
  });

  it("changer de zoom macro remplace la vue médium", async () => {
    render(<ZoomMap />);
    await userEvent.click(screen.getByRole("button", { name: /Commander/ }));
    expect(
      screen.getByText("Vue médium · le processus transversal (ici : la gestion de la demande)"),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Obtenir de l'aide/ }));
    expect(
      screen.getByText("Vue médium · le processus transversal (ici : le flux correctif)"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Vue médium · le processus transversal (ici : la gestion de la demande)"),
    ).not.toBeInTheDocument();
  });
});
