import { TowerType } from "../../types/Tower";

export const getTowerCost = (tower: TowerType) => {
  switch (tower) {
    case "dartMonkey":
      return 250;
    case "tack":
      return 400;
    case "ice":
      return 850;
    case "bomb":
      return 900;
    case "superMonkey":
      return 4000;
  }
};
