import { BaseEvent } from ".";
import { BloonId } from "../../../types/bloon";

export type BloonPoppedEvent = BaseEvent<"BloonPopped", { bloonId: BloonId }>;