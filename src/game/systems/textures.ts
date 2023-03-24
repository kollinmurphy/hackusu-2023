export type TextureMap = {
  ground: HTMLImageElement;
  brick: {
    blue: HTMLImageElement;
    green: HTMLImageElement;
    orange: HTMLImageElement;
    yellow: HTMLImageElement;
  };
  mushroom: {
    left: HTMLImageElement;
    middle: HTMLImageElement;
    right: HTMLImageElement;
  };
  ball: HTMLImageElement;
  cloud: {
    single: HTMLImageElement;
    double: HTMLImageElement;
  };
  menu: HTMLImageElement;
  bush: HTMLImageElement;
  mountain: HTMLImageElement;
};

const loadTexture = (src: string): Promise<HTMLImageElement> => {
  const texture = new Image();
  texture.src = src;
  return new Promise((resolve, reject) => {
    texture.onload = () => {
      resolve(texture);
    };
    texture.onerror = () => {
      reject(`Could not load texture ${src}`);
    };
  });
};

export const initializeTextures = async () => {
  const [
    ground,
    blueBrick,
    greenBrick,
    orangeBrick,
    yellowBrick,
    mushroomLeft,
    mushroomMiddle,
    mushroomRight,
    ball,
    cloud1,
    cloud2,
    menu,
    bush,
    mountain,
  ] = await Promise.all(
    [
      "ground.png",
      "brick-blue.png",
      "brick-green.png",
      "brick-orange.png",
      "brick-yellow.png",
      "mushroom-left.png",
      "mushroom-middle.png",
      "mushroom-right.png",
      "ball.png",
      "cloud.png",
      "cloud2.png",
      "menu-blank.png",
      "bush.png",
      "mountain.png",
    ].map((src) => loadTexture(`./assets/img/${src}`))
  ).catch((error) => {
    console.error(error);
    throw new Error("Could not load textures");
  });
  const map: TextureMap = {
    ground,
    brick: {
      blue: blueBrick,
      green: greenBrick,
      orange: orangeBrick,
      yellow: yellowBrick,
    },
    mushroom: {
      left: mushroomLeft,
      middle: mushroomMiddle,
      right: mushroomRight,
    },
    ball,
    cloud: {
      single: cloud1,
      double: cloud2,
    },
    menu,
    bush,
    mountain,
  };
  textures = map;
};

let textures: TextureMap | undefined;

export const Textures = () => textures!;
