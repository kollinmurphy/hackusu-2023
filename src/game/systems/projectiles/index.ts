import { Projectile } from "../../types/Projectile";
import { BloonSystem } from "../bloons";
import { EventSystem } from "../events";
import { BloonHitEvent } from "../events/types/BloonHit";
import { TowerFired } from "../events/types/TowerFired";
import { PathSystem } from "../paths";
import { createBomb } from "./bomb";
import { createDart } from "./darts";
import { createIceRing, ICE_SPREAD_RATE } from "./ice";
import { getProjectileRadius } from "./radius";
import { createTacks } from "./tacks";

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
      const projectiles = (() => {
        switch (tower.type) {
          case "dartMonkey":
          case "superMonkey":
            return createDart({ bloon, pathSystem, tower });
          case "tack":
            return createTacks({ tower });
          case "ice":
            return createIceRing({ tower });
          case "bomb":
            return createBomb({ tower, pathSystem, bloon });
          default:
            return [];
        }
      })();
      projectiles?.forEach((projectile) => {
        state.projectiles.push(projectile);
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
        if (
          distance >= projectile.range * 1.4 ||
          (projectile.type === "ice" &&
            projectile.elapsed >= projectile.range / ICE_SPREAD_RATE)
        ) {
          state.projectiles.splice(i, 1);
          i--;
          console.log(`clear projectile ${projectile.id} (out of range)`);
          if (projectile.type === "ice") {
            // freeze bloons in radius
            const bloons = bloonSystem.getBloons().filter((bloon) => {
              const distance = Math.sqrt(
                Math.pow(bloon.x - projectile.position.x, 2) +
                  Math.pow(bloon.y - projectile.position.y, 2)
              );
              return distance <= projectile.range && bloon.type !== "white";
            });
            bloons.forEach((bloon) => {
              bloon.frozen = true;
              bloon.frozenDuration = projectile.freezeTime!;
              bloon.frozenTime = 0;
            });
          }
          continue;
        }

        const bloon = bloonSystem.getLastBloonInRadius({
          x: projectile.position.x,
          y: projectile.position.y,
          radius: getProjectileRadius(projectile.type),
        });
        if (!bloon) continue;
        eventSystem.publish<BloonHitEvent>({
          type: "BloonHit",
          payload: { bloon, projectile },
        });
        if (projectile.pierced >= projectile.pierce) {
          console.log(`clear bloon ${bloon.id} from ${projectile.id}; ${projectile.pierced} / ${projectile.pierce}`);
          state.projectiles.splice(i, 1);
          i--;
        } else {
          projectile.pierced++;
        }
      }
    },
    getProjectiles: () => state.projectiles,
  };
};

export type ProjectileSystem = ReturnType<typeof createProjectileSystem>;
