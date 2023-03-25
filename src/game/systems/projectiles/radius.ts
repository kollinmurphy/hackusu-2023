import { TowerType } from "../../types/Tower";

export const getProjectileRadius = (type: TowerType) => {
  switch (type) {
    case "dartMonkey":
    case "superMonkey":
      return 40;
    case "tack":
      return 20;
    case "bomb":
      return 45;
    default:
      return 0;
  }
};
