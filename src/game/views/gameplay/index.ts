import { createBloonSystem } from "../../systems/bloons";
import { createEventSystem } from "../../systems/events";
import { createMoneySystem } from "../../systems/money";
import { createPathSystem } from "../../systems/paths";
import { createRenderSystem } from "../../systems/render";
import { Textures } from "../../systems/textures";
import { GameView } from "../../types/GameView";

export const createGameplay = ({
  canvas,
  context,
}: {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}): GameView => {
  const textures = Textures();

  const eventSystem = createEventSystem();
  const pathSystem = createPathSystem({ type: "original" });
  const moneySystem = createMoneySystem({ eventSystem });
  const bloonSystem = createBloonSystem({ eventSystem, pathSystem });
  const renderSystem = createRenderSystem({
    bloonSystem,
    moneySystem,
    context,
    canvas,
  });

  return {
    update: (deltaTime) => {
      bloonSystem.update(deltaTime);
    },
    render: () => {
      const gap = canvas.width * 0.1;
      context.save();

      pathSystem.tiles.forEach((tile) => {
        context.save();
        context.translate(tile.x, tile.y);
        if (tile.orientation === "vertical") {
          context.translate(tile.height, 0);
          context.rotate(Math.PI / 2);
        }
        context.drawImage(textures.map.tile, 0, 0, tile.width, tile.height);
        context.restore();
      });

      context.drawImage(
        textures.map.grass,
        -gap,
        -gap,
        canvas.width + gap * 2,
        canvas.height + gap * 2
      );
      context.globalAlpha = 0.9;
      context.drawImage(
        textures.map.overlay,
        -gap,
        -gap,
        canvas.width + gap * 2,
        canvas.height + gap * 2
      );
      context.globalAlpha = 1;
      context.drawImage(
        textures.map.pathBackground,
        -canvas.width * 0.03,
        -canvas.height * 0.06,
        canvas.width * 0.77,
        canvas.height * 0.965
      );
      context.restore();

      renderSystem.render();
    },
  };
};