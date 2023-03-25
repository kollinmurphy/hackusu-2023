import { LivesSystem } from "../lives";
import { MoneySystem } from "../money";
import { RoundSystem } from "../round";
import { StoreSystem } from "../store";
import { Textures } from "../textures";
import { renderTower } from "./tower";

export const getStoreStartX = () => 780;

export const getTowerIconDetails = () => {
  const width = 224;
  const each = width / 5;
  const size = each * 0.95;
  return { size, each, x: 800, y: 270 };
};

const renderTowerIcons = ({
  context,
}: {
  context: CanvasRenderingContext2D;
}) => {
  const textures = Textures();
  const { x: start, each, size, y } = getTowerIconDetails();

  context.save();
  context.translate(start, y);
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
    context.drawImage(
      textures.projectiles.tack,
      -3,
      size * 0.15,
      3,
      size * 0.3
    );
  }
  context.restore();

  context.drawImage(textures.shop.iceTower, each * 2, 0, size, size);
  context.drawImage(textures.shop.bombTower, each * 3, 0, size, size);
  context.drawImage(textures.shop.superMonkey, each * 4, 0, size, size);
  context.restore();
};

const renderPlacingTower = ({
  storeSystem,
  canPlace,
  context,
}: {
  storeSystem: StoreSystem;
  context: CanvasRenderingContext2D;
  canPlace: boolean;
}) => {
  const tower = storeSystem.getPlacingTowerDetails();
  if (!tower) return;

  context.save();
  context.fillStyle = canPlace
    ? "rgba(0, 255, 0, 0.5)"
    : "rgba(255, 0, 0, 0.5)";
  context.beginPath();
  context.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.restore();

  renderTower({
    context,
    tower,
  });
};

const renderSelectedTower = ({
  context,
  storeSystem,
}: {
  context: CanvasRenderingContext2D;
  storeSystem: StoreSystem;
}) => {
  const tower = storeSystem.getSelectedTower();
  if (!tower) return;

  context.save();
  context.fillStyle = "rgba(255, 255, 255, 0.4)";
  context.beginPath();
  context.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
  context.closePath();
  context.fill();
  context.restore();
};

export const renderStore = ({
  context,
  canvas,
  storeSystem,
  moneySystem,
  roundSystem,
  livesSystem,
  canPlaceTower,
}: {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  storeSystem: StoreSystem;
  moneySystem: MoneySystem;
  roundSystem: RoundSystem;
  livesSystem: LivesSystem;
  canPlaceTower: boolean;
}) => {
  context.save();

  renderSelectedTower({
    context,
    storeSystem,
  });

  context.fillStyle = "rgba(255, 255, 255, 0.5)";

  context.beginPath();
  context.rect(getStoreStartX(), 20, 264, canvas.height - 40);
  context.closePath();
  context.fill();

  const lineHeight = 50;
  const linesStart = 70;

  context.textAlign = "left";
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
    const animation = roundSystem.getAnimation();
    const redBlue = Math.max(0, Math.min(255, animation * 175));

    context.beginPath();
    context.fillStyle = `rgba(${redBlue}, 255, ${redBlue}, 0.7)`;
    context.rect(800, 880, 224, 100);
    context.closePath();
    context.fill();

    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "36px TrebuchetMS";
    context.fillText("Start Round", 912, 940);
  }

  renderTowerIcons({ context });
  renderPlacingTower({ context, storeSystem, canPlace: canPlaceTower });

  context.restore();
};
