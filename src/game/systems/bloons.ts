import { Bloon, BloonType, createBloonId } from "../types/bloon";
import { EventSystem } from "./events";
import { BloonCreatedEvent } from "./events/types/BloonCreated";
import { BloonEscapedEvent } from "./events/types/BloonEscaped";
import { BloonHitEvent } from "./events/types/BloonHit";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { StageStartedEvent } from "./events/types/StageStarted";
import { PathSystem } from "./paths";

const getBloonChildren = (type: BloonType): BloonType[] => {
  switch (type) {
    case "red":
      return [];
    case "blue":
      return ["red"];
    case "green":
      return ["blue"];
    case "yellow":
      return ["green"];
    case "white":
    case "black":
      return ["yellow", "yellow"];
  }
};

// const SPEED_FACTOR = 0.12;
const SPEED_FACTOR = 0.3;

const getBloonSpeed = (bloon: Bloon) => {
  if (bloon.frozen) return 0;
  switch (bloon.type) {
    case "red":
      return 1;
    case "blue":
      return 1.5;
    case "green":
      return 1.7;
    case "yellow":
      return 3;
    case "white":
    case "black":
      return 1.5;
  }
};

export const createBloonSystem = ({
  eventSystem,
  pathSystem,
}: {
  eventSystem: EventSystem;
  pathSystem: PathSystem;
}) => {
  let nextId = 1;

  const state = {
    bloons: [] as Bloon[],
    roundTime: 0,
    round: 0,
    active: false,
  };

  eventSystem.subscribe<StageStartedEvent>({
    type: "StageStarted",
    callback: (event) => {
      state.active = true;
      state.round = event.payload.stage;
      state.roundTime = 0;
    },
  });

  eventSystem.subscribe<BloonHitEvent>({
    type: "BloonHit",
    callback: (event) => {
      const index = state.bloons.findIndex(
        (bloon) => bloon.id !== event.payload.bloonId
      );
      if (index === -1) return;
      const poppedBloon = state.bloons[index];
      state.bloons = state.bloons.splice(index, 1);

      if (state.bloons.length === 0) {
        state.active = false;
      }

      eventSystem.publish<BloonPoppedEvent>({
        type: "BloonPopped",
        payload: {
          bloonId: poppedBloon.id,
        },
      });

      if (poppedBloon.type === "red") return;
      const children = getBloonChildren(poppedBloon.type);
      for (const child of children) {
        eventSystem.publish<BloonCreatedEvent>({
          type: "BloonCreated",
          payload: {
            id: createBloonId(nextId++),
            type: child,
            frozen: false,
            frozenTime: 0,
            frozenDuration: 0,
            distance: poppedBloon.distance,
            x: 0,
            y: 0,
            escaped: false,
          },
        });
      }
    },
  });

  return {
    getBloons: () => state.bloons,
    update: (deltaTime: number) => {
      if (!state.active) return;
      
      state.roundTime += deltaTime;
      if (state.roundTime > 1000) {
        state.roundTime -= 1000;
        const bloon: Bloon = {
          id: createBloonId(nextId++),
          type: "red",
          frozen: false,
          frozenTime: 0,
          frozenDuration: 0,
          distance: 0,
          x: 0,
          y: 0,
          escaped: false,
        };
        state.bloons.push(bloon);
        eventSystem.publish<BloonCreatedEvent>({
          type: "BloonCreated",
          payload: bloon,
        });
      }

      for (const bloon of state.bloons) {
        bloon.distance += getBloonSpeed(bloon) * deltaTime * SPEED_FACTOR;
        const coordinates = pathSystem.computePoint(bloon.distance);
        bloon.x = coordinates.x;
        bloon.y = coordinates.y;
        bloon.escaped = coordinates.completed;
      }

      const { bloons, escaped } = state.bloons.reduce<{
        bloons: Bloon[];
        escaped: Bloon[];
      }>(
        (acc, bloon) => {
          if (bloon.escaped) acc.escaped.push(bloon);
          else acc.bloons.push(bloon);
          return acc;
        },
        { bloons: [], escaped: [] }
      );

      state.bloons = bloons;
      for (const bloon of escaped) {
        eventSystem.publish<BloonEscapedEvent>({
          type: "BloonEscaped",
          payload: {
            bloonId: bloon.id,
          },
        });
      }
    },
  };
};

export type BloonSystem = ReturnType<typeof createBloonSystem>;
