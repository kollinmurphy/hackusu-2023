import { LivesSystem } from "../lives";
import { MoneySystem } from "../money";
import { BoundingBox } from "../mouse";
import { RoundSystem } from "../round";
import { StoreSystem } from "../store";
import { Textures } from "../textures";
import { getTowerName } from "../towers/name";
import { RANGE_MULTIPLIER } from "../towers/range";
import { getSellPrice } from "../towers/sellPrice";
import { getSpeedLabel } from "../towers/speedLabel";
import { towerUpgrades } from "../towers/upgrades";
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

  renderSelectedTowerPane({ context, storeSystem, moneySystem });

  context.restore();
};

const renderSelectedTowerPane = ({
  context,
  storeSystem,
  moneySystem,
}: {
  context: CanvasRenderingContext2D;
  storeSystem: StoreSystem;
  moneySystem: MoneySystem;
}) => {
  const tower = storeSystem.getSelectedTower();
  if (!tower) return;

  context.save();

  context.globalAlpha = 0.6;
  context.fillStyle = `#B8DEB7`;
  context.beginPath();
  context.rect(800, 330, 224, 532);
  context.closePath();
  context.fill();
  context.globalAlpha = 1;

  context.textAlign = "center";
  context.fillStyle = `#056105`;
  context.font = "24px TrebuchetMS";
  context.fillText(getTowerName(tower.type), 912, 380);

  context.strokeStyle = `#056105`;
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(820, 390);
  context.lineTo(1004, 390);
  context.stroke();

  context.textAlign = "left";
  context.fillText("Speed:", 810, 430);
  context.fillText("Range:", 810, 480);

  context.textAlign = "right";
  context.fillText(getSpeedLabel(tower.cooldown), 1014, 430);
  context.fillText((tower.range / RANGE_MULTIPLIER).toString(), 1014, 480);

  context.fillStyle = `#A94A2E`;
  context.beginPath();
  const sellButtonCoordinates = getSellButtonCoordinates();
  context.rect(
    sellButtonCoordinates.x,
    sellButtonCoordinates.y,
    sellButtonCoordinates.width,
    sellButtonCoordinates.height
  );
  context.closePath();
  context.fill();

  context.fillStyle = "rgba(255, 255, 255, 0.8)";
  context.font = "24px TrebuchetMS";
  context.textAlign = "left";
  context.fillText("Sell for:", 830, 830);

  context.fillStyle = "white";
  context.font = "24px TrebuchetMS";
  context.textAlign = "right";
  context.fillText(getSellPrice(tower.cost).toString(), 994, 830);

  const upgrades = towerUpgrades[tower.type];
  const xStart = 810;
  const yStart = 500;
  const xSpacing = 10;
  const width = 100;
  const height = 280;

  for (let i = 0; i < upgrades.length; i++) {
    const hover = storeSystem.isHovering(i);
    const purchased = tower.upgrades.find((u) => u.key === upgrades[i].key);

    context.fillStyle =
      hover && !purchased
        ? "#42F042"
        : purchased
        ? "#11D011"
        : moneySystem.getMoney() >= upgrades[i].cost
        ? `#0FBD0F`
        : "#A94A2E";
    context.beginPath();
    context.rect(xStart + (xSpacing + width) * i, yStart, width, height);
    context.closePath();
    context.fill();

    const lines = upgrades[i].label.split(" ");
    for (let j = 0; j < lines.length; j++) {
      context.fillStyle = "white";
      context.font = "18px TrebuchetMS";
      context.textAlign = "center";
      context.fillText(
        lines[j],
        xStart + (xSpacing + width) * i + width / 2,
        yStart + 150 + j * 25
      );
    }

    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    context.fillText(
      purchased ? "Already purchased" : "Buy for:",
      xStart + (xSpacing + width) * i + width / 2,
      yStart + height - 40
    );

    context.fillStyle = "white";
    context.fillText(
      purchased ? "" : upgrades[i].cost.toString(),
      xStart + (xSpacing + width) * i + width / 2,
      yStart + height - 40 + 25
    );
  }

  context.restore();
};

export const getSellButtonCoordinates = () => ({
  x: 820,
  y: 800,
  width: 184,
  height: 40,
});

export const getUpgradeButtonCoordinates = (
  index: number
): BoundingBox & { type: "box" } => ({
  x: 810 + (10 + 100) * index,
  y: 500,
  width: 100,
  height: 280,
  type: "box",
});
