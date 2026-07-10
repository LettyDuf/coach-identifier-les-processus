/**
 * Le hall de la manufacture : le bureau d'études (les fondations
 * transversales, D16) et les portes des ateliers d'entraînement.
 * Les ateliers fermés lisent une promesse, pas une panne.
 */

import type { WorkGroup, WorkGroupId } from "@domain/index";
import { FONDATIONS, type FondationId } from "@content/fondations";
import "./Hall.css";

type Props = {
  groups: ReadonlyArray<WorkGroup>;
  visitedFondations: ReadonlySet<FondationId>;
  onEnter: (group: WorkGroupId) => void;
  onOpenFondation: (id: FondationId) => void;
};

export function Hall({ groups, visitedFondations, onEnter, onOpenFondation }: Props) {
  return (
    <main className="hall">
      <header className="hall-header">
        <p className="hall-surtitre">La manufacture des processus</p>
        <h1>Coach Processus</h1>
        <p className="hall-baseline">
          Apprendre à repérer les processus d'un groupe de travail, à les classer,
          puis à concevoir leur mesure.
        </p>
      </header>

      <section className="hall-bureau" aria-label="Le bureau d'études">
        <h2 className="hall-invite">Le bureau d'études</h2>
        <p className="hall-section-baseline">
          Les fondations : ce qu'on comprend une fois, et qu'on applique partout.
          En accès libre, conseillées avant les ateliers.
        </p>
        <ul className="fondations-cartes">
          {FONDATIONS.map((f) => {
            const visited = visitedFondations.has(f.id);
            return (
              <li key={f.id}>
                <button type="button" className="fondation-carte" onClick={() => onOpenFondation(f.id)}>
                  <span
                    className={`fondation-lampe ${visited ? "lampe-allumee" : ""}`}
                    aria-hidden="true"
                  />
                  <span className="fondation-carte-titre">{f.title}</span>
                  <span className="fondation-carte-question">{f.question}</span>
                  <span className="fondation-carte-etat">
                    {visited ? "Visitée" : "À découvrir"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-label="Les ateliers">
        <h2 className="hall-invite">Les ateliers</h2>
        <p className="hall-section-baseline">
          L'entraînement par groupe de travail : repérer, classer, mesurer sur des
          scénarios réels.
        </p>
        <ul className="hall-portes">
          {groups.map((g) => (
            <li key={g.id}>
              {g.open ? (
                <button
                  type="button"
                  className="porte porte-ouverte"
                  onClick={() => onEnter(g.id)}
                >
                  <span className="porte-lumiere" aria-hidden="true" />
                  <span className="porte-nom">{g.label}</span>
                  <span className="porte-tagline">{g.tagline}</span>
                  <span className="porte-action">Entrer</span>
                </button>
              ) : (
                <div className="porte porte-fermee" aria-label={`${g.label} : atelier en préparation`}>
                  <span className="porte-nom">{g.label}</span>
                  <span className="porte-tagline">{g.tagline}</span>
                  <span className="porte-ecriteau">Atelier en préparation</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
