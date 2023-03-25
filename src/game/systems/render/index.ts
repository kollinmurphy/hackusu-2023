import { BloonSystem } from "../bloons";
import { LivesSystem } from "../lives";
import { MoneySystem } from "../money";
import { ParticleSystem } from "../particles";
import { PathSystem } from "../paths";
import { ProjectileSystem } from "../projectiles";
import { RoundSystem } from "../round";
import { StoreSystem } from "../store";
import { TowerSystem } from "../towers";
import { canPlaceTower } from "../towers/canPlace";
import { renderBloon } from "./bloon";
import { renderMap } from "./map";
import { renderParticles } from "./particles";
import { renderProjectile } from "./projectile";
import { renderStore } from "./store";
import { renderTower } from "./tower";

export const createRenderSystem = ({
  bloonSystem,
  storeSystem,
  moneySystem,
  pathSystem,
  context,
  canvas,
  roundSystem,
  livesSystem,
  towerSystem,
  projectileSystem,
  particleSystem,
}: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  bloonSystem: BloonSystem;
  moneySystem: MoneySystem;
  storeSystem: StoreSystem;
  pathSystem: PathSystem;
  roundSystem: RoundSystem;
  livesSystem: LivesSystem;
  towerSystem: TowerSystem;
  projectileSystem: ProjectileSystem;
  particleSystem: ParticleSystem;
}) => {
  return {
    render: () => {
      renderMap({ context, canvas, pathSystem });
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
      renderStore({
        context,
        canvas,
        storeSystem,
        moneySystem,
        roundSystem,
        livesSystem,
        canPlaceTower: canPlaceTower({
          towerSystem,
          storeSystem,
          pathSystem,
          canvas,
        }),
      });
      for (const tower of towerSystem.getTowers())
        renderTower({ tower, context });
      for (const projectile of projectileSystem.getProjectiles())
        renderProjectile({ projectile, context });
      renderParticles({ particleSystem, context });
    },
  };
};
