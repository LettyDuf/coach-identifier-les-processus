/**
 * Adaptateur driving : navigation entre le bureau d'études (les
 * fondations), le hall et les ateliers. Toute la pédagogie vit dans
 * le domaine et le contenu, jamais ici.
 */

import { useMemo, useState } from "react";
import type { ScenarioId, WorkGroupId } from "@domain/index";
import { FONDATIONS, type FondationId } from "@content/fondations";
import { composeEngine } from "./composition";
import { Hall } from "@adapters/ui/hall/Hall";
import { Atelier } from "@adapters/ui/atelier/Atelier";
import { SpottingBoard } from "@adapters/ui/spotting/SpottingBoard";
import { ClassificationBoard } from "@adapters/ui/classification/ClassificationBoard";
import { MeasureBoard } from "@adapters/ui/measure/MeasureBoard";
import { FondationView } from "@adapters/ui/fondations/FondationView";
import "./global.css";

type ExerciceView =
  | { kind: "reperer"; group: WorkGroupId; scenario: ScenarioId }
  | { kind: "classer"; group: WorkGroupId; scenario: ScenarioId }
  | { kind: "mesurer"; group: WorkGroupId; scenario: ScenarioId };

type View =
  | { kind: "hall" }
  | { kind: "fondation"; id: FondationId; returnTo?: ExerciceView | undefined }
  | { kind: "atelier"; group: WorkGroupId }
  | ExerciceView;

export function App() {
  const engine = useMemo(() => composeEngine(), []);
  const [view, setView] = useState<View>({ kind: "hall" });
  const [visited, setVisited] = useState<ReadonlySet<FondationId>>(new Set());

  function openFondation(id: FondationId, returnTo?: ExerciceView) {
    setVisited((prev) => new Set(prev).add(id));
    setView({ kind: "fondation", id, returnTo });
  }

  const firstOpenGroup = engine.listGroups().find((g) => g.open);

  if (view.kind === "hall") {
    return (
      <Hall
        groups={engine.listGroups()}
        visitedFondations={visited}
        onEnter={(group) => setView({ kind: "atelier", group })}
        onOpenFondation={openFondation}
      />
    );
  }

  if (view.kind === "fondation") {
    const { returnTo } = view;
    return (
      <FondationView
        id={view.id}
        onBack={() => setView(returnTo ?? { kind: "hall" })}
        onToAtelier={() => {
          if (returnTo) {
            setView({ kind: "atelier", group: returnTo.group });
          } else if (firstOpenGroup) {
            setView({ kind: "atelier", group: firstOpenGroup.id });
          } else {
            setView({ kind: "hall" });
          }
        }}
      />
    );
  }

  const group = engine.listGroups().find((g) => g.id === view.group);
  if (!group) {
    return (
      <Hall
        groups={engine.listGroups()}
        visitedFondations={visited}
        onEnter={(g) => setView({ kind: "atelier", group: g })}
        onOpenFondation={openFondation}
      />
    );
  }

  if (view.kind === "atelier") {
    const play = (kind: "reperer" | "classer" | "mesurer") => () => {
      const scenario = engine.pickScenario(group.id);
      if (scenario) setView({ kind, group: group.id, scenario: scenario.id });
    };
    return (
      <Atelier
        group={group}
        engine={engine}
        visitedFondations={visited}
        onBack={() => setView({ kind: "hall" })}
        onOpenFondation={openFondation}
        onPlaySpotting={play("reperer")}
        onPlayClassify={play("classer")}
        onPlayMeasure={play("mesurer")}
      />
    );
  }

  const scenario = engine.getScenario(view.scenario);
  if (!scenario) {
    return (
      <Atelier
        group={group}
        engine={engine}
        visitedFondations={visited}
        onBack={() => setView({ kind: "hall" })}
        onOpenFondation={openFondation}
        onPlaySpotting={() => undefined}
        onPlayClassify={() => undefined}
        onPlayMeasure={() => undefined}
      />
    );
  }

  const backToAtelier = () => setView({ kind: "atelier", group: group.id });

  const exerciceView = view as ExerciceView;
  const fondationLiee = FONDATIONS.find((f) => f.gesteLie === exerciceView.kind);
  const deepLinkFondation = fondationLiee
    ? { titre: fondationLiee.title, onOpen: () => openFondation(fondationLiee.id, exerciceView) }
    : undefined;

  return view.kind === "reperer" ? (
    <SpottingBoard
      scenario={scenario}
      engine={engine}
      onBack={backToAtelier}
      deepLinkFondation={deepLinkFondation}
    />
  ) : view.kind === "classer" ? (
    <ClassificationBoard
      scenario={scenario}
      engine={engine}
      onBack={backToAtelier}
      deepLinkFondation={deepLinkFondation}
    />
  ) : (
    <MeasureBoard
      scenario={scenario}
      engine={engine}
      onBack={backToAtelier}
      deepLinkFondation={deepLinkFondation}
    />
  );
}
