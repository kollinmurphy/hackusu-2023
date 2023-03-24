import { getFromStorage, saveToStorage } from "../localStorage";

export type MouseCallbackId = number & { __mouseCallbackId: void };

type MouseEvent = "hover-in" | "hover-out" | "click";

type MouseMapEntry = {
  key: MouseCallbackId;
  type: MouseEvent;
  callback: () => void;
};

const createCallbackId = (num: number) => num as MouseCallbackId;

export const createMouseManager = () => {
  const hoverInCallbacks = new Map<HTMLElement, MouseMapEntry[]>();

  const keydownKeys = new Set<Key>();
  const repeatKeys = new Set<Key>();
  const keyupKeys = new Set<Key>();

  let nextId = 1;

  const keydownListener = (event: KeyboardEvent) => {
    if (event.repeat) return;
    const key = mapKey(event.key, keyMapping);
    if (!key) return;
    keydownKeys.add(key);
  };

  const keyupListener = (event: KeyboardEvent) => {
    const key = mapKey(event.key, keyMapping);
    if (!key) return;
    keydownKeys.delete(key);
    repeatKeys.delete(key);
    keyupKeys.add(key);
  };

  window.addEventListener("keydown", keydownListener);
  window.addEventListener("keyup", keyupListener);

  return {
    update: () => {
      const downKeysArray = [...keydownKeys.keys()];
      for (let i = 0; i < downKeysArray.length; i++) {
        const key = downKeysArray[i];
        const callbacks = mouseCallbacks.get(key) || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type !== "keyup") callbacks[j].callback();
        keydownKeys.delete(key);
        repeatKeys.add(key);
      }

      const releasedKeysArray = [...keyupKeys.keys()];
      for (let i = 0; i < releasedKeysArray.length; i++) {
        const key = releasedKeysArray[i];
        const callbacks = mouseCallbacks.get(key) || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type === "keyup") callbacks[j].callback();
        repeatKeys.delete(key);
        keyupKeys.delete(key);
      }

      const repeatKeysArray = [...repeatKeys.keys()];
      for (let i = 0; i < repeatKeysArray.length; i++) {
        const key = repeatKeysArray[i];
        const callbacks = mouseCallbacks.get(key) || [];
        for (let j = 0; j < callbacks.length; j++)
          if (callbacks[j].type === "repeat") callbacks[j].callback();
      }
    },
    subscribe: ({
      key,
      type,
      callback,
    }: {
      key: Key;
      type: KeyMapEntry["type"];
      callback: () => void;
    }) => {
      const id = createCallbackId(nextId++);
      const currentCallbacks = mouseCallbacks.get(key) || [];
      mouseCallbacks.set(key, [...currentCallbacks, { key: id, type, callback }]);
      return id;
    },
    unsubscribe: (key: Key, id: number) => {
      const currentCallbacks = mouseCallbacks.get(key) || [];
      mouseCallbacks.set(
        key,
        currentCallbacks.filter((entry) => entry.key !== id)
      );
    },
    dispose: () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("keyup", keyupListener);
    },
  };
};
