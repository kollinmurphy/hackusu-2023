import { TowerType } from "../../types/Tower";

export const getTowerName = (type: TowerType) => {
  switch (type) {
    case "bomb":
      return "Bomb Tower";
    case "dartMonkey":
      return "Dart Monkey";
    case "ice":
      return "Ice Tower";
    case "tack":
      return "Tack Tower";
    case "superMonkey":
      return "Super Monkey";
  }
};
