/**
 * La carte à trois zooms (fiche théorie interactive, D14).
 *
 * Dévoilement progressif : seule la vue macro existe à l'ouverture ;
 * une case zoomable ouvre la vue suivante, la vue quittée s'estompe
 * mais reste cliquable pour remonter. Sorties : pastille "↑ fermer"
 * dans la case zoomée, clic sur un niveau estompé, touche Échap.
 * Tout le texte vient du contenu (zoomMap.ts), rien n'est formulé ici.
 */

import { useEffect, useState } from "react";
import { ZOOM_MAP, type ZoomCase } from "@content/zoomMap";
import "./ZoomMap.css";

type Panneau = { title: string; text: string };

const PANNEAU_INITIAL: Panneau = {
  title: "Cliquez sur une case de la vue macro",
  text: ZOOM_MAP.intro,
};

function CaseButton({
  c,
  chosen,
  dimmed,
  open,
  onClick,
}: {
  c: ZoomCase;
  chosen: boolean;
  dimmed: boolean;
  open: boolean;
  onClick: () => void;
}) {
  const zoomable = Boolean(c.opensMedium || c.opensMicro);
  return (
    <button
      type="button"
      className={`zc-case ${chosen ? "zc-choisie" : ""} ${dimmed ? "zc-eteinte" : ""}`}
      aria-expanded={zoomable ? open : undefined}
      title={zoomable ? (open ? "Refermer cette vue" : "Ouvrir la vue suivante") : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span>{c.label}</span>
      {zoomable ? (
        <span className={`zc-badge ${open ? "zc-badge-retour" : "zc-badge-zoom"}`}>
          {open ? "↑ fermer" : "zoom"}
        </span>
      ) : (
        c.info && <span className="zc-badge zc-badge-info">info</span>
      )}
    </button>
  );
}

export function ZoomMap() {
  const [mediumKey, setMediumKey] = useState<string | null>(null);
  const [macroChoice, setMacroChoice] = useState<string | null>(null);
  const [microOpen, setMicroOpen] = useState(false);
  const [mediumChoice, setMediumChoice] = useState<string | null>(null);
  const [panneau, setPanneau] = useState<Panneau>(PANNEAU_INITIAL);

  const medium = mediumKey ? ZOOM_MAP.mediums[mediumKey] : undefined;
  const micro = medium && microOpen ? ZOOM_MAP.micros[medium.microKey] : undefined;

  function fermerMicro() {
    setMicroOpen(false);
    setMediumChoice(null);
  }

  function fermerMedium() {
    fermerMicro();
    setMediumKey(null);
    setMacroChoice(null);
    setPanneau({
      title: "Retour à la vue macro",
      text: "Cliquez sur une case pour explorer à nouveau.",
    });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (microOpen) fermerMicro();
      else if (mediumKey) fermerMedium();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function clicMacro(c: ZoomCase) {
    if (c.opensMedium && mediumKey === c.opensMedium && macroChoice === c.id) {
      fermerMedium();
      return;
    }
    setMacroChoice(c.id);
    if (c.info) setPanneau(c.info);
    if (c.opensMedium) {
      fermerMicro();
      setMediumKey(c.opensMedium);
    }
  }

  function clicMedium(c: ZoomCase) {
    if (c.opensMicro && microOpen && mediumChoice === c.id) {
      fermerMicro();
      return;
    }
    setMediumChoice(c.id);
    if (c.opensMicro) {
      setMicroOpen(true);
      setPanneau({ title: c.label, text: "Le zoom ouvre le processus de l'équipe en vue micro." });
    } else if (c.info) {
      setPanneau(c.info);
    }
  }

  return (
    <div className="zoomcarte">
      <section
        className={`zc-niveau zc-macro ${mediumKey ? "zc-estompe" : ""}`}
        aria-label="Vue macro"
        onClick={() => {
          if (mediumKey) fermerMedium();
        }}
      >
        <div className="zc-entete">
          <span className="zc-nom">{ZOOM_MAP.macro.title}</span>
          <span className="zc-qui">{ZOOM_MAP.macro.owner}</span>
        </div>
        <div className="zc-rangee">
          {ZOOM_MAP.macro.cases.map((c) => (
            <CaseButton
              key={c.id}
              c={c}
              chosen={macroChoice === c.id}
              dimmed={mediumKey !== null && macroChoice !== c.id}
              open={Boolean(c.opensMedium) && mediumKey === c.opensMedium}
              onClick={() => clicMacro(c)}
            />
          ))}
        </div>
      </section>

      {medium && (
        <>
          <p className="zc-lien">
            zoom sur « {ZOOM_MAP.macro.cases.find((c) => c.id === macroChoice)?.label} »
          </p>
          <section
            className={`zc-niveau zc-medium zc-decale-1 ${microOpen ? "zc-estompe" : ""}`}
            aria-label="Vue médium"
            onClick={() => {
              if (microOpen) fermerMicro();
            }}
          >
            <div className="zc-entete">
              <span className="zc-nom">{medium.title}</span>
              <span className="zc-qui">{ZOOM_MAP.mediumOwner}</span>
            </div>
            <div className="zc-rangee">
              {medium.cases.map((c) => (
                <CaseButton
                  key={c.id}
                  c={c}
                  chosen={mediumChoice === c.id}
                  dimmed={microOpen && mediumChoice !== c.id}
                  open={Boolean(c.opensMicro) && microOpen && mediumChoice === c.id}
                  onClick={() => clicMedium(c)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {micro && (
        <>
          <p className="zc-lien zc-decale-1">
            zoom sur « {medium!.cases.find((c) => c.id === mediumChoice)?.label} »
          </p>
          <section className="zc-niveau zc-micro zc-decale-2" aria-label="Vue micro">
            <div className="zc-entete">
              <span className="zc-nom">{micro.title}</span>
              <span className="zc-qui">{ZOOM_MAP.microOwner}</span>
            </div>
            <div className="zc-rangee">
              {micro.steps.map((s) => (
                <span key={s} className="zc-case zc-etape-fixe">
                  {s}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

      <div className="zc-panneau" role="status" aria-live="polite">
        <p className="zc-panneau-titre">{panneau.title}</p>
        <p className="zc-panneau-texte">{panneau.text}</p>
      </div>
    </div>
  );
}
