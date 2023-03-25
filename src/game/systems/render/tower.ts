import { Tower } from "../../types/Tower";
import { Textures } from "../textures";
import { getTowerSize } from "../towers/size";

export const renderTower = ({
  tower,
  context,
}: {
  tower: Omit<Tower, "range" | "cooldown">;
  context: CanvasRenderingContext2D;
}) => {
  const textures = Textures();
  context.save();
  const size = getTowerSize(tower.type);
  switch (tower.type) {
    case "dartMonkey": {
      context.translate(tower.position.x, tower.position.y);
      context.rotate(tower.rotation);
      context.drawImage(
        textures.towers.dartMonkey,
        -size.width / 2,
        -size.height / 2,
        size.width,
        size.height
      );
      return;
    }
  }
  context.restore();
};
