import { Bloon } from "../../types/bloon";

const SPEED_FACTOR = 0.3;

export const getBloonSpeed = (bloon: Bloon) => {
  if (bloon.frozen) return 0;
  const value = (() => {
    switch (bloon.type) {
      case "red":
        return 1;
      case "blue":
        return 1.5;
      case "green":
        return 1.7;
      case "yellow":
        return 3;
      case "white":
      case "black":
        return 1.5;
    }
  })();

  return value * SPEED_FACTOR;
};
