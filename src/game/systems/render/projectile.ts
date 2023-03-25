import { Projectile } from "../../types/Projectile";
import { ICE_SPREAD_RATE } from "../projectiles/ice";
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
    case "tack":
      renderTack({ projectile, context });
      break;
    case "ice":
      renderIceRing({ projectile, context });
      break;
    case "bomb":
      renderBomb({ projectile, context });
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

const renderTack = (props: {
  projectile: Projectile;
  context: CanvasRenderingContext2D;
}) => {
  const { projectile, context } = props;
  const texture = Textures().projectiles.tack1;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 1;
  context.drawImage(
    texture,
    (-texture.width / 2) * size,
    (-texture.height / 2) * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};

const renderIceRing = ({
  projectile,
  context,
}: {
  projectile: Projectile;
  context: CanvasRenderingContext2D;
}) => {
  const texture = Textures().projectiles.iceRing;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = (projectile.elapsed / projectile.range) * ICE_SPREAD_RATE * 3;
  console.log(size);
  context.drawImage(
    texture,
    (-texture.width / 2) * size,
    (-texture.height / 2) * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};

const renderBomb = ({
  projectile,
  context,
}: {
  projectile: Projectile;
  context: CanvasRenderingContext2D;
}) => {
  const texture = Textures().projectiles.bomb;
  context.save();
  context.translate(projectile.position.x, projectile.position.y);
  context.rotate(
    Math.atan2(projectile.direction.y, projectile.direction.x) + Math.PI / 2
  );
  const size = 2.5;
  context.drawImage(
    texture,
    (-texture.width / 2) * size,
    (-texture.height / 2) * size,
    texture.width * size,
    texture.height * size
  );
  context.restore();
};
