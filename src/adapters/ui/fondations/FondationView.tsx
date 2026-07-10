/**
 * Les vues du bureau d'études (D16). Chaque fondation s'ouvre par un
 * mini-problème, jamais par un cours, et se clôt par un renvoi vers
 * l'atelier. Tout le texte vient de content/fondations.ts.
 */

import { useState } from "react";
import type { FondationId } from "@content/fondations";
import { F1_PROCESSUS, F4_MESURE, FONDATIONS } from "@content/fondations";
import type { QuizOption, SenseSituation, FamilyRound } from "@content/fondations";
import { ZoomMap } from "../zoommap/ZoomMap";
import { TheoryGrid } from "../theory/TheoryGrid";
import "./Fondations.css";

/* F1 : votes puis les trois tests */

function FondationProcessus({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const vote = F1_PROCESSUS.votes[index];

  if (finished || !vote) {
    return (
      <div className="fondation-corps">
        <h2 className="fondation-sous-titre">Les trois tests</h2>
        <ol className="fondation-tests">
          {F1_PROCESSUS.tests.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p className="fondation-moral">{F1_PROCESSUS.moral}</p>
        <div className="fondation-actions">
          <p className="fondation-vers-atelier">{F1_PROCESSUS.versAtelier}</p>
          <button type="button" className="action-principale" onClick={onDone}>
            Aller à l'atelier
          </button>
        </div>
      </div>
    );
  }

  const correct = answered !== null && answered === vote.isProcess;

  return (
    <div className="fondation-corps">
      <p className="fondation-probleme">
        Votez : ceci est-il un processus ? ({index + 1} sur {F1_PROCESSUS.votes.length})
      </p>
      <p className="quiz-question">« {vote.label} »</p>
      <div className="famille-reponses">
        <button
          type="button"
          className="quiz-option famille-bouton"
          disabled={answered !== null}
          onClick={() => setAnswered(true)}
        >
          Oui, c'est un processus
        </button>
        <button
          type="button"
          className="quiz-option famille-bouton"
          disabled={answered !== null}
          onClick={() => setAnswered(false)}
        >
          Non
        </button>
      </div>
      <div role="status" aria-live="polite">
        {answered !== null && (
          <div className={`feedback-carte ${correct ? "feedback-juste" : "feedback-confusion"}`}>
            <p className="feedback-verdict">{correct ? "Exact" : "Pas tout à fait"}</p>
            <p>{vote.explanation}</p>
            <button
              type="button"
              className="action-principale"
              onClick={() => {
                setAnswered(null);
                if (index + 1 < F1_PROCESSUS.votes.length) setIndex(index + 1);
                else setFinished(true);
              }}
            >
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* F4, volet 1 : les situations d'échec puis la synthèse */

function SenseVolet({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<QuizOption | null>(null);
  const [synthese, setSynthese] = useState(false);

  const situation: SenseSituation | undefined = F4_MESURE.situations[index];

  if (synthese) {
    return (
      <div className="fondation-corps">
        <h2 className="fondation-sous-titre">Trois aiguilles, un seul tableau de bord</h2>
        <p className="sens-complement">{F4_MESURE.complement}</p>
        <table className="sens-usagers">
          <caption>Qui utilise quoi, à quelle cadence</caption>
          <thead>
            <tr>
              <th scope="col">Famille</th>
              <th scope="col">Qui</th>
              <th scope="col">Quand</th>
              <th scope="col">Pour quoi faire</th>
            </tr>
          </thead>
          <tbody>
            {F4_MESURE.users.map((u) => (
              <tr key={u.kind}>
                <th scope="row">{u.kind.toUpperCase()}</th>
                <td>{u.who}</td>
                <td>{u.cadence}</td>
                <td>{u.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fondation-actions">
          <button type="button" className="action-principale" onClick={onDone}>
            Apprendre à les reconnaître
          </button>
        </div>
      </div>
    );
  }

  if (!situation) return null;

  return (
    <div className="fondation-corps">
      <p className="fondation-probleme">
        Situation {index + 1} sur {F4_MESURE.situations.length} : un tableau de bord à une
        seule aiguille.
      </p>
      <div className="sens-contexte">
        <p>{situation.context}</p>
      </div>
      <p className="quiz-question">{situation.question}</p>
      <ul className="quiz-options">
        {situation.options.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              className={`quiz-option ${choice?.id === o.id ? "quiz-choisie" : ""}`}
              disabled={choice !== null}
              onClick={() => setChoice(o)}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
      <div role="status" aria-live="polite">
        {choice && (
          <div className={`feedback-carte ${choice.correct ? "feedback-juste" : "feedback-confusion"}`}>
            <p className="feedback-verdict">{choice.correct ? "Exact" : "Pas tout à fait"}</p>
            <p>{choice.feedback}</p>
            <p className="sens-lecon">{situation.lesson}</p>
            <button
              type="button"
              className="action-principale"
              onClick={() => {
                setChoice(null);
                if (index + 1 < F4_MESURE.situations.length) setIndex(index + 1);
                else setSynthese(true);
              }}
            >
              {index + 1 < F4_MESURE.situations.length ? "Situation suivante" : "Voir la synthèse"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* F4, volet 2 : reconnaître les familles */

function FamiliesVolet({ onDone }: { onDone: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);

  const round: FamilyRound | undefined = F4_MESURE.families[roundIndex];
  const item = round?.items[itemIndex];
  if (!round || !item) return null;

  const kindLabel = round.kind.toUpperCase();
  const correct = answered !== null && answered === item.isKind;

  function next() {
    setAnswered(null);
    if (itemIndex + 1 < round!.items.length) {
      setItemIndex(itemIndex + 1);
      return;
    }
    if (roundIndex + 1 < F4_MESURE.families.length) {
      setRoundIndex(roundIndex + 1);
      setItemIndex(0);
      return;
    }
    onDone();
  }

  return (
    <div className="fondation-corps">
      <p className="fondation-probleme">
        Reconnaître les familles · manche {roundIndex + 1} sur {F4_MESURE.families.length}
      </p>
      <div className="famille-manche">
        <p className="famille-def">
          <strong className="famille-sigle">{kindLabel}</strong> {round.definition}
        </p>
        <p className="famille-question">{round.question}</p>
      </div>
      <p className="quiz-question">« {item.label} » : est-ce un {kindLabel} ?</p>
      <div className="famille-reponses">
        <button
          type="button"
          className="quiz-option famille-bouton"
          disabled={answered !== null}
          onClick={() => setAnswered(true)}
        >
          Oui, c'est un {kindLabel}
        </button>
        <button
          type="button"
          className="quiz-option famille-bouton"
          disabled={answered !== null}
          onClick={() => setAnswered(false)}
        >
          Non
        </button>
      </div>
      <div role="status" aria-live="polite">
        {answered !== null && (
          <div className={`feedback-carte ${correct ? "feedback-juste" : "feedback-confusion"}`}>
            <p className="feedback-verdict">{correct ? "Exact" : "Pas tout à fait"}</p>
            <p>{item.explanation}</p>
            <button type="button" className="action-principale" onClick={next}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FondationMesure({ onDone }: { onDone: () => void }) {
  const [volet, setVolet] = useState<1 | 2 | 3>(1);
  if (volet === 1) {
    return (
      <>
        <p className="fondation-ancrage">{F4_MESURE.ancrage}</p>
        <SenseVolet onDone={() => setVolet(2)} />
      </>
    );
  }
  if (volet === 2) {
    return <FamiliesVolet onDone={() => setVolet(3)} />;
  }
  return (
    <div className="fondation-corps">
      <div className="fondation-actions">
        <p className="fondation-vers-atelier">{F4_MESURE.versAtelier}</p>
        <button type="button" className="action-principale" onClick={onDone}>
          Aller à l'atelier
        </button>
      </div>
    </div>
  );
}

/* La vue générique d'une fondation */

type Props = {
  id: FondationId;
  onBack: () => void;
  onToAtelier: () => void;
};

export function FondationView({ id, onBack, onToAtelier }: Props) {
  const meta = FONDATIONS.find((f) => f.id === id)!;

  return (
    <main className="fondation">
      <nav className="fondation-nav">
        <button type="button" className="lien-retour" onClick={onBack}>
          Retour au bureau d'études
        </button>
      </nav>
      <header className="fondation-header">
        <p className="fondation-surtitre">Le bureau d'études</p>
        <h1>{meta.title}</h1>
        <p className="fondation-baseline">{meta.question}</p>
      </header>

      {id === "processus" && <FondationProcessus onDone={onToAtelier} />}
      {id === "carte" && (
        <div className="fondation-corps">
          <ZoomMap />
        </div>
      )}
      {id === "grille" && (
        <div className="fondation-corps fondation-grille">
          <TheoryGrid />
          <div className="fondation-actions">
            <button type="button" className="action-principale" onClick={onToAtelier}>
              Aller à l'atelier
            </button>
          </div>
        </div>
      )}
      {id === "mesure" && <FondationMesure onDone={onToAtelier} />}
    </main>
  );
}
