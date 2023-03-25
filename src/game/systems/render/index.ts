import { BloonSystem } from "../bloons";
import { MoneySystem } from "../money";
import { renderBloon } from "./bloon";

export const createRenderSystem = ({
  bloonSystem,
  // moneySystem,
  context,
}: // canvas,
{
  bloonSystem: BloonSystem;
  moneySystem: MoneySystem;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
}) => {
  return {
    render: () => {
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
    },
  };
};
