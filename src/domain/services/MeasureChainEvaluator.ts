/**
 * Évaluation du palier 3 : la chaîne de mesure construite par blocs.
 *
 * Règles structurelles du DOMAINE §3, vérifiées dans un ordre
 * pédagogique stable : le piège d'abord (c'est la leçon la plus
 * importante), puis le KGI, puis la couverture KPI/KBI, puis le
 * timing. Les messages viennent du corpus.
 */

import type {
  ChainFeedbacks,
  ChainReport,
  ChainViolation,
  MeasureBlock,
} from "../valueObjects/Measure";

export function evaluateMeasureChain(
  allBlocks: ReadonlyArray<MeasureBlock>,
  selectedIds: ReadonlyArray<string>,
  feedbacks: ChainFeedbacks,
  maxBlocks: number,
): ChainReport {
  const selected = allBlocks.filter((b) => selectedIds.includes(b.id));
  const violations: ChainViolation[] = [];

  if (selected.length === 0) {
    violations.push("empty");
  } else {
    if (selected.some((b) => b.kind === "piege")) violations.push("trap-included");
    if (selected.length > maxBlocks) violations.push("too-many");
    const kgiCount = selected.filter((b) => b.kind === "kgi").length;
    if (kgiCount === 0) violations.push("no-kgi");
    if (kgiCount > 1) violations.push("multiple-kgi");
    if (!selected.some((b) => b.kind === "kpi")) violations.push("missing-kpi");
    if (!selected.some((b) => b.kind === "kbi")) violations.push("missing-kbi");
    if (!selected.some((b) => b.timing === "leading")) violations.push("missing-leading");
    if (!selected.some((b) => b.timing === "lagging")) violations.push("missing-lagging");
  }

  const outcome = violations.length === 0 ? "success" : "miss";
  return {
    outcome,
    violations,
    message: outcome === "success" ? feedbacks.success : feedbacks.violations[violations[0]!],
  };
}
