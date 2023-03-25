import { BaseEvent } from ".";
import { Tower } from "../../../types/Tower";

export type TowerSoldEvent = BaseEvent<
  "TowerSold",
  {
    tower: Tower;
  }
>;
