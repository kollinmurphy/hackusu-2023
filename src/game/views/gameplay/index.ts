import { createBloonSystem } from "../../systems/bloons";
import { createEventSystem } from "../../systems/events";
import { createKeyboardSystem } from "../../systems/keyboard";
import { createLivesSystem } from "../../systems/lives";
import { createMoneySystem } from "../../systems/money";
import { createMouseSystem } from "../../systems/mouse";
import { createParticleSystem } from "../../systems/particles";
import { createPathSystem } from "../../systems/paths";
import { createProjectileSystem } from "../../systems/projectiles";
import { createRenderSystem } from "../../systems/render";
import { createRoundSystem } from "../../systems/round";
import { createStoreSystem } from "../../systems/store";
import { createTowerSystem } from "../../systems/towers";
import { GameView } from "../../types/GameView";

export const createGameplay = ({
  canvas,
  context,
}: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}): GameView => {
  const mouseSystem = createMouseSystem({ canvas });
  const keyboardSystem = createKeyboardSystem();
  const eventSystem = createEventSystem();
  const pathSystem = createPathSystem({ type: "original" });
  const bloonSystem = createBloonSystem({ eventSystem, pathSystem });
  const roundSystem = createRoundSystem({
    eventSystem,
    mouseSystem,
    bloonSystem,
  });
  const moneySystem = createMoneySystem({ eventSystem });
  const towerSystem = createTowerSystem({ eventSystem, bloonSystem });
  const storeSystem = createStoreSystem({
    moneySystem,
    mouseSystem,
    keyboardSystem,
    eventSystem,
    canvas,
    pathSystem,
    towerSystem,
  });
  const livesSystem = createLivesSystem({ eventSystem });
  const projectileSystem = createProjectileSystem({
    eventSystem,
    bloonSystem,
    pathSystem,
  });
  const particleSystem = createParticleSystem({ eventSystem });
  const renderSystem = createRenderSystem({
    bloonSystem,
    moneySystem,
    context,
    canvas,
    storeSystem,
    pathSystem,
    roundSystem,
    livesSystem,
    towerSystem,
    projectileSystem,
    particleSystem,
  });

  return {
    update: (deltaTime) => {
      keyboardSystem.update();
      mouseSystem.update();
      roundSystem.update(deltaTime);
      bloonSystem.update(deltaTime);
      towerSystem.update(deltaTime);
      storeSystem.update(deltaTime);
      projectileSystem.update(deltaTime);
      particleSystem.update(deltaTime);
    },
    render: () => {
      renderSystem.render();
    },
  };
};
