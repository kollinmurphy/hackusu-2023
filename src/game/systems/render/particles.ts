import { ParticleSystem } from "../particles";
import { Textures } from "../textures";

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
  }
};
