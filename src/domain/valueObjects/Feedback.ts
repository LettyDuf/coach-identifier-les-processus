/**
 * Brique élémentaire de tout feedback du domaine.
 *
 * Principe repris des coachs frères : le moteur ne formule pas, il
 * sélectionne. Tout message est rédigé en français dans le corpus,
 * validé par Lætitia ; le moteur choisit lequel renvoyer selon la
 * production de l'apprenant.
 */

export type FeedbackVerdict = "ok" | "wrong";

export type Feedback = {
  readonly verdict: FeedbackVerdict;
  readonly message: string;
};
