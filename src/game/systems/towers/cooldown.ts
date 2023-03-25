import { TowerType } from "../../types/Tower";

export const getTowerCooldown = (type: TowerType) => {
  switch (type) {
    case "dartMonkey":
      return 500;
    case "bomb":
      return 1000;
    case "tack":
      return 1000;
    case "ice":
      return 1500;
    case "superMonkey":
      return 100;
  }
};
