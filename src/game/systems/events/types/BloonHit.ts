import { BaseEvent } from ".";
import { BloonId } from "../../../types/bloon";

export type BloonHitEvent = BaseEvent<
  "BloonHit",
  {
    bloonId: BloonId;
  }
>;
