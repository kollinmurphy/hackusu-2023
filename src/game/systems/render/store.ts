import { MoneySystem } from "../money";
import { RoundSystem } from "../roundSystem";
import { StoreSystem } from "../store";

export const renderStore = ({
  context,
  canvas,
  // storeSystem,
  // moneySystem,
  roundSystem,
}: {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  storeSystem: StoreSystem;
  moneySystem: MoneySystem;
  roundSystem: RoundSystem;
}) => {
  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.5)";

  context.beginPath();
  context.rect(780, 20, 264, canvas.height - 40);
  context.closePath();
  context.fill();

  context.fillStyle = "white";
  context.font = "36px TrebuchetMS";
  context.fillText("Round:", 800, 70);

  context.save();
  context.textAlign = "right";
  context.fillText(roundSystem.getRound().toString(), 1024, 70);
  context.restore();

  if (!roundSystem.isActive()) {
    context.beginPath();
    context.fillStyle = "rgba(0, 255, 0, 0.7)";
    context.rect(800, 880, 224, 100);
    context.closePath();
    context.fill();
  
    context.fillStyle = "white";
    context.font = "36px TrebuchetMS";
    context.fillText("Start Round", 820, 940);
  }


  context.restore();
};
