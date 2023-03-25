import { LivesSystem } from "../livesSystem";
import { MoneySystem } from "../money";
import { RoundSystem } from "../roundSystem";
import { StoreSystem } from "../store";
import { Textures } from "../textures";

const renderTowerIcons = ({
  context,
}: {
  context: CanvasRenderingContext2D;
}) => {
  const textures = Textures();
  const start = 800;
  const width = 224;
  const each = width / 5;
  const size = each * 0.95;

  context.save();
  context.translate(start, 270);
  context.drawImage(textures.shop.dartMonkey, 0, 0, size, size);

  context.save();
  context.translate(each * 0.1, each * 0.3);
  context.rotate(-Math.PI / 4);
  context.drawImage(textures.projectiles.dart, 0, 0, 10, size * 0.7);
  context.restore();

  context.drawImage(textures.shop.tackTower, each, 0, size, size);

  context.save();
  context.translate(each * 1.5, each * 0.5);
  for (let i = 0; i < 8; i++) {
    context.rotate(Math.PI / 4);
    context.drawImage(textures.projectiles.tack, -3, size*0.15, 3, size * 0.3);
  }
  context.restore();

  context.drawImage(textures.shop.iceTower, each * 2, 0, size, size);
  context.drawImage(textures.shop.bombTower, each * 3, 0, size, size);
  context.drawImage(textures.shop.superMonkey, each * 4, 0, size, size);
  context.restore();
};

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

  renderTowerIcons({ context });

  context.restore();
};
