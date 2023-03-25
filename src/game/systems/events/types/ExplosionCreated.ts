import { BaseEvent } from ".";

export type ExplosionCreatedEvent = BaseEvent<
  "ExplosionCreated",
  { position: { x: number; y: number }; radius: number }
>;
