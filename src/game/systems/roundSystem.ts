import { BloonSystem } from "./bloons";
import rounds from "./bloons/rounds.json";
import { EventSystem } from "./events";
import { BloonEscapedEvent } from "./events/types/BloonEscaped";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { StageClearedEvent } from "./events/types/StageCleared";
import { StageStartedEvent } from "./events/types/StageStarted";
import { MouseSystem } from "./mouseSystem";

const ANIMATION_LENGTH = 1000;

export const createRoundSystem = ({
  eventSystem,
  mouseSystem,
  bloonSystem,
}: {
  eventSystem: EventSystem;
  mouseSystem: MouseSystem;
  bloonSystem: BloonSystem;
}) => {
  const state = {
    round: 1,
    active: false,
    buttonAnimation: 0,
  };

  const handleCheckStageCleared = () => {
    if (bloonSystem.getBloons().length === 0) {
      eventSystem.publish<StageClearedEvent>({
        type: "StageCleared",
        payload: {
          stage: state.round,
          message: rounds.rounds[state.round].message,
        },
      });
      state.round += 1;
      state.active = false;
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
    update: (deltaTime: number) => {
      if (state.active) {
        state.buttonAnimation = 0;
        return;
      }
      state.buttonAnimation += deltaTime;
      if (state.buttonAnimation > ANIMATION_LENGTH) {
        state.buttonAnimation -= ANIMATION_LENGTH;
      }
    },
    getAnimation: () => {
      const half = ANIMATION_LENGTH / 2;
      const progress = state.buttonAnimation / half;
      if (progress < 1) return progress;
      return 2 - progress;
    },
  };
};

export type RoundSystem = ReturnType<typeof createRoundSystem>;
