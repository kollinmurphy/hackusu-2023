import { createOriginalPath } from "./original";

export const createPathSystem = ({ type }: { type: "original" }) => {
  switch (type) {
    case "original":
      return createOriginalPath();
  }
};

export type PathSystem = ReturnType<typeof createPathSystem>;
