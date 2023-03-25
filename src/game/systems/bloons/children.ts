import { BloonType } from "../../types/bloon";

export const getBloonChildren = (type: BloonType): BloonType[] => {
  switch (type) {
    case "red":
      return [];
    case "blue":
      return ["red"];
    case "green":
      return ["blue"];
    case "yellow":
      return ["green"];
    case "white":
    case "black":
      return ["yellow", "yellow"];
  }
};
