import { Particle, ParticleSystem } from "../particles";
import { TextureMap, Textures } from "../textures";

export const renderParticles = ({
  particleSystem,
  context,
}: {
  particleSystem: ParticleSystem;
  context: CanvasRenderingContext2D;
}) => {
  const particles = particleSystem.getParticles();
  const textures = Textures();
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    switch (particle.type) {
      case "pop":
        renderPop({ particle, context, textures });
        break;
      case "explosion":
        renderExplosion({ particle, context, textures });
        break;
    }
  }
};

const renderExplosion = ({
  particle,
  context,
  textures,
}: {
  particle: Particle;
  context: CanvasRenderingContext2D;
  textures: TextureMap;
}) => {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.translate(-particle.x, -particle.y);
  const frame = Math.floor(
    (particle.elapsedTime / particle.lifetime) *
      textures.effects.explosion.length
  );
  context.drawImage(
    textures.effects.explosion[frame],
    particle.x - particle.width / 2,
    particle.y - particle.height / 2,
    particle.width,
    particle.height
  );
  context.restore();
};

const renderPop = ({
  particle,
  context,
  textures,
}: {
  particle: Particle;
  context: CanvasRenderingContext2D;
  textures: TextureMap;
}) => {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.translate(-particle.x, -particle.y);
  context.drawImage(
    textures.effects.pop,
    particle.x - particle.width / 2,
    particle.y - particle.height / 2,
    particle.width,
    particle.height
  );
  context.restore();
};
