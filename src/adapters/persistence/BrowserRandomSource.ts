import type { RandomSource } from "@domain/index";

export const browserRandomSource: RandomSource = {
  nextInt: (max) => Math.floor(Math.random() * max),
};
