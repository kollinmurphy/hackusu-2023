import { BloonCreatedEvent } from "./BloonCreated";
import { BloonPoppedEvent } from "./BloonPopped";
import { StageClearedEvent } from "./StageCleared";

export type BaseEvent<
  Type extends string,
  Payload extends Record<string, any>
> = {
  type: Type;
  payload: Payload;
};

export type BTDEvent = BloonCreatedEvent | BloonPoppedEvent | StageClearedEvent;

export type EventCallbackEntry = {
  id: EventCallbackId;
  callback: (event: BTDEvent) => void;
};

export type EventCallbackId = number & { __callbackId: void };
