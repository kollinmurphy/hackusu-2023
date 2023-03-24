const loadAudio = (filename: string): Promise<HTMLAudioElement> => {
  const element = document.createElement("audio");
  element.src = `./assets/audio/${filename}`;
  element.preload = "auto";
  return new Promise((resolve, reject) => {
    element.oncanplaythrough = () => {
      resolve(element);
    };
    element.onerror = () => {
      reject(`Could not load audio ${filename}`);
    };
  });
};

type AudioKey =
  | "coin"
  | "gameover"
  | "hit"
  | "die"
  | "powerdown"
  | "win"
  | "theme"
  | "powerup"
  | "pause";

type PlayOptions = {
  key: AudioKey;
  loop?: boolean;
  volume?: number;
  stopAll?: boolean;
};

export type AudioApi = {
  play: ({
    key,
    loop,
    volume,
    stopAll,
  }: {
    key: AudioKey;
    loop?: boolean;
    volume?: number;
    stopAll?: boolean;
  }) => Promise<boolean>;
};

export const initializeAudio = async () => {
  const [coin, gameover, hit, die, powerdown, win, theme, powerup, pause] =
    await Promise.all([
      loadAudio("smb_coin.wav"),
      loadAudio("smb_gameover.wav"),
      loadAudio("smb_kick.wav"),
      loadAudio("smb_mariodie.wav"),
      loadAudio("smb_pipe.wav"),
      loadAudio("smb_stage_clear.wav"),
      loadAudio("smb_theme.mp3"),
      loadAudio("smb_powerup.wav"),
      loadAudio("smb_pause.wav"),
    ]);
  const map: Map<AudioKey, HTMLAudioElement> = new Map([
    ["coin", coin],
    ["gameover", gameover],
    ["hit", hit],
    ["die", die],
    ["powerdown", powerdown],
    ["win", win],
    ["theme", theme],
    ["powerup", powerup],
    ["pause", pause],
  ]);

  const api: AudioApi = {
    play: async ({
      key,
      loop = false,
      volume = 0.5,
      stopAll = false,
    }: PlayOptions) => {
      if (stopAll)
        map.forEach((audio, thisKey) => {
          if (thisKey === key) return;
          audio.pause();
          audio.currentTime = 0;
        });
      const audio = map.get(key);
      if (!audio) throw new Error(`Could not find audio ${key}`);
      if (audio.currentTime > 0 && !loop) audio.currentTime = 0;
      audio.loop = loop;
      audio.volume = volume;
      try {
        await audio.play();
        return true;
      } catch (err) {
        return false;
      }
    },
  };
  audio = api;
};

let audio: AudioApi | undefined;

export const Audio = () => audio!;
