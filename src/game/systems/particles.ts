import { Brick } from "../views/gameplay/views/brick";

export type Particle = {
  type: "fragment" | "coin";
  elapsedTime: number;
  lifetime: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: Brick['color'];
  direction: {
    x: number;
    y: number;
  };
};

type EffectType = "brick-destroy";
type EffectOptions = {
  type: EffectType;
  x: number;
  y: number;
  color: Brick['color'];
  width: number;
  height: number;
};

const mapBrickColorToRgb = (color: Brick['color']) => {
  switch (color) {
    case 'green':
      return { r: 0, g: 155, b: 33 };
    case 'blue':
      return { r: 0, g: 193, b: 221 };
    case 'orange':
      return { r: 252, g: 152, b: 56 };
    case 'yellow':
      return { r: 223, g: 207, b: 0 };
    default:
      return { r: 0, g: 0, b: 0 };
  }
};

const mapBrickColorToStrokeRgb = (color: Brick['color']) => {
  switch (color) {
    case 'green':
      return { r: 0, g: 100, b: 22 };
    case 'blue':
      return { r: 0, g: 130, b: 150 };
    case 'orange':
      return { r: 170, g: 100, b: 40 };
    case 'yellow':
      return { r: 150, g: 140, b: 0 };
    default:
      return { r: 0, g: 0, b: 0 };
  }
};

export type ParticleSystem = {
  update: (deltaTime: number) => void;
  addEffect: (options: EffectOptions) => void;
  render: (context: CanvasRenderingContext2D) => void;
};

export const createParticleSystem = () => {
  let particles: Particle[] = [];

  const handleBrickDestroy = (options: EffectOptions) => {
    const { x, y, width } = options;
    const particleCount = 200;
    const particlesPerRow = Math.floor(Math.sqrt(particleCount));
    for (let i = 0; i < particlesPerRow; i++) {
      for (let j = 0; j < particlesPerRow; j++) {
        const particleSize = width / particlesPerRow;
        const particleSpeed = Math.random() * 0.15;
        const particleLifetime = Math.random() * 200 + 150;
        const particleDirection = Math.random() * Math.PI * 2;
        const particleDirectionX = Math.cos(particleDirection);
        const particleDirectionY = Math.sin(particleDirection);
        const particle: Particle = {
          type: "fragment",
          elapsedTime: 0,
          lifetime: particleLifetime,
          color: options.color,
          x: x + i * particleSize,
          y: y + j * particleSize,
          size: particleSize * (Math.random() + 1),
          speed: particleSpeed,
          direction: {
            x: particleDirectionX,
            y: particleDirectionY,
          },
        };
        particles.push(particle);
      }
    }
  }

  return {
    update: (deltaTime: number) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.direction.x * particle.speed * deltaTime;
        particle.y += particle.direction.y * particle.speed * deltaTime;
        particle.elapsedTime += deltaTime;
      }
      particles = particles.filter((p) => p.elapsedTime < p.lifetime);
    },
    render: (context: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const percentLifetime = particle.elapsedTime / particle.lifetime;
        const color = mapBrickColorToRgb(particle.color);
        context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1 - percentLifetime})`;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
        const strokeColor = mapBrickColorToStrokeRgb(particle.color);
        context.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${1 - percentLifetime})`;
        context.strokeRect(particle.x, particle.y, particle.size, particle.size);
      }
    },
    addEffect: (options: EffectOptions) => {
      switch (options.type) {
        case "brick-destroy": {
          handleBrickDestroy(options);
          break;
        }
      }
    },
  };
};
