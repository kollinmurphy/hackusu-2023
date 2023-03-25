import { Textures } from "../systems/textures";
import { GameView } from "../types/GameView";

export const createMenu = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): GameView => {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get context from canvas.");

  const textures = Textures();

  return {
    update: (deltaTime) => {
      console.log("Menu update", deltaTime);
    },
    render: () => {
      context.drawImage(textures.menu.bloons, 0, 0);
    },
  };
};
