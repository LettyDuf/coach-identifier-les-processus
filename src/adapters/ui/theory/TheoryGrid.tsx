/**
 * "Comprendre la grille" : la théorie du classement, à la demande
 * (divulgation progressive, jamais un cours imposé).
 *
 * Un tableau croisé accessible : les trois types en lignes, les trois
 * niveaux en colonnes, un exemple concret par case. Tout le texte
 * vient du contenu (theory.ts), rien n'est formulé ici.
 */

import { PROCESS_LEVELS, PROCESS_TYPES } from "@domain/index";
import {
  GRID_EXAMPLES,
  LEVEL_THEORY,
  THEORY_BRIDGE,
  THEORY_KEY_MESSAGE,
  TYPE_THEORY,
} from "@content/theory";
import { CandidateIcon } from "../icons/CandidateIcon";
import { LEVEL_OPTIONS, TYPE_OPTIONS } from "@content/axisGuide";
import "./TheoryGrid.css";

function iconFor(value: string): string {
  return (
    [...TYPE_OPTIONS, ...LEVEL_OPTIONS].find((o) => o.value === value)?.icon ?? ""
  );
}

export function TheoryGrid() {
  return (
    <div className="theorie">
      <p className="theorie-cle">{THEORY_KEY_MESSAGE}</p>

      <div className="theorie-axes">
        <section aria-label="Les trois types">
          <h3>Le type : ce que le processus fait</h3>
          <ul>
            {PROCESS_TYPES.map((t) => (
              <li key={t}>
                <span className="theorie-icone" aria-hidden="true">
                  <CandidateIcon id={iconFor(t)} size={24} />
                </span>
                <span>
                  <strong>{TYPE_THEORY[t].label}.</strong> {TYPE_THEORY[t].description}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Les trois niveaux">
          <h3>Le niveau : où il vit</h3>
          <ul>
            {PROCESS_LEVELS.map((l) => (
              <li key={l}>
                <span className="theorie-icone" aria-hidden="true">
                  <CandidateIcon id={iconFor(l)} size={24} />
                </span>
                <span>
                  <strong>{LEVEL_THEORY[l].label}.</strong> {LEVEL_THEORY[l].description}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <table className="theorie-grille">
        <caption>Un exemple dans chaque case : chaque type existe à chaque niveau</caption>
        <thead>
          <tr>
            <td />
            {PROCESS_LEVELS.map((l) => (
              <th key={l} scope="col">
                {LEVEL_THEORY[l].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROCESS_TYPES.map((t) => (
            <tr key={t}>
              <th scope="row">{TYPE_THEORY[t].label}</th>
              {PROCESS_LEVELS.map((l) => (
                <td key={l}>{GRID_EXAMPLES[t][l]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="theorie-pont">{THEORY_BRIDGE}</p>
    </div>
  );
}
