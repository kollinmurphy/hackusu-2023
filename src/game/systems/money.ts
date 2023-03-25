import { EventSystem } from "./events";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { StageClearedEvent } from "./events/types/StageCleared";
import { TowerPlacedEvent } from "./events/types/TowerPlaced";

export const createMoneySystem = ({
  eventSystem,
}: {
  eventSystem: EventSystem;
}) => {
  // let money = 1000;
  let money = 1000000;

  eventSystem.subscribe<BloonPoppedEvent>({
    type: "BloonPopped",
    callback: () => {
      money += 1;
    },
  });

  eventSystem.subscribe<StageClearedEvent>({
    type: "StageCleared",
    callback: (event) => {
      money += Math.max(0, 100 - (event.payload.stage - 1));
    },
  });

  eventSystem.subscribe<TowerPlacedEvent>({
    type: "TowerPlaced",
    callback: (event) => {
      money -= event.payload.cost;
    },
  });

  return {
    getMoney: () => money,
  };
};

export type MoneySystem = ReturnType<typeof createMoneySystem>;
