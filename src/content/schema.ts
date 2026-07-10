/**
 * Schéma de validation du contenu pédagogique (échec bruyant au
 * chargement, pattern des coachs frères).
 *
 * Invariants encodés :
 * - identifiants uniques et références résolues ;
 * - au moins 3 vrais processus et 2 leurres par scénario ;
 * - tout vrai processus porte sa carte d'identité (Entrée / Sortie /
 *   Client), tout leurre porte sa nature ;
 * - textes non vides, sans TODO ni tiret long (règle de Lætitia :
 *   aucun tiret long dans le contenu).
 */

import { z } from "zod";
import type { ProcessScenario, WorkGroup } from "@domain/valueObjects/Scenario";

const sansTiretLong = (s: string) => !s.includes("—");

const texte = z
  .string()
  .trim()
  .min(20, "Texte pédagogique trop court")
  .refine((s) => !s.includes("TODO") && !s.includes("XXX"), {
    message: "Texte non rédigé (TODO/XXX)",
  })
  .refine(sansTiretLong, { message: "Tiret long interdit dans le contenu" });

/** Champ court (noms, natures, champs de carte d'identité). */
const champCourt = z
  .string()
  .trim()
  .min(3, "Champ trop court")
  .refine(sansTiretLong, { message: "Tiret long interdit dans le contenu" });

const sceneSchema = z.object({
  icon: z.string().min(1),
  text: texte,
});

const identitySchema = z.object({
  entree: champCourt,
  sortie: champCourt,
  client: champCourt,
});

const processTypeSchema = z.enum(["pilotage", "operationnel", "support"]);
const processLevelSchema = z.enum(["equipe", "programme", "direction"]);

const classificationSchema = z
  .object({
    type: processTypeSchema,
    level: processLevelSchema,
    typeRationale: texte,
    levelRationale: texte,
    typeTraps: z.record(processTypeSchema, texte).optional(),
    levelTraps: z.record(processLevelSchema, texte).optional(),
  })
  .superRefine((c, ctx) => {
    if (c.typeTraps && c.type in c.typeTraps) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "typeTraps contient la bonne réponse (ce n'est pas un piège)",
      });
    }
    if (c.levelTraps && c.level in c.levelTraps) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "levelTraps contient la bonne réponse (ce n'est pas un piège)",
      });
    }
  });

const candidateSchema = z
  .object({
    id: z.string().min(1),
    shortLabel: champCourt,
    icon: z.string().min(1),
    isProcess: z.boolean(),
    explanation: texte,
    identity: identitySchema.optional(),
    classification: classificationSchema.optional(),
    nature: champCourt.optional(),
  })
  .superRefine((c, ctx) => {
    if (c.isProcess && !c.identity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Processus ${c.id} sans carte d'identité (entrée/sortie/client)`,
      });
    }
    if (c.isProcess && !c.classification) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Processus ${c.id} sans corrigé de classement (type/niveau)`,
      });
    }
    if (!c.isProcess && !c.nature) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Leurre ${c.id} sans nature déclarée`,
      });
    }
  });

const violationKeys = [
  "empty",
  "trap-included",
  "too-many",
  "no-kgi",
  "multiple-kgi",
  "missing-kpi",
  "missing-kbi",
  "missing-leading",
  "missing-lagging",
] as const;

const measureBlockSchema = z
  .object({
    id: z.string().min(1),
    label: champCourt,
    kind: z.enum(["kbi", "kpi", "kgi", "piege"]),
    timing: z.enum(["leading", "lagging"]).optional(),
    isFlowMetric: z.boolean().optional(),
    explanation: texte,
  })
  .superRefine((b, ctx) => {
    if (b.kind === "piege" && b.timing) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Piège ${b.id} avec timing` });
    }
    if (b.kind !== "piege" && !b.timing) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Bloc ${b.id} sans timing` });
    }
  });

const quizItemSchema = z
  .object({
    id: z.string().min(1),
    palier: z.union([z.literal(1), z.literal(2)]),
    question: texte,
    options: z
      .array(
        z.object({ id: z.string().min(1), label: champCourt, correct: z.boolean(), feedback: texte }),
      )
      .min(2),
  })
  .superRefine((q, ctx) => {
    if (q.options.filter((o) => o.correct).length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Item ${q.id} : il faut exactement une bonne réponse`,
      });
    }
  });

const measureSchema = z
  .object({
    processLabel: champCourt,
    chainExample: texte,
    maxChainBlocks: z.number().int().min(3).max(6),
    blocks: z.array(measureBlockSchema).min(6),
    chainFeedbacks: z.object({
      success: texte,
      violations: z.object(
        Object.fromEntries(violationKeys.map((k) => [k, texte])) as Record<
          (typeof violationKeys)[number],
          typeof texte
        >,
      ),
    }),
    validExample: z.array(z.string()).min(3),
    quiz: z.array(quizItemSchema).min(2),
  })
  .superRefine((m, ctx) => {
    const ids = new Set(m.blocks.map((b) => b.id));
    if (ids.size !== m.blocks.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ids de blocs non uniques" });
    }
    for (const id of m.validExample) {
      if (!ids.has(id)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `validExample : bloc inconnu ${id}` });
      }
    }
    if (m.validExample.length > m.maxChainBlocks) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "validExample dépasse maxChainBlocks",
      });
    }
    const kinds = m.blocks.map((b) => b.kind);
    if (!kinds.includes("kgi") || !kinds.includes("kpi") || !kinds.includes("kbi")) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Banque de blocs incomplète (KBI/KPI/KGI)" });
    }
    if (kinds.filter((k) => k === "piege").length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Moins de 2 blocs pièges" });
    }
    if (!m.quiz.some((q) => q.palier === 1) || !m.quiz.some((q) => q.palier === 2)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Chaque palier de quiz doit avoir au moins un item" });
    }
  });

const scenarioSchema = z
  .object({
    id: z.string().min(1),
    group: z.string().min(1),
    title: z.string().trim().min(3),
    narrative: z.array(sceneSchema).min(3),
    candidates: z.array(candidateSchema).min(5),
    spottingFeedbacks: z.object({
      success: texte,
      missed: texte,
      falsePositive: texte,
      mixed: texte,
    }),
    classificationFeedbacks: z.object({
      success: texte,
      miss: texte,
    }),
    measure: measureSchema,
    signature: z.object({
      trapPattern: z.string().min(1),
      theme: z.string().min(1),
    }),
  })
  .superRefine((s, ctx) => {
    const ids = s.candidates.map((c) => c.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ids de candidats non uniques" });
    }
    const processes = s.candidates.filter((c) => c.isProcess).length;
    const lures = s.candidates.length - processes;
    if (processes < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Moins de 3 vrais processus" });
    }
    if (lures < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Moins de 2 leurres" });
    }
  });

const groupSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(3),
  tagline: z.string().trim().min(3),
  open: z.boolean(),
});

export function validateContent(
  groups: ReadonlyArray<WorkGroup>,
  scenarios: ReadonlyArray<ProcessScenario>,
): void {
  z.array(groupSchema).min(1).parse(groups);
  z.array(scenarioSchema).min(1).parse(scenarios);

  const groupIds = new Set(groups.map((g) => g.id));
  const scenarioIds = scenarios.map((s) => s.id);
  if (new Set(scenarioIds).size !== scenarioIds.length) {
    throw new Error("Ids de scénarios non uniques");
  }
  for (const s of scenarios) {
    if (!groupIds.has(s.group)) {
      throw new Error(`Scénario ${s.id} : groupe inconnu ${s.group}`);
    }
  }
  for (const g of groups.filter((g) => g.open)) {
    if (!scenarios.some((s) => s.group === g.id)) {
      throw new Error(`Groupe ouvert sans scénario : ${g.id}`);
    }
  }
}
