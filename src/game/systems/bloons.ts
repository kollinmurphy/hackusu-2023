import { Bloon, BloonType, createBloonId } from "../types/bloon";
import { EventSystem } from "./events";
import { BloonCreatedEvent } from "./events/types/BloonCreated";
import { BloonPoppedEvent } from "./events/types/BloonPopped";

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

export const createBloonSystem = ({
  eventSystem,
}: {
  eventSystem: EventSystem;
}) => {
  let nextId = 1;

  const state = {
    bloons: [] as Bloon[],
  };

  eventSystem.subscribe<BloonCreatedEvent>({
    type: "BloonCreated",
    callback: (event) => {
      state.bloons.push(event.payload);
    },
  });

  eventSystem.subscribe<BloonPoppedEvent>({
    type: "BloonPopped",
    callback: (event) => {
      const index = state.bloons.findIndex(
        (bloon) => bloon.id !== event.payload.bloonId
      );
      if (index === -1) return;
      const poppedBloon = state.bloons[index];
      state.bloons = state.bloons.splice(index, 1);
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
          },
        });
      }
    },
  });

  return {
    getBloons: () => state.bloons,
  };
};
