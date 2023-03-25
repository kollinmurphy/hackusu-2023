import { createBloonSystem } from "../../systems/bloons";
import { createEventSystem } from "../../systems/events";
import { createLivesSystem } from "../../systems/livesSystem";
import { createMoneySystem } from "../../systems/money";
import { createMouseManager, MouseManager } from "../../systems/mouseInput";
import { createPathSystem } from "../../systems/paths";
import { createRenderSystem } from "../../systems/render";
import { createRoundSystem } from "../../systems/roundSystem";
import { createStoreSystem } from "../../systems/store";
import { GameView } from "../../types/GameView";

export const createGameplay = ({
  canvas,
  context,
}: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}): GameView => {
  const mouseSystem: MouseManager = createMouseManager({ canvas });
  const eventSystem = createEventSystem();
  const pathSystem = createPathSystem({ type: "original" });
  const bloonSystem = createBloonSystem({ eventSystem, pathSystem });
  const roundSystem = createRoundSystem({
    eventSystem,
    mouseSystem,
    bloonSystem,
  });
  const moneySystem = createMoneySystem({ eventSystem });
  const storeSystem = createStoreSystem({ moneySystem, mouseSystem });
  const livesSystem = createLivesSystem({ eventSystem, bloonSystem });
  const renderSystem = createRenderSystem({
    bloonSystem,
    moneySystem,
    context,
    canvas,
    storeSystem,
    pathSystem,
    roundSystem,
    livesSystem,
  });

  return {
    update: (deltaTime) => {
      mouseSystem.update();
      storeSystem.update();
      bloonSystem.update(deltaTime);
    },
    render: () => {
      renderSystem.render();
    },
  };
};
