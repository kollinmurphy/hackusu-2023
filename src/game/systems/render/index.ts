import { BloonSystem } from "../bloons";
import { MoneySystem } from "../money";
import { StoreSystem } from "../store";
import { renderBloon } from "./bloon";
import { renderStore } from "./store";

export const createRenderSystem = ({
  bloonSystem,
  storeSystem,
  // moneySystem,
  context,
  canvas,
}: {
  bloonSystem: BloonSystem;
  moneySystem: MoneySystem;
  storeSystem: StoreSystem;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}) => {
  return {
    render: () => {
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
      renderStore({ context, canvas, storeSystem });
    },
  };
};
