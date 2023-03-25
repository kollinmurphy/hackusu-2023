import { BloonSystem } from "./bloons";
import { EventSystem } from "./events";
import { BloonEscapedEvent } from "./events/types/BloonEscaped";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { StageClearedEvent } from "./events/types/StageCleared";
import { StageStartedEvent } from "./events/types/StageStarted";
import { MouseManager } from "./mouseInput";

export const createRoundSystem = ({
  eventSystem,
  mouseSystem,
  bloonSystem,
}: {
  eventSystem: EventSystem;
  mouseSystem: MouseManager;
  bloonSystem: BloonSystem;
}) => {
  const state = {
    round: 1,
    active: false,
  };

  const handleCheckStageCleared = () => {
    if (bloonSystem.getBloons().length === 0) {
      state.round += 1;
      state.active = false;
      eventSystem.publish<StageClearedEvent>({
        type: "StageCleared",
        payload: {
          stage: state.round,
        },
      });
    }
  };

  eventSystem.subscribe<BloonPoppedEvent>({
    type: "BloonPopped",
    callback: handleCheckStageCleared,
  });

  eventSystem.subscribe<BloonEscapedEvent>({
    type: "BloonEscaped",
    callback: handleCheckStageCleared,
  });

  mouseSystem.subscribe({
    type: "click",
    callback: () => {
      state.active = true;
      eventSystem.publish<StageStartedEvent>({
        type: "StageStarted",
        payload: {
          stage: state.round,
        },
      });
    },
    box: {
      x: 800,
      y: 880,
      width: 224,
      height: 100,
    },
  });

  return {
    isActive: () => state.active,
    getRound: () => state.round,
  };
};

export type RoundSystem = ReturnType<typeof createRoundSystem>;
