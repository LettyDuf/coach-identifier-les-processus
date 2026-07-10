/**
 * Port de sortie (driven) : source de hasard injectée.
 *
 * Le domaine n'utilise jamais Math.random() directement, sinon les
 * tests deviennent non déterministes. Sert au mélange des candidats.
 */
export type RandomSource = {
  /** Entier dans [0, max) avec distribution uniforme. */
  nextInt(max: number): number;
};
