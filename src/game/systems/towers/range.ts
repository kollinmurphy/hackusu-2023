import { TowerType } from "../../types/Tower";

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
        return 70; //?
      case "superMonkey":
        return 150;
    }
  })();
  return value * 2;
};
