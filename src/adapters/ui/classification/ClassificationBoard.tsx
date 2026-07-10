/**
 * Le geste Classer : une carte-processus à la fois, trois cibles,
 * feedback immédiat avec le pourquoi du corpus.
 *
 * Deux phases séquencées (D3) : d'abord le type sur toutes les
 * cartes, puis le niveau. Raccourcis clavier 1/2/3 pour répondre,
 * Entrée pour passer à la carte suivante. La réussite du parcours
 * (toutes justes du premier coup) fait progresser la maîtrise.
 */

import { useEffect, useMemo, useState } from "react";
import type {
  ClassAxis,
  ClassificationOutcome,
  ClassificationVerdict,
  ProcessCandidate,
  ProcessCoachEngine,
  ProcessLevel,
  ProcessScenario,
  ProcessType,
} from "@domain/index";
import { LEVEL_OPTIONS, TYPE_OPTIONS, type AxisOption } from "@content/axisGuide";
import { CandidateIcon } from "../icons/CandidateIcon";
import { TheoryGrid } from "../theory/TheoryGrid";
import { RenvoiApresEchecs, type DeepLinkFondation } from "../fondations/RenvoiApresEchecs";
import "./ClassificationBoard.css";

const AXIS_TITLES: Record<ClassAxis, string> = {
  type: "Axe 1 : le type",
  niveau: "Axe 2 : le niveau",
};

const AXIS_QUESTIONS: Record<ClassAxis, string> = {
  type: "Qu'est-ce que ce processus fait pour l'organisation ?",
  niveau: "Où vit ce processus ?",
};

type Phase = {
  readonly axis: ClassAxis;
  readonly options: ReadonlyArray<AxisOption<ProcessType> | AxisOption<ProcessLevel>>;
};

const PHASES: ReadonlyArray<Phase> = [
  { axis: "type", options: TYPE_OPTIONS },
  { axis: "niveau", options: LEVEL_OPTIONS },
];

type Props = {
  scenario: ProcessScenario;
  engine: ProcessCoachEngine;
  onBack: () => void;
  deepLinkFondation?: DeepLinkFondation | undefined;
};

export function ClassificationBoard({ scenario, engine, onBack, deepLinkFondation }: Props) {
  const processes: ReadonlyArray<ProcessCandidate> = useMemo(
    () => scenario.candidates.filter((c) => c.classification !== undefined),
    [scenario],
  );

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [verdict, setVerdict] = useState<ClassificationVerdict | null>(null);
  const [firstTryResults, setFirstTryResults] = useState<ReadonlyArray<boolean>>([]);
  const [outcome, setOutcome] = useState<ClassificationOutcome | null>(null);
  const [echecsConsecutifs, setEchecsConsecutifs] = useState(0);

  const phase = PHASES[phaseIndex]!;
  const candidate = processes[cardIndex];
  const finished = outcome !== null;

  function answer(value: ProcessType | ProcessLevel) {
    if (verdict || finished || !candidate) return;
    const v = engine.evaluateClassification(scenario.id, candidate.id, phase.axis, value);
    setVerdict(v);
    setFirstTryResults((prev) => [...prev, v.correct]);
  }

  function next() {
    if (!verdict || finished) return;
    setVerdict(null);
    if (cardIndex + 1 < processes.length) {
      setCardIndex(cardIndex + 1);
      return;
    }
    if (phaseIndex + 1 < PHASES.length) {
      setPhaseIndex(phaseIndex + 1);
      setCardIndex(0);
      return;
    }
    const result = engine.completeClassificationRun(scenario.id, firstTryResults);
    setOutcome(result);
    setEchecsConsecutifs((n) => (result === "success" ? 0 : n + 1));
  }

  function replay() {
    setPhaseIndex(0);
    setCardIndex(0);
    setVerdict(null);
    setFirstTryResults([]);
    setOutcome(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (finished) return;
      if (!verdict && ["1", "2", "3"].includes(e.key)) {
        const option = phase.options[Number(e.key) - 1];
        if (option) answer(option.value);
      }
      if (verdict && e.key === "Enter") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const masteryLabel: Record<string, string> = {
    "non-commencee": "non commencée",
    effleuree: "effleurée",
    travaillee: "travaillée",
    consolidee: "consolidée",
  };

  return (
    <main className="classer">
      <nav className="classer-nav">
        <button type="button" className="lien-retour" onClick={onBack}>
          Retour à l'atelier
        </button>
      </nav>

      <header className="classer-header">
        <p className="classer-surtitre">Geste 2 : classer</p>
        <h1>{scenario.title}</h1>
        {!finished && (
          <p className="classer-phase">
            {AXIS_TITLES[phase.axis]} · carte {cardIndex + 1} sur {processes.length}
          </p>
        )}
      </header>

      <details className="theorie-panneau">
        <summary>Revoir la fondation : la grille type et niveau</summary>
        <TheoryGrid />
      </details>

      {!finished && candidate && (
        <>
          <section className="carte-a-classer" aria-label="La carte à classer">
            <span className="carte-icone" aria-hidden="true">
              <CandidateIcon id={candidate.icon} size={38} />
            </span>
            <h2>{candidate.shortLabel}</h2>
            <p className="classer-question">{AXIS_QUESTIONS[phase.axis]}</p>
          </section>

          <div className="cibles" role="group" aria-label="Les trois cibles">
            {phase.options.map((option, i) => (
              <button
                key={option.value}
                type="button"
                className="cible"
                aria-label={`${option.label}. ${option.hint}`}
                disabled={verdict !== null}
                onClick={() => answer(option.value)}
              >
                <span className="cible-raccourci" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="cible-icone" aria-hidden="true">
                  <CandidateIcon id={option.icon} size={30} />
                </span>
                <span className="cible-label">{option.label}</span>
                <span className="cible-hint">{option.hint}</span>
              </button>
            ))}
          </div>

          <div role="status" aria-live="polite" className="classer-feedback">
            {verdict && (
              <div
                className={`feedback-carte ${verdict.correct ? "feedback-juste" : "feedback-confusion"}`}
              >
                <p className="feedback-verdict">
                  {verdict.correct ? "Exact" : "Pas tout à fait"}
                </p>
                <p>{verdict.message}</p>
                <button type="button" className="action-principale" onClick={next}>
                  {cardIndex + 1 < processes.length || phaseIndex + 1 < PHASES.length
                    ? "Carte suivante"
                    : "Voir le résultat"}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {finished && (
        <div role="status" aria-live="polite" className="classer-feedback">
          <div
            className={`feedback-carte ${outcome === "success" ? "feedback-juste" : "feedback-confusion"}`}
          >
            <p className="feedback-verdict">
              {outcome === "success" ? "Classement impeccable" : "Parcours terminé"}
            </p>
            <p>
              {outcome === "success"
                ? scenario.classificationFeedbacks.success
                : scenario.classificationFeedbacks.miss}
            </p>
            {outcome === "success" && (
              <p className="feedback-maitrise">
                Maîtrise du geste Classer : {masteryLabel[engine.getMastery("classer")]}
              </p>
            )}
            <button type="button" className="action-principale" onClick={replay}>
              Rejouer
            </button>
          </div>
          <RenvoiApresEchecs echecsConsecutifs={echecsConsecutifs} deepLink={deepLinkFondation} />
        </div>
      )}
    </main>
  );
}
