/**
 * Le geste Mesurer : pur entraînement (D16), en trois paliers :
 * 1. Lire une mesure (QCM, feedback immédiat)
 * 2. Choisir la bonne métrique (QCM, avec pièges)
 * 3. Construire la chaîne : sélectionner des blocs, mettre en service.
 *
 * La compréhension (pourquoi mesurer, les familles d'indicateurs, qui
 * utilise quoi) vit au bureau d'études (fondation F4) ; un renvoi
 * repliable la rappelle ici sans quitter l'exercice.
 */

import { useMemo, useState } from "react";
import type {
  ChainReport,
  MeasureBlock,
  ProcessCoachEngine,
  ProcessScenario,
  QuizItem,
  QuizVerdict,
} from "@domain/index";
import { FondationMesureRappel } from "../fondations/FondationMesureRappel";
import { RenvoiApresEchecs, type DeepLinkFondation } from "../fondations/RenvoiApresEchecs";
import "./MeasureBoard.css";

const KIND_LABELS: Record<MeasureBlock["kind"], string> = {
  kbi: "KBI · comportement",
  kpi: "KPI · performance du processus",
  kgi: "KGI · résultat visé",
  piege: "Piège",
};

const MASTERY_LABELS: Record<string, string> = {
  "non-commencee": "non commencée",
  effleuree: "effleurée",
  travaillee: "travaillée",
  consolidee: "consolidée",
};

function Quiz({
  items,
  titre,
  aide,
  onDone,
  engine,
  scenarioId,
}: {
  items: ReadonlyArray<QuizItem>;
  titre: string;
  aide: string;
  onDone: () => void;
  engine: ProcessCoachEngine;
  scenarioId: string;
}) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<QuizVerdict | null>(null);

  const item = items[index];
  if (!item) return null;

  function answer(optionId: string) {
    if (verdict) return;
    setChoice(optionId);
    setVerdict(engine.evaluateQuiz(scenarioId, item!.id, optionId));
  }

  function next() {
    setChoice(null);
    setVerdict(null);
    if (index + 1 < items.length) setIndex(index + 1);
    else onDone();
  }

  return (
    <section aria-label={titre} className="palier">
      <h2 className="palier-titre">{titre}</h2>
      <p className="palier-aide">
        {aide} · question {index + 1} sur {items.length}
      </p>
      <p className="quiz-question">{item.question}</p>
      <ul className="quiz-options">
        {item.options.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              className={`quiz-option ${choice === o.id ? "quiz-choisie" : ""}`}
              disabled={verdict !== null}
              onClick={() => answer(o.id)}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
      <div role="status" aria-live="polite">
        {verdict && (
          <div className={`feedback-carte ${verdict.correct ? "feedback-juste" : "feedback-confusion"}`}>
            <p className="feedback-verdict">{verdict.correct ? "Exact" : "Pas tout à fait"}</p>
            <p>{verdict.feedback}</p>
            <button type="button" className="action-principale" onClick={next}>
              {index + 1 < items.length ? "Question suivante" : "Palier suivant"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

type Props = {
  scenario: ProcessScenario;
  engine: ProcessCoachEngine;
  onBack: () => void;
  deepLinkFondation?: DeepLinkFondation | undefined;
};

export function MeasureBoard({ scenario, engine, onBack, deepLinkFondation }: Props) {
  const measure = useMemo(() => engine.getMeasureContent(scenario.id), [engine, scenario.id]);
  const [palier, setPalier] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [report, setReport] = useState<ChainReport | null>(null);
  const [echecsConsecutifs, setEchecsConsecutifs] = useState(0);

  const quiz1 = useMemo(() => measure.quiz.filter((q) => q.palier === 1), [measure]);
  const quiz2 = useMemo(() => measure.quiz.filter((q) => q.palier === 2), [measure]);

  function toggle(id: string) {
    if (report?.outcome === "success") return;
    setReport(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="mesurer">
      <nav className="mesurer-nav">
        <button type="button" className="lien-retour" onClick={onBack}>
          Retour à l'atelier
        </button>
      </nav>

      <header className="mesurer-header">
        <p className="mesurer-surtitre">Geste 3 : mesurer</p>
        <h1>{scenario.title}</h1>
        <p className="mesurer-paliers" aria-label="Progression des paliers">
          {[1, 2, 3].map((p) => (
            <span key={p} className={`palier-jalon ${palier === p ? "palier-actif" : ""} ${palier > p ? "palier-passe" : ""}`}>
              {p === 1 ? "1. Lire" : p === 2 ? "2. Choisir" : "3. Construire"}
            </span>
          ))}
        </p>
      </header>

      <details className="theorie-panneau">
        <summary>Revoir la fondation : les familles d'indicateurs</summary>
        <div className="theorie">
          <FondationMesureRappel />
        </div>
      </details>

      {palier === 1 && (
        <Quiz
          items={quiz1}
          titre="Palier 1 : lire une mesure"
          aide="Des chiffres réels de l'équipe : que disent-ils vraiment ?"
          onDone={() => setPalier(2)}
          engine={engine}
          scenarioId={scenario.id}
        />
      )}

      {palier === 2 && (
        <Quiz
          items={quiz2}
          titre="Palier 2 : choisir la bonne métrique"
          aide="Une question, plusieurs thermomètres : un seul répond vraiment."
          onDone={() => setPalier(3)}
          engine={engine}
          scenarioId={scenario.id}
        />
      )}

      {palier === 3 && (
        <section aria-label="Palier 3 : construire la chaîne" className="palier">
          <h2 className="palier-titre">Palier 3 : construire la chaîne de mesure</h2>

          <div className="chaine-intro" aria-label="L'histoire à raconter">
            <p className="chaine-exemple">{measure.chainExample}</p>
          </div>

          <p className="palier-aide">
            À vous : racontez cette histoire pour {measure.processLabel}, en
            choisissant au plus {measure.maxChainBlocks} blocs dans la banque.
            Puis mettez la chaîne en service pour voir si elle tient. Un doute
            sur les familles d'indicateurs ? Le rappel est en haut de page.
          </p>
          <ul className="blocs">
            {measure.blocks.map((b) => {
              const isSelected = selected.has(b.id);
              const revealed = report !== null;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    className={`bloc ${isSelected ? "bloc-marque" : ""} ${
                      revealed && isSelected && b.kind === "piege" ? "bloc-piege" : ""
                    }`}
                    aria-pressed={isSelected}
                    disabled={report?.outcome === "success"}
                    onClick={() => toggle(b.id)}
                  >
                    <span className="bloc-label">{b.label}</span>
                    {revealed && isSelected && (
                      <span className="bloc-reveal">
                        <span className={`bloc-nature ${b.kind === "piege" ? "nature-piege" : "nature-ok"}`}>
                          {KIND_LABELS[b.kind]}
                          {b.timing ? ` · ${b.timing}` : ""}
                          {b.isFlowMetric ? " · métrique de flux" : ""}
                        </span>
                        <span className="bloc-pourquoi">{b.explanation}</span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mesurer-actions">
            {report?.outcome !== "success" && (
              <button
                type="button"
                className="action-principale"
                onClick={() => {
                  const r = engine.evaluateMeasureChain(scenario.id, [...selected]);
                  setReport(r);
                  setEchecsConsecutifs((n) => (r.outcome === "success" ? 0 : n + 1));
                }}
              >
                Mettre la chaîne en service
              </button>
            )}
            {report && (
              <button
                type="button"
                className="action-secondaire"
                onClick={() => {
                  setSelected(new Set());
                  setReport(null);
                }}
              >
                Recommencer
              </button>
            )}
          </div>

          <div role="status" aria-live="polite">
            {report && (
              <div className={`feedback-carte ${report.outcome === "success" ? "feedback-juste fluide" : "feedback-confusion"}`}>
                <p className="feedback-verdict">
                  {report.outcome === "success" ? "Le fluide circule" : "La chaîne casse"}
                </p>
                <p>{report.message}</p>
                {report.outcome === "success" && (
                  <p className="feedback-maitrise">
                    Maîtrise du geste Mesurer : {MASTERY_LABELS[engine.getMastery("mesurer")]}
                  </p>
                )}
              </div>
            )}
          </div>
          <RenvoiApresEchecs echecsConsecutifs={echecsConsecutifs} deepLink={deepLinkFondation} />
        </section>
      )}
    </main>
  );
}
