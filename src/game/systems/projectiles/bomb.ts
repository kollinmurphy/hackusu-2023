import { Bloon } from "../../types/bloon";
import { createProjectileId, Projectile } from "../../types/Projectile";
import { Tower } from "../../types/Tower";
import { PathSystem } from "../paths";
import { getHitPosition } from "./hitPosition";

export const createBomb = ({
  tower,
  bloon,
  pathSystem,
}: {
  tower: Tower;
  bloon: Bloon;
  pathSystem: PathSystem;
}): Projectile[] => {
  const speed = 1.0;
  const estimatedHitPosition = getHitPosition({
    bloon,
    origin: tower.position,
    speed,
    level: 1,
    pathSystem,
  });
  const direction = {
    x: estimatedHitPosition.x - tower.position.x,
    y: estimatedHitPosition.y - tower.position.y,
  };
  const unitDirection = {
    x:
      direction.x /
      Math.sqrt(direction.x * direction.x + direction.y * direction.y),
    y:
      direction.y /
      Math.sqrt(direction.x * direction.x + direction.y * direction.y),
  };
  return [
    {
      id: createProjectileId(),
      position: {
        x: tower.position.x,
        y: tower.position.y,
      },
      origin: {
        x: tower.position.x,
        y: tower.position.y,
      },
      direction: unitDirection,
      speed,
      damage: 1,
      range: tower.range,
      elapsed: 0,
      type: tower.type,
      explodeRadius: tower.explodeRadius,
    },
  ];
};
