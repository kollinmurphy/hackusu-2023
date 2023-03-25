import { Tower } from "../../types/Tower";
import { Textures } from "../textures";
import { getTowerSize } from "../towers/size";
import snowflakes from "./snowflakes.json";

export const renderTower = ({
  tower,
  context,
}: {
  tower: Omit<Tower, "range" | "cooldown">;
  context: CanvasRenderingContext2D;
}) => {
  const textures = Textures();
  context.save();
  context.translate(tower.position.x, tower.position.y);
  const size = getTowerSize(tower.type);
  switch (tower.type) {
    case "dartMonkey": {
      context.rotate(tower.rotation);
      context.drawImage(
        textures.towers.dartMonkey.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      break;
    }
    case "tack": {
      context.drawImage(
        textures.towers.tack.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      const orbSize = 0.65;
      context.drawImage(
        textures.towers.tack.orb,
        (-size.width / 2) * orbSize,
        (-size.height / 2) * orbSize,
        size.width * orbSize,
        size.height * orbSize
      );
      const orb2Size = 0.35;
      context.drawImage(
        textures.towers.tack.orb2,
        (-size.width / 2) * orb2Size,
        (-size.height / 2) * orb2Size,
        size.width * orb2Size,
        size.height * orb2Size
      );

      const tackSize = 0.3;

      context.save();
      context.rotate(-Math.PI / 16);
      context.drawImage(
        textures.towers.tack.tack,
        (-size.width / 2) * tackSize,
        (-size.height / 2) * tackSize,
        size.width * tackSize,
        size.height * tackSize
      );
      context.restore();
      context.save();
      context.rotate(Math.PI / 16);
      context.scale(-1, 1);

      context.drawImage(
        textures.towers.tack.tack,
        (-size.width / 2) * tackSize,
        (-size.height / 2) * tackSize,
        size.width * tackSize,
        size.height * tackSize
      );
      context.restore();

      break;
    }
    case "ice": {
      context.drawImage(
        textures.towers.ice.orb,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      context.drawImage(
        textures.towers.ice.border,
        -size.width / 2 + 2,
        -size.height / 2 + 4,
        size.width,
        size.height
      );
      for (const snowflake of snowflakes) {
        const time = tower.animation % snowflake.reset;
        if (time > snowflake.in && time < snowflake.out) {
          const progress =
            (time - snowflake.in) / (snowflake.out - snowflake.in);
          const x =
            snowflake.from.x + (snowflake.to.x - snowflake.from.x) * progress;
          const y =
            snowflake.from.y + (snowflake.to.y - snowflake.from.y) * progress;
          context.drawImage(textures.towers.ice.snowflake, x, y, 10, 10);
        }
      }
      break;
    }
    case "bomb": {
      context.drawImage(
        textures.towers.bomb.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      context.rotate(tower.rotation);
      const barrelWidth = 1.8;
      const barrelHeight = 0.7;
      const width = size.width * barrelWidth;
      const height = size.height * barrelHeight;
      context.drawImage(
        textures.towers.bomb.barrel,
        -width / 2,
        -height / 2,
        width,
        height
      );
      break;
    }
    case "superMonkey": {
      context.rotate(tower.rotation);
      context.drawImage(
        textures.towers.superMonkey.base,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      break;
    }
  }
  context.restore();
};
