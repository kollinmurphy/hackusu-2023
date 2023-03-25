const loadAudio = (filename: string): Promise<HTMLAudioElement> => {
  const element = document.createElement("audio");
  element.src = `./assets/sounds/${filename}`;
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
  | "bounce"
  | "explode0"
  | "explode1"
  | "pop0"
  | "pop1"
  | "pop2"
  | "pop3";

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
  const [bounce, explode0, explode1, pop0, pop1, pop2, pop3] =
    await Promise.all([
      loadAudio("bounce.mp3"),
      loadAudio("explode0.mp3"),
      loadAudio("explode1.mp3"),
      loadAudio("pop0.mp3"),
      loadAudio("pop1.mp3"),
      loadAudio("pop2.mp3"),
      loadAudio("pop3.mp3"),
    ]);
  const map: Map<AudioKey, HTMLAudioElement> = new Map([
    ["bounce", bounce],
    ["explode0", explode0],
    ["explode1", explode1],
    ["pop0", pop0],
    ["pop1", pop1],
    ["pop2", pop2],
    ["pop3", pop3],
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
