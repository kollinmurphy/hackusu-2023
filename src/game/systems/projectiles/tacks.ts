import { createProjectileId, Projectile } from "../../types/Projectile";
import { Tower } from "../../types/Tower";

export const createTacks = ({ tower }: { tower: Tower }): Projectile[] => {
  const speed = 0.5;
  // const speed = 0.1;
  const projectiles: Projectile[] = [];

  for (let i = 0; i < 8; i++) {
    const direction = {
      x: Math.cos((i * Math.PI) / 4),
      y: Math.sin((i * Math.PI) / 4),
    };
    projectiles.push({
      id: createProjectileId(),
      position: {
        x: tower.position.x,
        y: tower.position.y,
      },
      origin: {
        x: tower.position.x,
        y: tower.position.y,
      },
      direction,
      speed,
      damage: 1,
      range: 100,
      elapsed: 0,
      type: tower.type,
    });
  }

  return projectiles;
};
