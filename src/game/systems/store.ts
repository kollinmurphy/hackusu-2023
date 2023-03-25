import { createTowerId, Tower, TowerType } from "../types/Tower";
import { EventSystem } from "./events";
import { TowerPlacedEvent } from "./events/types/TowerPlaced";
import { TowerSelectedEvent } from "./events/types/TowerSelected";
import { KeyboardSystem } from "./keyboard";
import { MoneySystem } from "./money";
import { BoundingCircle, MouseSystem } from "./mouse";
import { PathSystem } from "./paths";
import { getStoreStartX, getTowerIconDetails } from "./render/store";
import { TowerSystem } from "./towers";
import { getTowerCost } from "./towers/cost";
import { getTowerRange } from "./towers/range";
import { getTowerSize } from "./towers/size";

export const createStoreSystem = ({
  moneySystem,
  mouseSystem,
  keyboardSystem,
  eventSystem,
  canvas,
  pathSystem,
  towerSystem,
}: {
  moneySystem: MoneySystem;
  mouseSystem: MouseSystem;
  keyboardSystem: KeyboardSystem;
  eventSystem: EventSystem;
  canvas: HTMLCanvasElement;
  pathSystem: PathSystem;
  towerSystem: TowerSystem;
}) => {
  const state: {
    placingTower: Tower | null;
    selectedTower: Tower | null;
    position: { x: number; y: number };
  } = {
    placingTower: null,
    selectedTower: null,
    position: { x: 0, y: 0 },
  };

  const buttonDetails = getTowerIconDetails();

  const boxes = {
    dartMonkey: {
      x: buttonDetails.x,
      y: buttonDetails.y,
    },
    tackTower: {
      x: buttonDetails.x + buttonDetails.each,
      y: buttonDetails.y,
    },
    iceTower: {
      x: buttonDetails.x + buttonDetails.each * 2,
      y: buttonDetails.y,
    },
    bombTower: {
      x: buttonDetails.x + buttonDetails.each * 3,
      y: buttonDetails.y,
    },
    superMonkey: {
      x: buttonDetails.x + buttonDetails.each * 4,
      y: buttonDetails.y,
    },
  };

  mouseSystem.subscribe({
    type: "move",
    callback: (x, y) => {
      state.position = { x, y };
    },
  });

  eventSystem.subscribe<TowerSelectedEvent>({
    type: "TowerSelected",
    callback: (event) => {
      state.selectedTower = event.payload.tower;
    },
  });

  mouseSystem.subscribe({
    type: "click",
    box: {
      type: "box",
      x: 0,
      y: 0,
      width: getStoreStartX(),
      height: canvas.height,
    },
    callback: (x, y) => {
      if (!state.placingTower) return towerSystem.handleSelectTower({ x, y });
      const size = getTowerSize(state.placingTower?.type ?? "dartMonkey");
      if (
        !pathSystem.canPlaceTower({
          x,
          y,
          width: size.width,
          height: size.height,
          canvas,
        }) ||
        !towerSystem.canPlaceTower({
          x,
          y,
          width: size.width,
          height: size.height,
        })
      )
        return;

      const cost = getTowerCost(state.placingTower.type);
      if (moneySystem.getMoney() >= cost) {
        eventSystem.publish<TowerPlacedEvent>({
          type: "TowerPlaced",
          payload: {
            type: state.placingTower.type,
            x,
            y,
            cost,
          },
        });
      }
    },
  });

  keyboardSystem.subscribe({
    key: "exit",
    callback: () => {
      state.placingTower = null;
    },
    type: "keydown",
  });

  eventSystem.subscribe<TowerPlacedEvent>({
    type: "TowerPlaced",
    callback: () => {
      state.placingTower = null;
    },
  });

  const handleTowerClicked = (tower: TowerType) => {
    if (state.placingTower?.type === tower) {
      state.placingTower = null;
      return;
    }
    const cost = getTowerCost(tower);
    if (moneySystem.getMoney() >= cost) {
      state.placingTower = {
        type: tower,
        position: { x: 0, y: 0 },
        cooldown: 0,
        id: createTowerId(),
        range: getTowerRange(tower),
        rotation: 0,
        animation: 0,
        timeSinceFire: 0,
      };
    }
  };

  const createBoundingCircle = (box: {
    x: number;
    y: number;
  }): BoundingCircle => ({
    x: box.x + buttonDetails.size / 2,
    y: box.y + buttonDetails.size / 2,
    type: "circle",
    radius: buttonDetails.size / 2,
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.dartMonkey),
    type: "click",
    callback: () => handleTowerClicked("dartMonkey"),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.tackTower),
    type: "click",
    callback: () => handleTowerClicked("tack"),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.iceTower),
    type: "click",
    callback: () => handleTowerClicked("ice"),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.bombTower),
    type: "click",
    callback: () => handleTowerClicked("bomb"),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.superMonkey),
    type: "click",
    callback: () => handleTowerClicked("superMonkey"),
  });

  return {
    getPlacingTowerDetails: (): Tower | null => {
      if (!state.placingTower) return null;
      return {
        ...state.placingTower,
        position: state.position,
      };
    },
    getSelectedTower: (): Tower | null => state.selectedTower,
    update: (deltaTime: number) => {
      if (!state.placingTower) return;
      state.placingTower.animation += deltaTime;
    },
  };
};

export type StoreSystem = ReturnType<typeof createStoreSystem>;
