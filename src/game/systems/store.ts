import { createTowerId, Tower, TowerType } from "../types/Tower";
import { KeyboardSystem } from "./keyboardSystem";
import { MoneySystem } from "./money";
import { MouseSystem } from "./mouseSystem";
import { getTowerIconDetails } from "./render/store";
import { getTowerCost } from "./towers/cost";

export const createStoreSystem = ({
  moneySystem,
  mouseSystem,
  keyboardSystem,
}: {
  moneySystem: MoneySystem;
  mouseSystem: MouseSystem;
  keyboardSystem: KeyboardSystem;
}) => {
  const state: {
    placingTower: Tower | null;
    position: { x: number; y: number };
  } = {
    placingTower: null,
    position: { x: 0, y: 0 },
  };

  const buttonDetails = getTowerIconDetails();

  const boxes = {
    dartMonkey: {
      x: buttonDetails.x,
      y: buttonDetails.y,
      width: buttonDetails.size,
      height: buttonDetails.size,
    },
    tackTower: {
      x: buttonDetails.x + buttonDetails.each,
      y: buttonDetails.y,
      width: buttonDetails.size,
      height: buttonDetails.size,
    },
    iceTower: {
      x: buttonDetails.x + buttonDetails.each * 2,
      y: buttonDetails.y,
      width: buttonDetails.size,
      height: buttonDetails.size,
    },
    bombTower: {
      x: buttonDetails.x + buttonDetails.each * 3,
      y: buttonDetails.y,
      width: buttonDetails.size,
      height: buttonDetails.size,
    },
    superMonkey: {
      x: buttonDetails.x + buttonDetails.each * 4,
      y: buttonDetails.y,
      width: buttonDetails.size,
      height: buttonDetails.size,
    },
  };

  mouseSystem.subscribe({
    type: "move",
    callback: (x, y) => {
      state.position = { x, y };
    },
  });

  keyboardSystem.subscribe({
    key: "exit",
    callback: () => {
      console.log("ESCAPE")
      state.placingTower = null;
    },
    type: "keydown",
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
        range: 0,
        rotation: 0,
      };
    }
  };

  mouseSystem.subscribe({
    box: boxes.dartMonkey,
    type: "click",
    callback: () => handleTowerClicked("dartMonkey"),
  });

  return {
    getPlacingTowerDetails: (): Tower | null => {
      if (!state.placingTower) return null;
      return {
        ...state.placingTower,
        position: state.position,
      };
    },
  };
};

export type StoreSystem = ReturnType<typeof createStoreSystem>;
