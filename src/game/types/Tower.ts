export type TowerType = "dartMonkey" | "tack" | "ice" | "superMonkey" | "bomb";

export type TowerId = number & { __brand: "towerId" };

export type Tower = {
  id: TowerId;
  type: TowerType;
  position: { x: number; y: number };
  rotation: number;
  range: number;
  cooldown: number;
  timeSinceFire: number;
  animation: number;
  freezeTime?: number;
  explodeRadius?: number;
  cost: number;
  upgrades: TowerUpgrade[];
  pierce?: number;
};

export type TowerUpgrade = {
  key: string;
  label: string;
  cost: number;
  pierce?: number;
  range?: number;
  explodeRadius?: number;
  freezeTime?: number;
  cooldown?: number;
};

let nextId = 1;

export const createTowerId = () => {
  return nextId++ as TowerId;
};
