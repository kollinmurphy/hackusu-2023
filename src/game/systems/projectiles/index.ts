import { Bloon } from "../../types/bloon";
import { createProjectileId, Projectile } from "../../types/Projectile";
import { BloonSystem } from "../bloons";
import { getBloonSpeed } from "../bloons/speed";
import { EventSystem } from "../events";
import { BloonHitEvent } from "../events/types/BloonHit";
import { TowerFired } from "../events/types/TowerFired";
import { PathSystem } from "../paths";

const getTimeToHit = ({
  bloon,
  origin,
  speed,
}: {
  bloon: Pick<Bloon, "x" | "y">;
  origin: Projectile["position"];
  speed: number;
}) => {
  const distanceToBloon = Math.sqrt(
    Math.pow(bloon.x - origin.x, 2) + Math.pow(bloon.y - origin.y, 2)
  );
  const timeToHit = distanceToBloon * speed;
  return timeToHit * 1000;
};

const getPositionAfterTime = ({
  bloon,
  time,
  pathSystem,
}: {
  bloon: Bloon;
  time: number;
  pathSystem: PathSystem;
}) => {
  const estimatedHitPosition = pathSystem.computePoint(
    bloon.distance + getBloonSpeed(bloon) * time
  );
  return estimatedHitPosition;
};

const getHitPosition = ({
  bloon,
  origin,
  speed,
  level,
  pathSystem,
}: {
  bloon: Bloon;
  origin: Projectile["position"];
  speed: number;
  level: number;
  pathSystem: PathSystem;
}) => {
  let position = {
    x: origin.x,
    y: origin.y,
  };
  let time: number;
  for (let i = 0; i < level; i++) {
    time = getTimeToHit({
      bloon: position,
      origin,
      speed,
    }) * 1.5;
    position = getPositionAfterTime({
      bloon,
      time,
      pathSystem,
    });
  }
  console.log(time!);
  return position!;
};

export const createProjectileSystem = ({
  eventSystem,
  bloonSystem,
  pathSystem,
}: {
  eventSystem: EventSystem;
  bloonSystem: BloonSystem;
  pathSystem: PathSystem;
}) => {
  const state: {
    projectiles: Projectile[];
  } = {
    projectiles: [],
  };

  eventSystem.subscribe<TowerFired>({
    type: "TowerFired",
    callback: (event) => {
      const { tower, bloon } = event.payload;
      const speed = 0.01;
      const estimantedHitPosition = getHitPosition({
        bloon,
        origin: tower.position,
        speed,
        level: 1,
        pathSystem,
      });
      const direction = {
        x: estimantedHitPosition.x - tower.position.x,
        y: estimantedHitPosition.y - tower.position.y,
      };
      state.projectiles.push({
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
    },
  });

  return {
    update: (deltaTime: number) => {
      for (let i = 0; i < state.projectiles.length; i++) {
        const projectile = state.projectiles[i];
        projectile.elapsed += deltaTime;
        projectile.position.x +=
          projectile.direction.x * deltaTime * projectile.speed;
        projectile.position.y +=
          projectile.direction.y * deltaTime * projectile.speed;

        const distance = Math.sqrt(
          Math.pow(projectile.position.x - projectile.origin.x, 2) +
            Math.pow(projectile.position.y - projectile.origin.y, 2)
        );
        if (distance >= projectile.range * 2) {
          state.projectiles.splice(i, 1);
          i--;
          console.log("projectile removed");
          continue;
        }

        const bloon = bloonSystem.getLastBloonInRadius({
          x: projectile.position.x,
          y: projectile.position.y,
          radius: 40,
        });
        if (!bloon) continue;
        eventSystem.publish<BloonHitEvent>({
          type: "BloonHit",
          payload: { bloon, projectile },
        });
        state.projectiles.splice(i, 1);
        i--;
        console.log("projectile removed");
      }
    },
    getProjectiles: () => state.projectiles,
  };
};

export type ProjectileSystem = ReturnType<typeof createProjectileSystem>;
