import { BaseEvent } from ".";
import { Tower } from "../../../types/Tower";

export type TowerSelectedEvent = BaseEvent<
  "TowerSelected",
  {
    tower: Tower | null;
  }
>;
