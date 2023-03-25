import { Projectile } from "../../types/Projectile";
import { Textures } from "../textures";

export const renderProjectile = (props: {
  projectile: Projectile;
  context: CanvasRenderingContext2D;
}) => {
  const { projectile, context } = props;

  switch (projectile.type) {
    case "dartMonkey":
    case "superMonkey":
      renderDart({ projectile, context });
      break;
    default:
      console.log("Unknown projectile type: ", projectile.type);
  }
};

const renderDart = (props: {
  projectile: Projectile;
  context: CanvasRenderingContext2D;
}) => {
  const { projectile, context } = props;
  const texture = Textures().projectiles.dart;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 0.1;
  context.drawImage(
    texture,
    (-texture.width / 2) * size,
    (-texture.height / 2) * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
