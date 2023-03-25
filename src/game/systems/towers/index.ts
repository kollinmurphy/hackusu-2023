import { createTowerId, Tower } from "../../types/Tower";
import { BloonSystem } from "../bloons";
import { EventSystem } from "../events";
import { TowerFired } from "../events/types/TowerFired";
import { TowerPlacedEvent } from "../events/types/TowerPlaced";
import { TowerSelectedEvent } from "../events/types/TowerSelected";
import { TowerSoldEvent } from "../events/types/TowerSold";
import { TowerUpgradedEvent } from "../events/types/TowerUpgraded";
import { getTowerCooldown } from "./cooldown";
import { getTowerRange, RANGE_MULTIPLIER } from "./range";
import { getTowerSize } from "./size";

export const createTowerSystem = ({
  eventSystem,
  bloonSystem,
}: {
  eventSystem: EventSystem;
  bloonSystem: BloonSystem;
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
      const cooldown = getTowerCooldown(event.payload.type);
      const tower: Tower = {
        id: createTowerId(),
        type: event.payload.type,
        position: {
          x: event.payload.x,
          y: event.payload.y,
        },
        cooldown,
        range: getTowerRange(event.payload.type),
        rotation: 0,
        animation: 0,
        timeSinceFire: cooldown,
        freezeTime: event.payload.type === "ice" ? 2000 : undefined,
        explodeRadius: event.payload.type === "bomb" ? 100 : undefined,
        cost: event.payload.cost,
        upgrades: [],
      };
      state.towers.push(tower);
    },
  });

  eventSystem.subscribe<TowerSelectedEvent>({
    type: "TowerSelected",
    callback: (event) => {
      state.selectedTower = event.payload.tower;
    },
  });

  eventSystem.subscribe<TowerSoldEvent>({
    type: "TowerSold",
    callback: (event) => {
      state.towers = state.towers.filter(
        (tower) => tower.id !== event.payload.tower.id
      );
    },
  });

  eventSystem.subscribe<TowerUpgradedEvent>({
    type: "TowerUpgraded",
    callback: (event) => {
      const tower = state.towers.find(
        (tower) => tower.id === event.payload.tower.id
      );
      if (!tower) return;
      tower.upgrades.push(event.payload.upgrade);
      const upgrade = event.payload.upgrade;
      if (upgrade.range) tower.range += upgrade.range * RANGE_MULTIPLIER;
      if (upgrade.freezeTime)
        tower.freezeTime = (tower.freezeTime || 0) + upgrade.freezeTime;
      if (upgrade.explodeRadius)
        tower.explodeRadius =
          (tower.explodeRadius || 0) + upgrade.explodeRadius;
      if (upgrade.pierce) tower.pierce = (tower.pierce || 0) + upgrade.pierce;
      if (upgrade.cooldown) tower.cooldown -= upgrade.cooldown;
    },
  });

  return {
    getTowers: () => state.towers,
    update: (deltaTime: number) => {
      for (const tower of state.towers) {
        tower.animation += deltaTime * 2.5;
        tower.timeSinceFire += deltaTime;
        if (tower.timeSinceFire >= tower.cooldown) {
          const target = bloonSystem.getLastBloonInRadius({
            x: tower.position.x,
            y: tower.position.y,
            radius: tower.range,
          });
          if (target) {
            console.log("Firing tower", tower.id, tower.cooldown);
            tower.timeSinceFire = 0; // need to reset to 0 to prevent building up of shots
            tower.rotation = Math.atan2(
              target.y - tower.position.y,
              target.x - tower.position.x
            );
            eventSystem.publish<TowerFired>({
              type: "TowerFired",
              payload: {
                tower,
                bloon: target,
              },
            });
          }
        }
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
