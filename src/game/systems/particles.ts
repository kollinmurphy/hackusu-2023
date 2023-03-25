import { EventSystem } from "./events";
import { BloonPoppedEvent } from "./events/types/BloonPopped";
import { ExplosionCreatedEvent } from "./events/types/ExplosionCreated";

export type Particle = {
  type: "pop" | "explosion";
  elapsedTime: number;
  lifetime: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export const createParticleSystem = ({
  eventSystem,
}: {
  eventSystem: EventSystem;
}) => {
  let particles: Particle[] = [];

  eventSystem.subscribe<BloonPoppedEvent>({
    type: "BloonPopped",
    callback: (event) => {
      if (!event.payload.effect) return;
      const { bloon } = event.payload;
      const particle: Particle = {
        type: "pop",
        elapsedTime: 0,
        lifetime: 80,
        x: bloon.x,
        y: bloon.y,
        width: 78,
        height: 78,
        rotation: Math.random() * Math.PI * 2,
      };
      particles.push(particle);
    },
  });

  eventSystem.subscribe<ExplosionCreatedEvent>({
    type: "ExplosionCreated",
    callback: (event) => {
      const particle: Particle = {
        type: "explosion",
        elapsedTime: 0,
        lifetime: 100,
        x: event.payload.position.x,
        y: event.payload.position.y,
        width: event.payload.radius,
        height: event.payload.radius,
        rotation: 0,
      };
      particles.push(particle);
    },
  });

  return {
    update: (deltaTime: number) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.elapsedTime += deltaTime;
      }
      particles = particles.filter((p) => p.elapsedTime < p.lifetime);
    },
    getParticles: () => particles,
  };
};

export type ParticleSystem = ReturnType<typeof createParticleSystem>;
