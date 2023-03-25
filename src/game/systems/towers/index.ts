import { createTowerId, Tower } from "../../types/Tower";
import { EventSystem } from "../events";
import { TowerPlacedEvent } from "../events/types/TowerPlaced";
import { getTowerCooldown } from "./cooldown";
import { getTowerRange } from "./range";

export const createTowerSystem = ({
  eventSystem,
}: {
  eventSystem: EventSystem;
}) => {
  const state: {
    towers: Tower[];
  } = {
    towers: [],
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

  return {
    getTowers: () => state.towers,
    update: (deltaTime: number) => {
      for (const tower of state.towers) {
        tower.animation += deltaTime * 2.5;
      }
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
