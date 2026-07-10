/**
 * Test canari : le domaine reste pur.
 * Aucun fichier de src/domain ne doit importer React, le contenu,
 * les adaptateurs, l'app ni une librairie externe (zod compris).
 */

import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const FORBIDDEN = ["react", "zod", "@content", "@adapters", "@app", "zustand"];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

describe("isolation du domaine", () => {
  it("src/domain n'importe rien du monde extérieur", () => {
    const files = listFiles(join(__dirname, "../../src/domain")).filter((f) =>
      f.endsWith(".ts"),
    );
    expect(files.length).toBeGreaterThan(5);

    for (const file of files) {
      const source = readFileSync(file, "utf-8");
      const imports = [...source.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]!);
      for (const imp of imports) {
        for (const forbidden of FORBIDDEN) {
          expect(
            imp.startsWith(forbidden),
            `${file} importe ${imp}`,
          ).toBe(false);
        }
      }
    }
  });
});
