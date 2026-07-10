/**
 * Racine de composition : c'est ici, et seulement ici, qu'on assemble
 * le moteur avec ses adaptateurs concrets.
 */

import { createProcessCoachEngine, type ProcessCoachEngine } from "@domain/index";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { systemClock } from "@adapters/persistence/SystemClock";
import { browserRandomSource } from "@adapters/persistence/BrowserRandomSource";

export function composeEngine(): ProcessCoachEngine {
  return createProcessCoachEngine({
    content: createContentRepository(),
    masteryStore: createInMemoryMasteryStore(),
    clock: systemClock,
    random: browserRandomSource,
  });
}
