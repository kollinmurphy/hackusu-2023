import { BloonSystem } from "../bloons";
import { MoneySystem } from "../money";
import { PathSystem } from "../paths";
import { RoundSystem } from "../roundSystem";
import { StoreSystem } from "../store";
import { renderBloon } from "./bloon";
import { renderMap } from "./map";
import { renderStore } from "./store";

export const createRenderSystem = ({
  bloonSystem,
  storeSystem,
  moneySystem,
  pathSystem,
  context,
  canvas,
  roundSystem,
}: {
  bloonSystem: BloonSystem;
  moneySystem: MoneySystem;
  storeSystem: StoreSystem;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pathSystem: PathSystem;
  roundSystem: RoundSystem;
}) => {
  return {
    render: () => {
      renderMap({ context, canvas, pathSystem });
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
      renderStore({ context, canvas, storeSystem, moneySystem, roundSystem });
    },
  };
};
