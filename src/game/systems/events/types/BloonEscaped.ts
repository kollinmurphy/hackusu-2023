import { BaseEvent } from ".";
import { BloonId } from "../../../types/bloon";

export type BloonEscapedEvent = BaseEvent<"BloonEscaped", { bloonId: BloonId }>;
