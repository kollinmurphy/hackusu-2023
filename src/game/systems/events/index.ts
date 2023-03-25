import { EventCallbackEntry, EventCallbackId, BTDEvent } from "./types";

const createCallbackId = (num: number) => num as EventCallbackId;

export const createEventSystem = () => {
  let nextId = 1;
  const subscriptions = new Map<BTDEvent["type"], EventCallbackEntry[]>();

  return {
    subscribe: <EventType extends BTDEvent>(subscribeOptions: {
      type: EventType["type"];
      callback: (event: EventType) => void;
    }) => {
      const id = createCallbackId(nextId++);

      subscriptions.set(subscribeOptions.type, [
        ...(subscriptions.get(subscribeOptions.type) || []),
        {
          id,
          callback: subscribeOptions.callback as EventCallbackEntry['callback'],
        },
      ]);
      return id;
    },
    unsubscribe: (unsubscribeOptions: {
      type: BTDEvent["type"];
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
    publish: <EventType extends BTDEvent>(event: EventType) => {
      const currentSubscriptions = subscriptions.get(event.type);
      if (!currentSubscriptions) return;
      currentSubscriptions.forEach((subscription) =>
        subscription.callback(event)
      );
    },
  };
};

export type EventSystem = ReturnType<typeof createEventSystem>;
