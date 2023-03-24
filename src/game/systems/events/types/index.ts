export type BaseEvent<
  Type extends string,
  Payload extends Record<string, any>
> = {
  type: Type;
  payload: Payload;
};

export type BTDEvent = BaseEvent<"TEST", { test: string }>;

export type EventCallbackEntry = {
  id: EventCallbackId;
  callback: (event: BTDEvent) => void;
};

export type EventCallbackId = number & { __callbackId: void };
