import type { Clock } from "@domain/index";

export const systemClock: Clock = {
  now: () => Date.now(),
};
