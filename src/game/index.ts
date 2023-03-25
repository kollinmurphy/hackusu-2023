import { GameView } from "./types/GameView";
import { createGameplay } from "./views/gameplay";

export const createGame = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): GameView => {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get context from canvas.");

  const state: {
    screen: GameView;
  } = {
    screen: createGameplay({ canvas, context }),
  };

  return {
    update: (deltaTime) => {
      state.screen.update(deltaTime);
    },
    render: () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#aaa";
      context.fillRect(0, 0, canvas.width, canvas.height);
      state.screen.render();
    },
  };
};
