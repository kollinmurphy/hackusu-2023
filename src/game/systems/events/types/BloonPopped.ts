import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";

export type BloonPoppedEvent = BaseEvent<"BloonPopped", { bloon: Bloon }>;
