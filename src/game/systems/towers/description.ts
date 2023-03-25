import { TowerType } from "../../types/Tower";

export const getTowerDescription = (type: TowerType) => {
  switch (type) {
    case "dartMonkey":
      return "Shoots a single dart. Can upgrade to piercing darts and long range darts.";
    case "tack":
      return "Shoots volleys of tacks in 8 directions. Can upgrade its shoot speed and its range.";
    case "bomb":
      return "Launches a bomb that explodes on impact. Can upgrade to bigger bombs and longer range.";
    case "ice":
      return "Freezes nearby bloons. Frozen bloons are immune to darts and tacks, but bombs will destroy them. Can upgrade to increased freeze time and larger freeze radius.";
    case "superMonkey":
      return "Super monkey shoots a continuous stream of darts and can mow down even the fastest and most stubborn bloons.";
  }
};
