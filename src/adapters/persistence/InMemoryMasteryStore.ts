/**
 * Adaptateur driven : suivi de progression en mémoire (V1, D7).
 */

import type { MasteryStore, SuccessfulPass } from "@domain/index";

export function createInMemoryMasteryStore(): MasteryStore {
  const passes: SuccessfulPass[] = [];
  return {
    readAllPasses: () => [...passes],
    appendPass: (pass) => {
      passes.push(pass);
    },
  };
}
