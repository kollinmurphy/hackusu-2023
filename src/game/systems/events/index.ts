import { EventCallbackEntry, EventCallbackId, GalagaEvent } from "./types";

const createCallbackId = (num: number) => num as EventCallbackId;

export const initializeEventSystem = () => {
  let nextId = 1;
  const subscriptions = new Map<GalagaEvent["type"], EventCallbackEntry[]>();

  return {
    subscribe: (subscribeOptions: {
      type: GalagaEvent["type"];
      callback: (event: GalagaEvent) => void;
    }) => {
      const id = createCallbackId(nextId++);
      subscriptions.set(subscribeOptions.type, [
        ...(subscriptions.get(subscribeOptions.type) || []),
        {
          id,
          callback: subscribeOptions.callback,
        },
      ]);
      return id;
    },
    unsubscribe: (unsubscribeOptions: {
      type: GalagaEvent["type"];
      id: EventCallbackId;
    }) => {
      const currentSubscriptions = subscriptions.get(unsubscribeOptions.type);
      if (!currentSubscriptions) return;
      subscriptions.set(
        unsubscribeOptions.type,
        currentSubscriptions.filter(
          (subscription) => subscription.id !== unsubscribeOptions.id
        )
      );
    },
    publish: (event: GalagaEvent) => {
      const currentSubscriptions = subscriptions.get(event.type);
      if (!currentSubscriptions) return;
      currentSubscriptions.forEach((subscription) =>
        subscription.callback(event)
      );
    },
  };
};

export type EventSystem = ReturnType<typeof initializeEventSystem>;
