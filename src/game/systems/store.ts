import { TowerType } from "../types/Tower";
import { MoneySystem } from "./money";
import { MouseManager } from "./mouseInput";

export const createStoreSystem = ({
  // moneySystem,
  mouseSystem,
}: {
  moneySystem: MoneySystem;
  mouseSystem: MouseManager;
}) => {
  const state: {
    selectedTower: TowerType | null;
  } = {
    selectedTower: null,
  };

  mouseSystem.subscribe({
    box: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
    type: "click",
    callback: () => {
      console.log("clicked");
    },
  });

  return {
    update: () => {},
    render: () => {},
    selectTower: (tower: TowerType) => {
      state.selectedTower = tower;
    },
  };
};

export type StoreSystem = ReturnType<typeof createStoreSystem>;
