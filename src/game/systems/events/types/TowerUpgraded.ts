import { BaseEvent } from ".";
import { Tower, TowerUpgrade } from "../../../types/Tower";

export type TowerUpgradedEvent = BaseEvent<
  "TowerUpgraded",
  {
    tower: Tower;
    upgrade: TowerUpgrade;
  }
>;
