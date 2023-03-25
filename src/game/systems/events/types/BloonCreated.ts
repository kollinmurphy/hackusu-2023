import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";

export type BloonCreatedEvent = BaseEvent<"BloonCreated", Bloon>;
