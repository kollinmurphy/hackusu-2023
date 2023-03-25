import { createProjectileId, Projectile } from "../../types/Projectile";
import { Tower } from "../../types/Tower";

export const createIceRing = ({ tower }: { tower: Tower }): Projectile[] => {
  console.log(tower.freezeTime);
  return [
    {
      id: createProjectileId(),
      position: tower.position,
      origin: tower.position,
      direction: { x: 0, y: 0 },
      speed: 0,
      damage: 0,
      range: tower.range,
      elapsed: 0,
      type: "ice",
      freezeTime: tower.freezeTime,
      pierce: tower.pierce || 0,
      pierced: 0,
    },
  ];
};

export const ICE_SPREAD_RATE = 0.6;
