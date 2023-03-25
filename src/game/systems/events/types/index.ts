import { BloonCreatedEvent } from "./BloonCreated";
import { BloonPoppedEvent } from "./BloonPopped";

export type BaseEvent<
  Type extends string,
  Payload extends Record<string, any>
> = {
  type: Type;
  payload: Payload;
};

export type BTDEvent = BloonCreatedEvent | BloonPoppedEvent

export type EventCallbackEntry = {
  id: EventCallbackId;
  callback: (event: BTDEvent) => void;
};

export type EventCallbackId = number & { __callbackId: void };
