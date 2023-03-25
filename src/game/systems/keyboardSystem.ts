export type KeyboardCallbackId = number & { __keyboardCallbackId: void };

type KeyMapEntry = {
  key: KeyboardCallbackId;
  type: "keydown";
  callback: () => void;
};

const createCallbackId = (num: number) => num as KeyboardCallbackId;

type Key = "exit";

const mapKey = (key: string): Key | null => {
  switch (key) {
    case "Escape":
      return "exit";
    default:
      return null;
  }
};

export const createKeyboardSystem = () => {
  const keyCallbacks = new Map<Key, KeyMapEntry[]>();

  const keydownKeys = new Set<Key>();

  let nextId = 1;

  const keydownListener = (event: KeyboardEvent) => {
    if (event.repeat) return;
    const key = mapKey(event.key);
    if (!key) return;
    keydownKeys.add(key);
  };

  window.addEventListener("keydown", keydownListener);

  return {
    update: () => {
      const downKeysArray = [...keydownKeys.keys()];
      for (let i = 0; i < downKeysArray.length; i++) {
        const key = downKeysArray[i];
        const callbacks = keyCallbacks.get(key) || [];
        for (let j = 0; j < callbacks.length; j++) callbacks[j].callback();
        keydownKeys.delete(key);
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
      const currentCallbacks = keyCallbacks.get(key) || [];
      keyCallbacks.set(key, [...currentCallbacks, { key: id, type, callback }]);
      return id;
    },
    unsubscribe: (key: Key, id: number) => {
      const currentCallbacks = keyCallbacks.get(key) || [];
      keyCallbacks.set(
        key,
        currentCallbacks.filter((entry) => entry.key !== id)
      );
    },
    dispose: () => {
      window.removeEventListener("keydown", keydownListener);
    },
  };
};

export type KeyboardSystem = ReturnType<typeof createKeyboardSystem>;
