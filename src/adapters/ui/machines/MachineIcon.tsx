/**
 * Petite machine de la manufacture : trémie (entrée), corps
 * (transformation), bec (sortie). Trois états visuels ; l'information
 * est toujours doublée d'un mot dans l'UI, jamais la couleur seule.
 */

export type MachineState = "eteinte" | "allumee" | "alerte";

const COLORS: Record<MachineState, { body: string; window: string; glow: number }> = {
  eteinte: { body: "#57616e", window: "#39434f", glow: 0 },
  allumee: { body: "var(--laiton)", window: "var(--verre)", glow: 0.55 },
  alerte: { body: "var(--laiton-sombre)", window: "var(--alerte)", glow: 0.4 },
};

export function MachineIcon({ state }: { state: MachineState }) {
  const c = COLORS[state];
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {c.glow > 0 && <circle cx="22" cy="24" r="18" fill={c.window} opacity={c.glow * 0.25} />}
      {/* Trémie d'entrée */}
      <path d="M12 4 L32 4 L26 12 L18 12 Z" fill={c.body} />
      {/* Corps de machine */}
      <rect x="10" y="12" width="24" height="18" rx="3" fill={c.body} />
      {/* Hublot */}
      <circle cx="22" cy="21" r="5.5" fill={c.window} opacity={state === "eteinte" ? 0.5 : 1} />
      {/* Bec de sortie */}
      <path d="M30 30 L38 36 L30 36 Z" fill={c.body} />
      {/* Pieds */}
      <rect x="13" y="30" width="4" height="6" fill={c.body} />
      <rect x="27" y="30" width="4" height="6" fill={c.body} />
    </svg>
  );
}
