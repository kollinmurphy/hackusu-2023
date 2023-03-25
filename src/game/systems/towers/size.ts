import { TowerType } from "../../types/Tower";

export const getTowerSize = (
  type: TowerType
): { width: number; height: number } => {
  switch (type) {
    case "dartMonkey":
      return { width: 64, height: 72 };
    case "tack":
      return { width: 64, height: 64 };
    case "ice":
      return { width: 32, height: 32 };
    case "bomb":
      return { width: 56, height: 56 };
    case "superMonkey":
      return { width: 72, height: 82 };
  }
};
