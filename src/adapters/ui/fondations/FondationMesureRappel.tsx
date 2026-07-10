/**
 * Rappel compact de la fondation F4 (les familles d'indicateurs),
 * affiché dans les gestes comme renvoi repliable : définitions et
 * tableau qui-utilise-quoi, sans les activités.
 */

import { F4_MESURE } from "@content/fondations";

export function FondationMesureRappel() {
  return (
    <div className="fondation-rappel">
      <p className="rappel-ancrage">{F4_MESURE.ancrage}</p>
      <ul className="rappel-definitions">
        {F4_MESURE.families.map((f) => (
          <li key={f.kind}>
            <strong>{f.kind.toUpperCase()}.</strong> {f.definition} {f.question}
          </li>
        ))}
      </ul>
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
    </div>
  );
}
