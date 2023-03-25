import { PathSystem } from "../paths";
import { Textures } from "../textures";

export const renderMap = ({
  context,
  pathSystem,
  canvas,
}: {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pathSystem: PathSystem;
}) => {
  const textures = Textures();
  const gap = 1024 * 0.1;
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
    1024 + gap * 2,
    canvas.height + gap * 2
  );
  context.globalAlpha = 0.9;
  context.drawImage(
    textures.map.overlay,
    -gap,
    -gap,
    1024 + gap * 2,
    canvas.height + gap * 2
  );
  context.globalAlpha = 1;
  context.drawImage(
    textures.map.pathBackground,
    -1024 * 0.03,
    -canvas.height * 0.06,
    1024 * 0.77,
    canvas.height * 0.965
  );
  context.restore();
};
