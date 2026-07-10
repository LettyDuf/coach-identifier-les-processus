/**
 * Le geste Repérer : parcourir le récit en vignettes, marquer les
 * cartes qui sont des processus.
 *
 * Avant vérification : cartes compactes (icône figurative + nom
 * court). Après : chaque carte révèle sa carte d'identité (Entrée /
 * Sortie / Client pour un processus, tampon de nature pour un leurre).
 * Le mot accompagne toujours la couleur ; message global en aria-live.
 */

import { useMemo, useState } from "react";
import type {
  CandidateId,
  CandidateReport,
  ProcessCandidate,
  ProcessCoachEngine,
  ProcessScenario,
  SpottingReport,
} from "@domain/index";
import { CandidateIcon } from "../icons/CandidateIcon";
import { MachineIcon } from "../machines/MachineIcon";
import { F1_PROCESSUS } from "@content/fondations";
import { RenvoiApresEchecs, type DeepLinkFondation } from "../fondations/RenvoiApresEchecs";
import "./SpottingBoard.css";

const VERDICT_LABELS: Record<CandidateReport["verdict"], string> = {
  trouve: "Trouvé",
  manque: "Manqué",
  "faux-positif": "C'était un leurre",
  "bien-ecarte": "Bien écarté",
};

function isOkVerdict(verdict: CandidateReport["verdict"]): boolean {
  return verdict === "trouve" || verdict === "bien-ecarte";
}

function IdentityReveal({
  candidate,
  report,
}: {
  candidate: ProcessCandidate;
  report: CandidateReport;
}) {
  const ok = isOkVerdict(report.verdict);
  return (
    <span className="carte-reveal">
      <span className={`verdict-mot ${ok ? "verdict-ok" : "verdict-alerte"}`}>
        {VERDICT_LABELS[report.verdict]}
      </span>
      {candidate.isProcess && candidate.identity ? (
        <span className="carte-identite">
          <span className="identite-entete">
            <MachineIcon state={ok ? "allumee" : "alerte"} />
            <span className="identite-titre">Processus</span>
          </span>
          <span className="identite-ligne">
            <span className="identite-cle">Entrée</span>
            <span className="identite-valeur">{candidate.identity.entree}</span>
          </span>
          <span className="identite-ligne">
            <span className="identite-cle">Sortie</span>
            <span className="identite-valeur">{candidate.identity.sortie}</span>
          </span>
          <span className="identite-ligne">
            <span className="identite-cle">Client</span>
            <span className="identite-valeur">{candidate.identity.client}</span>
          </span>
        </span>
      ) : (
        <span className="carte-identite carte-identite-leurre">
          <span className={`tampon-nature ${ok ? "tampon-ok" : "tampon-alerte"}`}>
            {candidate.nature}
          </span>
          <span className="verdict-pourquoi">{report.explanation}</span>
        </span>
      )}
    </span>
  );
}

type Props = {
  scenario: ProcessScenario;
  engine: ProcessCoachEngine;
  onBack: () => void;
  deepLinkFondation?: DeepLinkFondation | undefined;
};

export function SpottingBoard({ scenario, engine, onBack, deepLinkFondation }: Props) {
  const [selected, setSelected] = useState<ReadonlySet<CandidateId>>(new Set());
  const [report, setReport] = useState<SpottingReport | null>(null);
  const [round, setRound] = useState(0);
  const [echecsConsecutifs, setEchecsConsecutifs] = useState(0);

  const order = useMemo(
    () => engine.shuffledCandidateIds(scenario.id),
    [engine, scenario.id, round],
  );

  const byId = useMemo(
    () => new Map(scenario.candidates.map((c) => [c.id, c])),
    [scenario],
  );
  const reportById = useMemo(
    () => new Map(report?.perCandidate.map((r) => [r.candidateId, r]) ?? []),
    [report],
  );

  function toggle(id: CandidateId) {
    if (report) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function verify() {
    const r = engine.evaluateSpotting(scenario.id, [...selected]);
    setReport(r);
    setEchecsConsecutifs((n) => (r.outcome === "success" ? 0 : n + 1));
  }

  function replay() {
    setSelected(new Set());
    setReport(null);
    setRound((r) => r + 1);
  }

  const masteryLabel: Record<string, string> = {
    "non-commencee": "non commencée",
    effleuree: "effleurée",
    travaillee: "travaillée",
    consolidee: "consolidée",
  };

  return (
    <main className="spotting">
      <nav className="spotting-nav">
        <button type="button" className="lien-retour" onClick={onBack}>
          Retour à l'atelier
        </button>
      </nav>

      <header className="spotting-header">
        <p className="spotting-surtitre">Geste 1 : repérer</p>
        <h1>{scenario.title}</h1>
      </header>

      <details className="theorie-panneau">
        <summary>Revoir la fondation : les trois tests d'un processus</summary>
        <div className="theorie">
          <ol className="fondation-tests">
            {F1_PROCESSUS.tests.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <p className="fondation-moral">{F1_PROCESSUS.moral}</p>
        </div>
      </details>

      <section className="recit" aria-label="Le récit en vignettes">
        <ul className="vignettes">
          {scenario.narrative.map((scene, i) => (
            <li key={i} className="vignette">
              <span className="vignette-icone" aria-hidden="true">
                <CandidateIcon id={scene.icon} size={34} />
              </span>
              <p>{scene.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Les cartes candidates">
        <h2 className="consigne">Marquez toutes les cartes qui sont des processus.</h2>
        <p className="consigne-aide">
          Méfiance, il y a des leurres. Un doute ? Les trois tests sont dans le
          rappel en haut de page.
        </p>

        <ul className="plaques">
          {order.map((id) => {
            const candidate = byId.get(id);
            if (!candidate) return null;
            const r = reportById.get(id);
            const isSelected = selected.has(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`plaque ${isSelected ? "plaque-marquee" : ""} ${
                    r ? `plaque-${r.verdict}` : ""
                  }`}
                  aria-pressed={isSelected}
                  disabled={report !== null}
                  onClick={() => toggle(id)}
                >
                  <span className="plaque-face">
                    <span className="plaque-icone" aria-hidden="true">
                      <CandidateIcon id={candidate.icon} />
                    </span>
                    <span className="plaque-label">{candidate.shortLabel}</span>
                  </span>
                  {r && <IdentityReveal candidate={candidate} report={r} />}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="spotting-actions">
        {!report ? (
          <button type="button" className="action-principale" onClick={verify}>
            Vérifier mon repérage
          </button>
        ) : (
          <button type="button" className="action-principale" onClick={replay}>
            Rejouer
          </button>
        )}
      </div>

      <div role="status" aria-live="polite" className="spotting-feedback">
        {report && (
          <div className={`feedback-global feedback-${report.outcome}`}>
            <p className="feedback-titre">
              {report.outcome === "success" ? "Repérage complet" : "Presque"}
            </p>
            <p>{report.message}</p>
            {report.outcome === "success" && (
              <p className="feedback-maitrise">
                Maîtrise du geste Repérer : {masteryLabel[engine.getMastery("reperer")]}
              </p>
            )}
          </div>
        )}
      </div>

      <RenvoiApresEchecs echecsConsecutifs={echecsConsecutifs} deepLink={deepLinkFondation} />
    </main>
  );
}
