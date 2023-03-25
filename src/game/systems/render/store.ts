import { LivesSystem } from "../livesSystem";
import { MoneySystem } from "../money";
import { RoundSystem } from "../roundSystem";
import { StoreSystem } from "../store";

export const renderStore = ({
  context,
  canvas,
  // storeSystem,
  moneySystem,
  roundSystem,
  livesSystem,
}: {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  storeSystem: StoreSystem;
  moneySystem: MoneySystem;
  roundSystem: RoundSystem;
  livesSystem: LivesSystem;
}) => {
  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.5)";

  context.beginPath();
  context.rect(780, 20, 264, canvas.height - 40);
  context.closePath();
  context.fill();

  const lineHeight = 50;
  const linesStart = 70;

  context.fillStyle = "white";
  context.font = "36px TrebuchetMS";
  context.fillText("Round:", 800, linesStart);
  context.fillText("Money:", 800, linesStart + lineHeight);
  context.fillText("Lives:", 800, linesStart + lineHeight * 2);

  context.save();
  context.textAlign = "right";
  context.fillText(roundSystem.getRound().toString(), 1024, linesStart);
  const money = moneySystem.getMoney();
  context.fillText(money.toString(), 1024, linesStart + lineHeight);
  const lives = livesSystem.getLives();
  context.fillText(lives.toString(), 1024, linesStart + lineHeight * 2);

  context.textAlign = "center";
  context.fillText("Build Towers", 912, linesStart + lineHeight * 3.5);

  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.moveTo(800, linesStart + lineHeight * 3.5 + 8);
  context.lineTo(1024, linesStart + lineHeight * 3.5 + 8);
  context.stroke();
  context.restore();

  if (!roundSystem.isActive()) {
    context.beginPath();
    context.fillStyle = "rgba(0, 255, 0, 0.7)";
    context.rect(800, 880, 224, 100);
    context.closePath();
    context.fill();
  
    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "36px TrebuchetMS";
    context.fillText("Start Round", 912, 940);
  }


  context.restore();
};
