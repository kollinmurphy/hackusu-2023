import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";

export type BloonDestroyedEvent = BaseEvent<"BloonDestroyed", { bloon: Bloon }>;
