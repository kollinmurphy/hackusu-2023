import { StoreSystem } from "../store";

export const renderStore = ({
  context,
  canvas,
  storeSystem,
}: {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  storeSystem: StoreSystem;
}) => {
  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.5)";

  context.rect(780, 20, 224, canvas.height - 40);
  context.fill();
  
  context.restore();
}
