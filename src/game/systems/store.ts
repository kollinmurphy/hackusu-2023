import { createTowerId, Tower, TowerType } from "../types/Tower";
import { EventSystem } from "./events";
import { TowerPlacedEvent } from "./events/types/TowerPlaced";
import { TowerSelectedEvent } from "./events/types/TowerSelected";
import { TowerSoldEvent } from "./events/types/TowerSold";
import { TowerUpgradedEvent } from "./events/types/TowerUpgraded";
import { KeyboardSystem } from "./keyboard";
import { MoneySystem } from "./money";
import { BoundingCircle, MouseSystem } from "./mouse";
import { PathSystem } from "./paths";
import {
  getSellButtonCoordinates,
  getStoreStartX,
  getTowerIconDetails,
  getUpgradeButtonCoordinates,
} from "./render/store";
import { TowerSystem } from "./towers";
import { getTowerCost } from "./towers/cost";
import { getTowerRange } from "./towers/range";
import { getTowerSize } from "./towers/size";
import { towerUpgrades } from "./towers/upgrades";

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
    hoverTower: TowerType | null;
    position: { x: number; y: number };
    upgradeHover: number;
  } = {
    placingTower: null,
    selectedTower: null,
    hoverTower: null,
    position: { x: 0, y: 0 },
    upgradeHover: -1,
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

  mouseSystem.moveSubscribe({
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
      state.selectedTower = null;
    },
  });

  const handleTowerClicked = (tower: TowerType) => {
    if (state.placingTower?.type === tower) {
      state.placingTower = null;
      state.selectedTower = null;
      return;
    }
    const cost = getTowerCost(tower);
    if (moneySystem.getMoney() >= cost) {
      state.selectedTower = null;
      state.placingTower = {
        type: tower,
        position: { x: 0, y: 0 },
        cooldown: 0,
        id: createTowerId(),
        range: getTowerRange(tower),
        rotation: 0,
        animation: 0,
        timeSinceFire: 0,
        cost: 0,
        upgrades: [],
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

  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.dartMonkey),
    type: "hover",
    in: () => (state.hoverTower = "dartMonkey"),
    out: () => (state.hoverTower = null),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.tackTower),
    type: "click",
    callback: () => handleTowerClicked("tack"),
  });

  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.tackTower),
    type: "hover",
    in: () => (state.hoverTower = "tack"),
    out: () => (state.hoverTower = null),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.iceTower),
    type: "click",
    callback: () => handleTowerClicked("ice"),
  });

  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.iceTower),
    type: "hover",
    in: () => (state.hoverTower = "ice"),
    out: () => (state.hoverTower = null),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.bombTower),
    type: "click",
    callback: () => handleTowerClicked("bomb"),
  });

  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.bombTower),
    type: "hover",
    in: () => (state.hoverTower = "bomb"),
    out: () => (state.hoverTower = null),
  });

  mouseSystem.subscribe({
    box: createBoundingCircle(boxes.superMonkey),
    type: "click",
    callback: () => handleTowerClicked("superMonkey"),
  });

  mouseSystem.hoverSubscribe({
    box: createBoundingCircle(boxes.superMonkey),
    type: "hover",
    in: () => (state.hoverTower = "superMonkey"),
    out: () => (state.hoverTower = null),
  });

  const upgrade0 = getUpgradeButtonCoordinates(0);
  const upgrade1 = getUpgradeButtonCoordinates(1);

  mouseSystem.hoverSubscribe({
    box: upgrade0,
    type: "hover",
    in: () => {
      state.upgradeHover = 0;
    },
    out: () => {
      state.upgradeHover = -1;
    },
  });

  mouseSystem.subscribe({
    box: upgrade0,
    type: "click",
    callback: () => {
      if (
        !state.selectedTower ||
        moneySystem.getMoney() <
          towerUpgrades[state.selectedTower.type][0].cost ||
        state.selectedTower.upgrades
          .map((u) => u.key)
          .includes(towerUpgrades[state.selectedTower.type][0].key)
      )
        return;
      eventSystem.publish<TowerUpgradedEvent>({
        type: "TowerUpgraded",
        payload: {
          tower: state.selectedTower,
          upgrade: towerUpgrades[state.selectedTower.type][0],
        },
      });
    },
  });

  mouseSystem.hoverSubscribe({
    box: upgrade1,
    type: "hover",
    in: () => {
      state.upgradeHover = 1;
    },
    out: () => {
      state.upgradeHover = -1;
    },
  });

  mouseSystem.subscribe({
    box: upgrade1,
    type: "click",
    callback: () => {
      if (
        !state.selectedTower ||
        towerUpgrades[state.selectedTower.type].length < 2 ||
        moneySystem.getMoney() <
          towerUpgrades[state.selectedTower.type][1].cost ||
        state.selectedTower.upgrades
          .map((u) => u.key)
          .includes(towerUpgrades[state.selectedTower.type][1].key)
      )
        return;
      eventSystem.publish<TowerUpgradedEvent>({
        type: "TowerUpgraded",
        payload: {
          tower: state.selectedTower,
          upgrade: towerUpgrades[state.selectedTower.type][1],
        },
      });
    },
  });

  const button = getSellButtonCoordinates();
  mouseSystem.subscribe({
    box: {
      type: "box",
      x: button.x,
      y: button.y,
      width: button.width,
      height: button.height,
    },
    type: "click",
    callback: () => {
      if (!state.selectedTower) return;
      eventSystem.publish<TowerSoldEvent>({
        type: "TowerSold",
        payload: {
          tower: state.selectedTower,
        },
      });
      state.selectedTower = null;
    },
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
    isHovering: (index: number) => state.upgradeHover === index,
    getHoverTower: () => state.hoverTower,
  };
};

export type StoreSystem = ReturnType<typeof createStoreSystem>;
