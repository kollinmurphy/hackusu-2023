import { createTowerId, Tower } from "../../types/Tower";
import { EventSystem } from "../events";
import { TowerPlacedEvent } from "../events/types/TowerPlaced";
import { TowerSelectedEvent } from "../events/types/TowerSelected";
import { getTowerCooldown } from "./cooldown";
import { getTowerRange } from "./range";
import { getTowerSize } from "./size";

export const createTowerSystem = ({
  eventSystem,
}: {
  eventSystem: EventSystem;
}) => {
  const state: {
    towers: Tower[];
    selectedTower: Tower | null;
  } = {
    towers: [],
    selectedTower: null,
  };

  eventSystem.subscribe<TowerPlacedEvent>({
    type: "TowerPlaced",
    callback: (event) => {
      state.towers.push({
        id: createTowerId(),
        type: event.payload.type,
        position: {
          x: event.payload.x,
          y: event.payload.y,
        },
        cooldown: getTowerCooldown(event.payload.type),
        range: getTowerRange(event.payload.type),
        rotation: 0,
        animation: 0,
      });
    },
  });

  eventSystem.subscribe<TowerSelectedEvent>({
    type: "TowerSelected",
    callback: (event) => {
      state.selectedTower = event.payload.tower;
    },
  });

  return {
    getTowers: () => state.towers,
    update: (deltaTime: number) => {
      for (const tower of state.towers) {
        tower.animation += deltaTime * 2.5;
      }
    },
    handleSelectTower: ({ x, y }: { x: number; y: number }) => {
      const tower = state.towers.find((tower) => {
        const size = getTowerSize(tower.type);
        return (
          x > tower.position.x - size.width / 2 &&
          x < tower.position.x + size.width / 2 &&
          y > tower.position.y - size.height / 2 &&
          y < tower.position.y + size.height / 2
        );
      });
      if (tower?.id === state.selectedTower?.id)
        return eventSystem.publish<TowerSelectedEvent>({
          type: "TowerSelected",
          payload: { tower: null },
        });
      eventSystem.publish<TowerSelectedEvent>({
        type: "TowerSelected",
        payload: { tower: tower || null },
      });
    },
    canPlaceTower: ({
      x,
      y,
      width,
      height,
    }: {
      x: number;
      y: number;
      width: number;
      height: number;
    }) => {
      const factor = 0.75;
      return !state.towers.some((tower) => {
        return (
          x + width * factor > tower.position.x &&
          x < tower.position.x + width * factor &&
          y + height * factor > tower.position.y &&
          y < tower.position.y + height * factor
        );
      });
    },
  };
};

export type TowerSystem = ReturnType<typeof createTowerSystem>;
