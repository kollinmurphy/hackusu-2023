import { BaseEvent } from ".";
import { TowerType } from "../../../types/Tower";

export type TowerPlacedEvent = BaseEvent<
  "TowerPlaced",
  {
    type: TowerType;
    x: number;
    y: number;
    cost: number;
  }
>;
