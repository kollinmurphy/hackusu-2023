import { TowerSystem } from ".";
import { PathSystem } from "../paths";
import { StoreSystem } from "../store";
import { getTowerSize } from "./size";

export const canPlaceTower = ({
  towerSystem,
  storeSystem,
  pathSystem,
  canvas,
}: {
  towerSystem: TowerSystem;
  storeSystem: StoreSystem;
  pathSystem: PathSystem;
  canvas: HTMLCanvasElement;
}) => {
  const details = storeSystem.getPlacingTowerDetails();
  if (!details) return false;
  const size = getTowerSize(details.type);
  const { x, y } = details.position;
  return (
    pathSystem.canPlaceTower({
      x,
      y,
      width: size.width,
      height: size.height,
      canvas,
    }) &&
    towerSystem.canPlaceTower({
      x,
      y,
      width: size.width,
      height: size.height,
    })
  );
};
