import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";
import { Tower } from "../../../types/Tower";

export type TowerFired = BaseEvent<
  "TowerFired",
  {
    tower: Tower;
    bloon: Bloon;
  }
>;
