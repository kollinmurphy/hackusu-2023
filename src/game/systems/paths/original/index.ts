import { getStoreStartX } from "../../render/store";
import { Path } from "../types";
import { computePoint } from "./computePoint";
import openBoxes from "./openBoxes.json";
import tiles from "./tiles.json";

export const createOriginalPath = (): Path => {
  return {
    key: "original",
    tiles: tiles as Path["tiles"],
    computePoint,
    canPlaceTower: ({ x, y, width, height, canvas }) => {
      if (x - width / 2 < 0 || x + width / 2 > getStoreStartX()) return false;
      if (y - height / 2 < 0 || y + height / 2 > canvas.height) return false;
      for (let i = 0; i < openBoxes.length; i++) {
        const box = openBoxes[i];
        if (
          x - width / 2 > box.x &&
          x + width / 2 < box.x + box.width &&
          y - height / 2 > box.y &&
          y + height / 2 < box.y + box.height
        )
          return true;
      }
      return false;
    },
  };
};
