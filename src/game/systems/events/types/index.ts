import { BloonCreatedEvent } from "./BloonCreated";
import { BloonEscapedEvent } from "./BloonEscaped";
import { BloonHitEvent } from "./BloonHit";
import { BloonPoppedEvent } from "./BloonPopped";
import { StageClearedEvent } from "./StageCleared";
import { StageStartedEvent } from "./StageStarted";

export type BaseEvent<
  Type extends string,
  Payload extends Record<string, any>
> = {
  type: Type;
  payload: Payload;
};

export type BTDEvent =
  | BloonCreatedEvent
  | BloonPoppedEvent
  | StageClearedEvent
  | StageStartedEvent
  | BloonEscapedEvent
  | BloonHitEvent;

export type EventCallbackEntry = {
  id: EventCallbackId;
  callback: (event: BTDEvent) => void;
};

export type EventCallbackId = number & { __callbackId: void };
