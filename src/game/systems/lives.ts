import { BloonType } from "../types/bloon";
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
}: {
  eventSystem: EventSystem;
}) => {
  let lives = 40;

  eventSystem.subscribe<BloonEscapedEvent>({
    type: "BloonEscaped",
    callback: (event) => {
      const l = mapBloonTypeToLives(event.payload.bloon.type);
      lives -= l;
    },
  });

  return {
    getLives: () => lives,
  };
};

export type LivesSystem = ReturnType<typeof createLivesSystem>;
