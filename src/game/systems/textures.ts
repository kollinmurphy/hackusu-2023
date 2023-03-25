import { BloonType } from "../types/bloon";

export type TextureMap = {
  bloons: Record<BloonType, HTMLImageElement> & {
    effects: {
      ice: HTMLImageElement;
    };
  };
  projectiles: {
    bomb: HTMLImageElement;
    dart: HTMLImageElement;
    iceRing: HTMLImageElement;
    tack: HTMLImageElement;
  };
  effects: {
    pop: HTMLImageElement;
    explosion: [
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement,
      HTMLImageElement
    ];
  };
  map: {
    grass: HTMLImageElement;
    overlay: HTMLImageElement;
    pathBackground: HTMLImageElement;
    tile: HTMLImageElement;
  };
  menu: {
    bloons: HTMLImageElement;
    tower: HTMLImageElement;
    defense: HTMLImageElement;
  };
  text: {
    congratulations: HTMLImageElement;
    gameOver: HTMLImageElement;
    playAgain: [HTMLImageElement, HTMLImageElement];
    tryAgain: [HTMLImageElement, HTMLImageElement];
  };
  towers: {
    bomb: {
      base: HTMLImageElement;
      barrel: HTMLImageElement;
    };
    dartMonkey: {
      base: HTMLImageElement;
    };
    ice: {
      border: HTMLImageElement;
      orb: HTMLImageElement;
      snowflake: HTMLImageElement;
    };
    superMonkey: {
      base: HTMLImageElement;
    };
    tack: {
      orb: HTMLImageElement;
      orb2: HTMLImageElement;
      base: HTMLImageElement;
      tack: HTMLImageElement;
    };
  };
  shop: {
    bombTower: HTMLImageElement;
    dartMonkey: HTMLImageElement;
    iceTower: HTMLImageElement;
    tackTower: HTMLImageElement;
    superMonkey: HTMLImageElement;
  };
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
    red,
    blue,
    green,
    yellow,
    black,
    white,
    bloonIce,
    projectileBomb,
    projectileDart,
    projectileIceRing,
    projectileTack,
    effectPop,
    explosion0,
    explosion1,
    explosion2,
    explosion3,
    explosion4,
    explosion5,
    explosion6,
    explosion7,
    explosion8,
    explosion9,
    explosion10,
    explosion11,
    explosion12,
    explosion13,
    explosion14,
    mapGrass,
    mapOverlay,
    mapPathBackground,
    mapTile,
    menuBloons,
    menuTower,
    menuDefense,
    textCongratulations,
    textGameOver,
    textPlayAgain0,
    textPlayAgain1,
    textTryAgain0,
    textTryAgain1,
    towerBombBase,
    towerBombBarrel,
    towerDartMonkey,
    towerIceBorder,
    towerIceOrb,
    towerIceSnowflake,
    towerSuperMonkey,
    towerTackOrb,
    towerTackBase,
    towerTack,
    shopBombTower,
    shopDartMonkey,
    shopIceTower,
    shopSuperMonkey,
    shopTackTower,
    towerTackOrb2,
  ] = await Promise.all(
    [
      "bloons/red.svg",
      "bloons/blue.svg",
      "bloons/green.svg",
      "bloons/yellow.svg",
      "bloons/black.svg",
      "bloons/white.svg",
      "bloons/ice.svg",
      "projectiles/bomb.svg",
      "projectiles/dart.svg",
      "projectiles/ice-ring.svg",
      "projectiles/tack2.svg",
      "effects/pop.svg",
      "effects/explosion/explosion0.svg",
      "effects/explosion/explosion1.svg",
      "effects/explosion/explosion2.svg",
      "effects/explosion/explosion3.svg",
      "effects/explosion/explosion4.svg",
      "effects/explosion/explosion5.svg",
      "effects/explosion/explosion6.svg",
      "effects/explosion/explosion7.svg",
      "effects/explosion/explosion8.svg",
      "effects/explosion/explosion9.svg",
      "effects/explosion/explosion10.svg",
      "effects/explosion/explosion11.svg",
      "effects/explosion/explosion12.svg",
      "effects/explosion/explosion13.svg",
      "effects/explosion/explosion14.svg",
      "map/grass.svg",
      "map/overlay.svg",
      "map/path-background.svg",
      "map/tile.svg",
      "menu/bloons.svg",
      "menu/tower.svg",
      "menu/defense.svg",
      "text/congratulations.svg",
      "text/game-over.svg",
      "text/play-again0.svg",
      "text/play-again1.svg",
      "text/try-again0.svg",
      "text/try-again1.svg",
      "towers/bomb-base.svg",
      "towers/bomb-barrel.svg",
      "towers/dart-monkey-base.svg",
      "towers/ice-border.svg",
      "towers/ice-orb.svg",
      "towers/ice-snowflake.svg",
      "towers/super-monkey-base.svg",
      "towers/tack-orb.svg",
      "towers/tack-base.svg",
      "towers/tack.svg",
      "shop/bomb-tower.svg",
      "shop/dart-monkey.svg",
      "shop/ice-tower.svg",
      "shop/super-monkey.svg",
      "shop/tack-shooter.svg",
      "towers/tack-orb2.svg",
    ].map((src) => loadTexture(`./assets/${src}`))
  ).catch((error) => {
    console.error(error);
    throw new Error("Could not load textures");
  });
  const map: TextureMap = {
    bloons: {
      red,
      blue,
      green,
      yellow,
      black,
      white,
      effects: {
        ice: bloonIce,
      },
    },
    projectiles: {
      bomb: projectileBomb,
      dart: projectileDart,
      iceRing: projectileIceRing,
      tack: projectileTack,
    },
    effects: {
      pop: effectPop,
      explosion: [
        explosion0,
        explosion1,
        explosion2,
        explosion3,
        explosion4,
        explosion5,
        explosion6,
        explosion7,
        explosion8,
        explosion9,
        explosion10,
        explosion11,
        explosion12,
        explosion13,
        explosion14,
      ],
    },
    map: {
      grass: mapGrass,
      overlay: mapOverlay,
      pathBackground: mapPathBackground,
      tile: mapTile,
    },
    menu: {
      bloons: menuBloons,
      tower: menuTower,
      defense: menuDefense,
    },
    text: {
      congratulations: textCongratulations,
      gameOver: textGameOver,
      playAgain: [textPlayAgain0, textPlayAgain1],
      tryAgain: [textTryAgain0, textTryAgain1],
    },
    towers: {
      bomb: {
        base: towerBombBase,
        barrel: towerBombBarrel,
      },
      dartMonkey: {
        base: towerDartMonkey,
      },
      ice: {
        border: towerIceBorder,
        orb: towerIceOrb,
        snowflake: towerIceSnowflake,
      },
      superMonkey: {
        base: towerSuperMonkey,
      },
      tack: {
        base: towerTackBase,
        orb: towerTackOrb,
        tack: towerTack,
        orb2: towerTackOrb2,
      },
    },
    shop: {
      bombTower: shopBombTower,
      dartMonkey: shopDartMonkey,
      iceTower: shopIceTower,
      superMonkey: shopSuperMonkey,
      tackTower: shopTackTower,
    },
  };
  textures = map;
};

let textures: TextureMap | undefined;

export const Textures = () => textures!;
