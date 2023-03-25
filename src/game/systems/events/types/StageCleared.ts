import { BaseEvent } from ".";

export type StageClearedEvent = BaseEvent<
  "StageCleared",
  {
    stage: number;
    message: string;
  }
>;
