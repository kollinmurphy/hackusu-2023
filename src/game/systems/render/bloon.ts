import { Bloon } from "../../types/bloon";
import { Textures } from "../textures";

const bloonWidth = 50;
const bloonHeight = 70;

export const renderBloon = (props: {
  bloon: Bloon;
  context: CanvasRenderingContext2D;
}) => {
  const texture = Textures().bloons[props.bloon.type];
  props.context.drawImage(
    texture,
    props.bloon.x,
    props.bloon.y,
    bloonWidth,
    bloonHeight
  );
};