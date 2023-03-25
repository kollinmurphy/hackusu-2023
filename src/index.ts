import { createGame } from "./game";
import { initializeAudio } from "../public/assets/ignore/audio";
import { initializeTextures } from "./game/systems/textures";
import "./style.css";

(async () => {
  await Promise.all([initializeTextures(), initializeAudio()]);

  let previousTime = performance.now();

  const game = createGame({
    canvas: document.querySelector("#canvas-game") as HTMLCanvasElement,
  });

  const gameLoop = (currentTime: number) => {
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;
    game.update(deltaTime);
    game.render();
    requestAnimationFrame(gameLoop);
  };

  requestAnimationFrame(gameLoop);
})();
