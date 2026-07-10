/**
 * Le geste Mesurer (DOMAINE.md §3).
 *
 * Un bloc de mesure est un KBI (comportement, leading), un KPI
 * (performance du processus ; les métriques de flux en sont des
 * instances, D4), un KGI (résultat, lagging), ou un piège (occupation,
 * comparaison entre équipes, volume d'activité).
 *
 * Un dispositif valide : exactement un KGI, au moins un KPI et un
 * KBI, au moins un leading et un lagging, aucun piège.
 */

export type MeasureBlockKind = "kbi" | "kpi" | "kgi" | "piege";
export type MeasureTiming = "leading" | "lagging";

export type MeasureBlock = {
  readonly id: string;
  readonly label: string;
  readonly kind: MeasureBlockKind;
  /** Absent pour les pièges. */
  readonly timing?: MeasureTiming;
  /** Vrai pour les métriques de flux (instances de KPI, D4). */
  readonly isFlowMetric?: boolean;
  /** Le pourquoi, rédigé dans le corpus. */
  readonly explanation: string;
};

export type ChainViolation =
  | "empty"
  | "trap-included"
  | "too-many"
  | "no-kgi"
  | "multiple-kgi"
  | "missing-kpi"
  | "missing-kbi"
  | "missing-leading"
  | "missing-lagging";

/** Messages du corpus, sélectionnés par le moteur selon la première violation. */
export type ChainFeedbacks = {
  readonly success: string;
  readonly violations: Readonly<Record<ChainViolation, string>>;
};

export type ChainReport = {
  readonly outcome: "success" | "miss";
  readonly violations: ReadonlyArray<ChainViolation>;
  /** Message global : celui de la première violation, ou le succès. */
  readonly message: string;
};

/** Un item de QCM des paliers "lire une mesure" et "choisir la métrique". */
export type QuizOption = {
  readonly id: string;
  readonly label: string;
  readonly correct: boolean;
  readonly feedback: string;
};

export type QuizItem = {
  readonly id: string;
  readonly palier: 1 | 2;
  readonly question: string;
  readonly options: ReadonlyArray<QuizOption>;
};

export type QuizVerdict = {
  readonly correct: boolean;
  readonly feedback: string;
};

/** Le matériau du geste Mesurer pour un scénario. */
export type MeasureContent = {
  /** Le processus mesuré, ex. "le traitement d'une demande client". */
  readonly processLabel: string;
  /** La phrase-exemple causale "si... alors... et..." du scénario. */
  readonly chainExample: string;
  readonly blocks: ReadonlyArray<MeasureBlock>;
  /** Sobriété : un tableau de bord qui mesure tout ne pilote rien. */
  readonly maxChainBlocks: number;
  readonly chainFeedbacks: ChainFeedbacks;
  /** Une chaîne valide de référence (sert de fixture aux tests corpus). */
  readonly validExample: ReadonlyArray<string>;
  readonly quiz: ReadonlyArray<QuizItem>;
};
