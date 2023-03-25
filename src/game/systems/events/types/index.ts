import { BloonCreatedEvent } from "./BloonCreated";
import { BloonEscapedEvent } from "./BloonEscaped";
import { BloonHitEvent } from "./BloonHit";
import { BloonPoppedEvent } from "./BloonPopped";
import { ExplosionCreatedEvent } from "./ExplosionCreated";
import { StageClearedEvent } from "./StageCleared";
import { StageStartedEvent } from "./StageStarted";
import { TowerFired } from "./TowerFired";
import { TowerPlacedEvent } from "./TowerPlaced";
import { TowerSelectedEvent } from "./TowerSelected";

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
  | BloonHitEvent
  | TowerPlacedEvent
  | TowerSelectedEvent
  | TowerFired
  | ExplosionCreatedEvent;

export type EventCallbackEntry = {
  id: EventCallbackId;
  callback: (event: BTDEvent) => void;
};

export type EventCallbackId = number & { __callbackId: void };
