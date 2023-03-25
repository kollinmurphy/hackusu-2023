export const getSpeedLabel = (cooldown: number) => {
  cooldown = cooldown / 0.9;
  if (cooldown >= 3000) return "slow";
  if (cooldown >= 1500) return "medium";
  if (cooldown >= 500) return "fast";
  return "hypersonic";
};
