import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";
import { Projectile } from "../../../types/Projectile";

export type BloonHitEvent = BaseEvent<
  "BloonHit",
  {
    bloon: Bloon;
    projectile: Projectile;
  }
>;
