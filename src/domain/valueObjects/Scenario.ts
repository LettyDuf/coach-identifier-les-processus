/**
 * Le scénario narratif et ses candidats : le matériau du geste Repérer.
 *
 * Le récit est découpé en vignettes illustrées (icône + texte court) :
 * la synthèse visuelle prime sur la lecture. Un candidat est une carte
 * compacte (icône figurative + nom court). Après vérification, la
 * carte révèle sa carte d'identité : Entrée / Sortie / Client pour un
 * vrai processus (SIPOC allégé, DOMAINE.md §1), ou sa nature pour un
 * leurre (outil, rôle, cérémonie, événement).
 *
 * Règle de conception (D12) : l'icône représente la chose, jamais sa
 * catégorie, sinon l'exercice se répond tout seul.
 */

import type { CandidateId, ScenarioId, WorkGroupId } from "./ids";
import type { ItemSignature } from "./Mastery";
import type { ClassificationSpec } from "./Classification";
import type { MeasureContent } from "./Measure";

/** Une scène du récit : une icône figurative et un texte bref. */
export type NarrativeScene = {
  readonly icon: string;
  readonly text: string;
};

/** La carte d'identité d'un vrai processus : le SIPOC allégé. */
export type ProcessIdentity = {
  readonly entree: string;
  readonly sortie: string;
  readonly client: string;
};

export type ProcessCandidate = {
  readonly id: CandidateId;
  /** Nom court affiché sur la carte (la lecture longue vit dans la carte d'identité). */
  readonly shortLabel: string;
  /** Icône figurative (identifiant de donnée ; l'UI fait la correspondance). */
  readonly icon: string;
  readonly isProcess: boolean;
  /** Le pourquoi, rédigé dans le corpus. */
  readonly explanation: string;
  /** Requis si isProcess (invariant validé par le schéma de contenu). */
  readonly identity?: ProcessIdentity;
  /** Requis si isProcess : le corrigé de classement à deux axes (geste 2). */
  readonly classification?: ClassificationSpec;
  /** Requis si leurre : sa nature ("Outil", "Rôle", "Cérémonie", "Événement ponctuel"...). */
  readonly nature?: string;
};

/** Messages globaux du geste Repérer, choisis par le moteur selon le résultat. */
export type SpottingFeedbacks = {
  readonly success: string;
  readonly missed: string;
  readonly falsePositive: string;
  readonly mixed: string;
};

/** Messages globaux du geste Classer. */
export type ClassificationFeedbacks = {
  readonly success: string;
  readonly miss: string;
};

export type ProcessScenario = {
  readonly id: ScenarioId;
  readonly group: WorkGroupId;
  readonly title: string;
  /** Le récit, en vignettes illustrées. */
  readonly narrative: ReadonlyArray<NarrativeScene>;
  readonly candidates: ReadonlyArray<ProcessCandidate>;
  readonly spottingFeedbacks: SpottingFeedbacks;
  readonly classificationFeedbacks: ClassificationFeedbacks;
  /** Le matériau du geste Mesurer. Optionnel dans le type, exigé par le schéma de contenu. */
  readonly measure?: MeasureContent;
  readonly signature: ItemSignature;
};

/** Un groupe de travail tel que le contenu le déclare (D8 : donnée, pas enum). */
export type WorkGroup = {
  readonly id: WorkGroupId;
  readonly label: string;
  readonly tagline: string;
  /** false = atelier visible mais en préparation. */
  readonly open: boolean;
};
