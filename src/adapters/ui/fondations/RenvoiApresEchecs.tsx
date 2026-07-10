/**
 * Renvoi contextuel après deux échecs sur le même exercice (D16, dette
 * levée le 2026-07-09). Jamais bloquant : une suggestion discrète, pas
 * une porte fermée. Le clic ouvre la fondation liée en entier (pas
 * seulement son rappel repliable) et mémorise l'exercice à retrouver.
 */

import "./RenvoiApresEchecs.css";

/** Le nécessaire pour ouvrir la fondation liée à un geste depuis un exercice. */
export type DeepLinkFondation = {
  readonly titre: string;
  readonly onOpen: () => void;
};

/** Seuil D16 : deux échecs consécutifs sur le même exercice. */
export const SEUIL_ECHECS_RENVOI = 2;

type Props = {
  echecsConsecutifs: number;
  deepLink?: DeepLinkFondation | undefined;
};

export function RenvoiApresEchecs({ echecsConsecutifs, deepLink }: Props) {
  if (!deepLink || echecsConsecutifs < SEUIL_ECHECS_RENVOI) return null;
  return (
    <p className="renvoi-echecs" role="note">
      <span className="renvoi-echecs-texte">Ça résiste ? Un détour peut aider.</span>
      <button type="button" className="renvoi-echecs-lien" onClick={deepLink.onOpen}>
        Revoir en entier : {deepLink.titre}
      </button>
    </p>
  );
}
