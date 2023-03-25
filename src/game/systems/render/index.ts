import { BloonSystem } from "../bloons";
import { LivesSystem } from "../lives";
import { MoneySystem } from "../money";
import { PathSystem } from "../paths";
import { RoundSystem } from "../round";
import { StoreSystem } from "../store";
import { TowerSystem } from "../towers";
import { canPlaceTower } from "../towers/canPlace";
import { renderBloon } from "./bloon";
import { renderMap } from "./map";
import { renderStore } from "./store";
import { renderTower } from "./tower";

export const createRenderSystem = ({
  bloonSystem,
  storeSystem,
  moneySystem,
  pathSystem,
  context,
  canvas,
  roundSystem,
  livesSystem,
  towerSystem,
}: {
  bloonSystem: BloonSystem;
  moneySystem: MoneySystem;
  storeSystem: StoreSystem;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pathSystem: PathSystem;
  roundSystem: RoundSystem;
  livesSystem: LivesSystem;
  towerSystem: TowerSystem;
}) => {
  return {
    render: () => {
      renderMap({ context, canvas, pathSystem });
      for (const bloon of bloonSystem.getBloons())
        renderBloon({ bloon, context });
      for (const tower of towerSystem.getTowers())
        renderTower({ tower, context });
      renderStore({
        context,
        canvas,
        storeSystem,
        moneySystem,
        roundSystem,
        livesSystem,
        canPlaceTower: canPlaceTower({
          towerSystem,
          storeSystem,
          pathSystem,
          canvas,
        }),
      });
    },
  };
};
