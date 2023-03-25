import { TowerType } from "../../types/Tower";

export const getTowerCooldown = (type: TowerType) => {
  return (
    0.9 *
    (() => {
      switch (type) {
        case "dartMonkey":
          return 500;
        case "bomb":
          return 1500;
        case "tack":
          return 1000;
        case "ice":
          return 3000;
        case "superMonkey":
          return 100;
      }
    })()
  );
};
