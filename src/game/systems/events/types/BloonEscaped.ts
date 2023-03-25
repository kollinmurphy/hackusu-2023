import { BaseEvent } from ".";
import { Bloon } from "../../../types/bloon";

export type BloonEscapedEvent = BaseEvent<"BloonEscaped", { bloon: Bloon }>;
