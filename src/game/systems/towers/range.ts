import { TowerType } from "../../types/Tower";

export const RANGE_MULTIPLIER = 1.75;

export const getTowerRange = (type: TowerType) => {
  const value = (() => {
    switch (type) {
      case "dartMonkey":
        return 100;
      case "bomb":
        return 120;
      case "tack":
        return 70;
      case "ice":
        return 50; //?
      case "superMonkey":
        return 140;
    }
  })();
  return value * RANGE_MULTIPLIER;
};
