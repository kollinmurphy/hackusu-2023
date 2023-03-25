import { Bloon } from "../../types/bloon";
import { Textures } from "../textures";

const bloonWidth = 50;
const bloonHeight = 70;

const FROZEN_ANIMATION_DURATION = 500;

export const renderBloon = (props: {
  bloon: Bloon;
  context: CanvasRenderingContext2D;
}) => {
  const texture = Textures().bloons[props.bloon.type];
  props.context.drawImage(
    texture,
    props.bloon.x - bloonWidth / 2,
    props.bloon.y - bloonHeight / 2,
    bloonWidth,
    bloonHeight
  );

  if (props.bloon.frozen) {
    const texture = Textures().bloons.effects.ice;
    const opacity = Math.min(
      1,
      props.bloon.frozenTime / FROZEN_ANIMATION_DURATION
    );
    props.context.globalAlpha = opacity;
    props.context.drawImage(
      texture,
      props.bloon.x - bloonWidth / 2,
      props.bloon.y - bloonHeight / 2,
      bloonWidth,
      bloonHeight
    );
    props.context.globalAlpha = 1;
  }
};
