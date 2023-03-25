import { Bloon, BloonId, BloonType, createBloonId } from "../../types/bloon";
import { EventSystem } from "../events";
import { BloonCreatedEvent } from "../events/types/BloonCreated";
import { BloonEscapedEvent } from "../events/types/BloonEscaped";
import { BloonHitEvent } from "../events/types/BloonHit";
import { BloonPoppedEvent } from "../events/types/BloonPopped";
import { ExplosionCreatedEvent } from "../events/types/ExplosionCreated";
import { StageStartedEvent } from "../events/types/StageStarted";
import { PathSystem } from "../paths";
import { getBloonChildren } from "./children";
import rounds from "./rounds.json";
import { getBloonSpeed } from "./speed";

const getNextBloon = (
  stage: number,
  bloonsCreated: number,
  id: BloonId
): Bloon | null => {
  const round = rounds.rounds[stage - 1].bloons;
  let past = 0;
  for (const bloon of round) {
    if (bloon.count + past > bloonsCreated) {
      return {
        type: bloon.type as BloonType,
        id,
        x: 0,
        y: 0,
        distance: 0,
        frozen: false,
        escaped: false,
        frozenDuration: 0,
        frozenTime: 0,
      };
    }
    past += bloon.count;
  }
  return null;
};

const BLOON_INTERVAL = 250;

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
    bloonTime: 0,
    bloonsCreated: 0,
    finishedSpawning: false,
    round: 0,
    active: false,
  };

  eventSystem.subscribe<StageStartedEvent>({
    type: "StageStarted",
    callback: (event) => {
      state.active = true;
      state.round = event.payload.stage;
      state.bloonTime = 0;
      state.bloonsCreated = 0;
      state.finishedSpawning = false;
    },
  });

  eventSystem.subscribe<BloonHitEvent>({
    type: "BloonHit",
    callback: (event) => {
      const index = state.bloons.findIndex(
        (bloon) => bloon.id === event.payload.bloon.id
      );
      if (index === -1) return;
      const poppedBloon = state.bloons[index];
      state.bloons = [
        ...state.bloons.slice(0, index),
        ...state.bloons.slice(index + 1),
      ];

      eventSystem.publish<BloonPoppedEvent>({
        type: "BloonPopped",
        payload: {
          bloon: poppedBloon,
          effect: event.payload.projectile.type !== "bomb",
        },
      });

      if (event.payload.projectile.type === "bomb") {
        eventSystem.publish<ExplosionCreatedEvent>({
          type: "ExplosionCreated",
          payload: {
            position: {
              x: event.payload.bloon.x,
              y: event.payload.bloon.y,
            },
            radius: 200,
          },
        });
        const nearbyBloons = state.bloons
          .filter((bloon) => {
            return (
              Math.sqrt(
                Math.pow(bloon.x - poppedBloon.x, 2) +
                  Math.pow(bloon.y - poppedBloon.y, 2)
              ) < 100
            );
          })
          .filter((bloon) => bloon.type !== "black");
        for (const bloon of nearbyBloons) {
          const index = state.bloons.findIndex((b) => b.id === bloon.id);
          if (index === -1) continue;
          state.bloons = [
            ...state.bloons.slice(0, index),
            ...state.bloons.slice(index + 1),
          ];
          eventSystem.publish<BloonPoppedEvent>({
            type: "BloonPopped",
            payload: {
              bloon,
              effect: false,
            },
          });
        }
      }

      if (state.bloons.length === 0 && state.finishedSpawning === true)
        state.active = false;

      if (poppedBloon.type === "red") return;
      const children = getBloonChildren(poppedBloon.type);
      for (const child of children) {
        const childBloon: Bloon = {
          id: createBloonId(nextId++),
          type: child,
          frozen: false,
          frozenTime: 0,
          frozenDuration: 0,
          distance: poppedBloon.distance,
          x: poppedBloon.x,
          y: poppedBloon.y,
          escaped: false,
        };
        state.bloons.push(childBloon);
        eventSystem.publish<BloonCreatedEvent>({
          type: "BloonCreated",
          payload: childBloon,
        });
      }
    },
  });

  return {
    getLastBloonInRadius: ({
      x,
      y,
      radius,
    }: {
      x: number;
      y: number;
      radius: number;
    }): Bloon | null => {
      for (let i = state.bloons.length - 1; i >= 0; i--) {
        const bloon = state.bloons[i];
        const dx = bloon.x - x;
        const dy = bloon.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius) return bloon;
      }
      return null;
    },
    getBloons: () => state.bloons,
    isComplete: () => state.bloons.length === 0 && state.finishedSpawning,
    getBloon: (id: BloonId) => {
      return state.bloons.find((bloon) => bloon.id === id);
    },
    update: (deltaTime: number) => {
      if (!state.active) return;

      state.bloonTime += deltaTime;
      if (state.bloonTime > BLOON_INTERVAL) {
        const next = getNextBloon(
          state.round,
          state.bloonsCreated,
          createBloonId(nextId++)
        );
        if (next) {
          state.bloonTime -= BLOON_INTERVAL;
          state.bloons.push(next);
          state.bloonsCreated++;
          eventSystem.publish<BloonCreatedEvent>({
            type: "BloonCreated",
            payload: next,
          });
        } else {
          state.bloonTime = -Infinity;
          state.finishedSpawning = true;
        }
      }

      for (const bloon of state.bloons) {
        if (bloon.frozen) {
          bloon.frozenTime += deltaTime;
          if (bloon.frozenTime > bloon.frozenDuration) {
            bloon.frozen = false;
          } else {
            continue;
          }
        }
        bloon.distance += getBloonSpeed(bloon) * deltaTime;
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

      state.bloons = bloons.sort((a, b) => a.distance - b.distance);
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
