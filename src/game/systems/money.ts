import { EventSystem } from "./events";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { StageClearedEvent } from "./events/types/StageCleared";
import { TowerPlacedEvent } from "./events/types/TowerPlaced";
import { TowerSoldEvent } from "./events/types/TowerSold";
import { TowerUpgradedEvent } from "./events/types/TowerUpgraded";
import { getSellPrice } from "./towers/sellPrice";

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

  eventSystem.subscribe<TowerSoldEvent>({
    type: "TowerSold",
    callback: (event) => {
      money += getSellPrice(event.payload.tower.cost);
    },
  });

  eventSystem.subscribe<TowerUpgradedEvent>({
    type: "TowerUpgraded",
    callback: (event) => {
      money -= event.payload.upgrade.cost;
    },
  });

  return {
    getMoney: () => money,
  };
};

export type MoneySystem = ReturnType<typeof createMoneySystem>;
