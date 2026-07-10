/**
 * L'atelier d'un groupe : les trois gestes d'entraînement (D16).
 * La compréhension transversale vit au bureau d'études ; chaque geste
 * affiche sa fondation liée avec un rappel doux, jamais bloquant.
 */

import type { MasteryLevel, ProcessCoachEngine, WorkGroup } from "@domain/index";
import { FONDATIONS, type FondationId } from "@content/fondations";
import "./Atelier.css";

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  "non-commencee": "non commencée",
  effleuree: "effleurée",
  travaillee: "travaillée",
  consolidee: "consolidée",
};

type Props = {
  group: WorkGroup;
  engine: ProcessCoachEngine;
  visitedFondations: ReadonlySet<FondationId>;
  onPlaySpotting: () => void;
  onPlayClassify: () => void;
  onPlayMeasure: () => void;
  onOpenFondation: (id: FondationId) => void;
  onBack: () => void;
};

function FondationLien({
  gesteLie,
  visited,
  onOpen,
}: {
  gesteLie: "reperer" | "classer" | "mesurer";
  visited: ReadonlySet<FondationId>;
  onOpen: (id: FondationId) => void;
}) {
  const fondation = FONDATIONS.find((f) => f.gesteLie === gesteLie);
  if (!fondation) return null;
  const dejaVue = visited.has(fondation.id);
  return (
    <button type="button" className="fondation-lien" onClick={() => onOpen(fondation.id)}>
      <span className={`fondation-lampe ${dejaVue ? "lampe-allumee" : ""}`} aria-hidden="true" />
      {dejaVue
        ? `Revoir la fondation : ${fondation.title}`
        : `Conseillé avant : ${fondation.title} (3 min)`}
    </button>
  );
}

export function Atelier({
  group,
  engine,
  visitedFondations,
  onPlaySpotting,
  onPlayClassify,
  onPlayMeasure,
  onOpenFondation,
  onBack,
}: Props) {
  const masteryReperer = engine.getMastery("reperer");
  const masteryClasser = engine.getMastery("classer");
  const masteryMesurer = engine.getMastery("mesurer");

  return (
    <main className="atelier">
      <nav className="atelier-nav">
        <button type="button" className="lien-retour" onClick={onBack}>
          Retour au hall
        </button>
      </nav>
      <header className="atelier-header">
        <p className="atelier-surtitre">Atelier</p>
        <h1>{group.label}</h1>
        <p className="atelier-baseline">{group.tagline}</p>
      </header>

      <ul className="gestes">
        <li className="geste geste-actif">
          <h2>1. Repérer</h2>
          <p>
            Lire la vie d'une équipe et y voir les processus, sans se laisser
            piéger par les outils, les rôles et les cérémonies.
          </p>
          <FondationLien gesteLie="reperer" visited={visitedFondations} onOpen={onOpenFondation} />
          <p className="geste-maitrise">
            Maîtrise : <strong>{MASTERY_LABELS[masteryReperer]}</strong>
          </p>
          <button type="button" className="geste-action" onClick={onPlaySpotting}>
            S'exercer
          </button>
        </li>
        <li className="geste geste-actif">
          <h2>2. Classer</h2>
          <p>Ranger chaque processus par type (pilotage, opérationnel, support) puis par niveau.</p>
          <FondationLien gesteLie="classer" visited={visitedFondations} onOpen={onOpenFondation} />
          <p className="geste-maitrise">
            Maîtrise : <strong>{MASTERY_LABELS[masteryClasser]}</strong>
          </p>
          <button type="button" className="geste-action" onClick={onPlayClassify}>
            S'exercer
          </button>
        </li>
        <li className="geste geste-actif">
          <h2>3. Mesurer</h2>
          <p>Lire des mesures, choisir la bonne métrique, construire la chaîne complète.</p>
          <FondationLien gesteLie="mesurer" visited={visitedFondations} onOpen={onOpenFondation} />
          <p className="geste-maitrise">
            Maîtrise : <strong>{MASTERY_LABELS[masteryMesurer]}</strong>
          </p>
          <button type="button" className="geste-action" onClick={onPlayMeasure}>
            S'exercer
          </button>
        </li>
      </ul>
    </main>
  );
}
