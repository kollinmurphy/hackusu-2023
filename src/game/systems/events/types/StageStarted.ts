import { BaseEvent } from ".";

export type StageStartedEvent = BaseEvent<
  "StageStarted",
  {
    stage: number;
  }
>;
