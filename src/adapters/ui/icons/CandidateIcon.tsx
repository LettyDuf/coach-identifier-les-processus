/**
 * Icônes figuratives des vignettes et des cartes candidates.
 *
 * Règle D12 : l'icône représente la chose (une enveloppe, une
 * balance), jamais sa catégorie (outil, rôle...), sinon l'exercice se
 * répond tout seul. Le contenu déclare un identifiant ; la
 * correspondance visuelle vit ici, côté UI. Identifiant inconnu :
 * icône générique, jamais d'erreur.
 */

import type { ReactElement } from "react";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const CANDIDATE_ICONS: Record<string, ReactElement> = {
  equipe: (
    <g {...S}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.4-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2c2.7 0 4.7 1.8 4.7 4.4" />
    </g>
  ),
  bulle: (
    <g {...S}>
      <path d="M4 5.5h16v10.5H10l-6 4.5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </g>
  ),
  demande: (
    <g {...S}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </g>
  ),
  entonnoir: (
    <g {...S}>
      <path d="M4 5h16l-6 7v5.5l-4 2.5v-8z" />
    </g>
  ),
  balance: (
    <g {...S}>
      <path d="M12 4v15M6 7h12M8 19h8" />
      <path d="M6 7l-2.6 5.5a2.9 2.9 0 005.2 0z" />
      <path d="M18 7l-2.6 5.5a2.9 2.9 0 005.2 0z" />
    </g>
  ),
  courbe: (
    <g {...S}>
      <path d="M3 19l6-7 3.5 3.5L20 8" />
      <path d="M15.5 7.5H20V12" />
    </g>
  ),
  spirale: (
    <g {...S}>
      <path d="M19.5 12a7.5 7.5 0 11-2.2-5.3" />
      <path d="M19.8 3.8v3.4h-3.4" />
    </g>
  ),
  porte: (
    <g {...S}>
      <path d="M9 3.5h9v17H9" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <path d="M2.5 12h6M6 9.5L8.8 12 6 14.5" />
    </g>
  ),
  tableau: (
    <g {...S}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M9.5 4v16M15.5 4v16" />
      <path d="M5.5 7.5h1.8M11.5 7.5h1.8M11.5 11h1.8M17.5 7.5h1.8" />
    </g>
  ),
  loupe: (
    <g {...S}>
      <circle cx="10.5" cy="10.5" r="5.8" />
      <path d="M15 15l5.5 5.5" />
    </g>
  ),
  boussole: (
    <g {...S}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </g>
  ),
  engrenage: (
    <g {...S}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.7M12 17.8v2.7M3.5 12h2.7M17.8 12h2.7M6 6l1.9 1.9M16.1 16.1L18 18M18 6l-1.9 1.9M7.9 16.1L6 18" />
    </g>
  ),
  pilier: (
    <g {...S}>
      <path d="M5 4.5h14M5 19.5h14" />
      <path d="M8 7v10.5M12 7v10.5M16 7v10.5" />
      <path d="M6 7h12" />
    </g>
  ),
  reseau: (
    <g {...S}>
      <circle cx="6.5" cy="7" r="2.3" />
      <circle cx="17.5" cy="7" r="2.3" />
      <circle cx="12" cy="17" r="2.3" />
      <path d="M8.7 7.6h6.6M7.6 9l3.2 6M16.4 9l-3.2 6" />
    </g>
  ),
  fanion: (
    <g {...S}>
      <path d="M6.5 3.5v17" />
      <path d="M6.5 4.5h11l-2.7 3.5 2.7 3.5h-11" />
    </g>
  ),
};

const GENERIC: ReactElement = (
  <g {...S}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </g>
);

export function CandidateIcon({ id, size = 30 }: { id: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {CANDIDATE_ICONS[id] ?? GENERIC}
    </svg>
  );
}
