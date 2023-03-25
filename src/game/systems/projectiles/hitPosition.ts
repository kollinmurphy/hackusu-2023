import { Bloon } from "../../types/bloon";
import { Projectile } from "../../types/Projectile";
import { getBloonSpeed } from "../bloons/speed";
import { PathSystem } from "../paths";

const getTimeToHit = ({
  bloon,
  origin,
  speed,
}: {
  bloon: Pick<Bloon, "x" | "y">;
  origin: Projectile["position"];
  speed: number;
}) => {
  const distanceToBloon = Math.sqrt(
    Math.pow(bloon.x - origin.x, 2) + Math.pow(bloon.y - origin.y, 2)
  );
  const timeToHit = distanceToBloon * speed;
  return timeToHit * 1000;
};

const getPositionAfterTime = ({
  bloon,
  time,
  pathSystem,
}: {
  bloon: Bloon;
  time: number;
  pathSystem: PathSystem;
}) => {
  const estimatedHitPosition = pathSystem.computePoint(
    bloon.distance + getBloonSpeed(bloon) * time
  );
  return estimatedHitPosition;
};

export const getHitPosition = ({
  bloon,
  origin,
  speed,
  level,
  pathSystem,
}: {
  bloon: Bloon;
  origin: Projectile["position"];
  speed: number;
  level: number;
  pathSystem: PathSystem;
}) => {
  let position = {
    x: origin.x,
    y: origin.y,
  };
  let time: number;
  for (let i = 0; i < level; i++) {
    time =
      getTimeToHit({
        bloon: position,
        origin,
        speed,
      }) * 1.5;
    position = getPositionAfterTime({
      bloon,
      time,
      pathSystem,
    });
  }
  return position!;
};
