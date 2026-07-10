// @ts-check
import tseslint from "typescript-eslint";

/**
 * Garde-fou d'architecture hexagonale (complète le canari
 * tests/domain/isolation.test.ts par un retour dès l'écriture, pas
 * seulement au lancement des tests) : le domaine ne doit jamais
 * importer React, le contenu, les adaptateurs ni l'app.
 */
const DOMAIN_FORBIDDEN = [
  {
    group: ["react", "react/*", "zod", "zustand", "@content/*", "@adapters/*", "@app/*"],
    message: "src/domain doit rester pur : aucune dépendance à React, au contenu, aux adaptateurs ou à l'app (architecture hexagonale).",
  },
];

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coach-processus.html"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": ["error", { patterns: DOMAIN_FORBIDDEN }],
    },
  },
);
