import { TowerType } from "./Tower";

export type ProjectileId = number & { __brand: "projectileId" };

let nextId = 1;

export const createProjectileId = () => {
  return nextId++ as ProjectileId;
};

export type Projectile = {
  id: ProjectileId;
  type: TowerType;
  origin: { x: number; y: number };
  position: { x: number; y: number };
  direction: { x: number; y: number };
  speed: number;
  damage: number;
  range: number;
  elapsed: number;
  freezeTime?: number;
  explodeRadius?: number;
};
