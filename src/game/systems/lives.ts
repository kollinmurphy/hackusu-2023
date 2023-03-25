import { BloonType } from "../types/bloon";
import { BloonSystem } from "./bloons";
import { EventSystem } from "./events";
import { BloonEscapedEvent } from "./events/types/BloonEscaped";

const mapBloonTypeToLives = (type: BloonType) => {
  switch (type) {
    case "red":
      return 1;
    case "blue":
      return 2;
    case "green":
      return 3;
    case "yellow":
      return 4;
    case "white":
    case "black":
      return 11;
  }
};

export const createLivesSystem = ({
  eventSystem,
  bloonSystem,
}: {
  eventSystem: EventSystem;
  bloonSystem: BloonSystem;
}) => {
  let lives = 40;

  eventSystem.subscribe<BloonEscapedEvent>({
    type: "BloonEscaped",
    callback: (event) => {
      const bloon = bloonSystem.getBloon(event.payload.bloonId);
      if (!bloon) {
        lives -= 1;
        return;
      }
      lives -= mapBloonTypeToLives(bloon.type);
    },
  });

  return {
    getLives: () => lives,
  };
};

export type LivesSystem = ReturnType<typeof createLivesSystem>;
