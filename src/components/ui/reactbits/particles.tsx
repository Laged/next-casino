'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ParticlesProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  size?: { min: number; max: number };
  opacity?: { min: number; max: number };
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeDirection: 1 | -1;
}

/**
 * Canvas-based floating particles effect
 * Creates casino atmosphere with floating golden particles
 * Only renders on client (ssr: false)
 */
export function Particles({
  className,
  count = 50,
  color = '#fbbf24',
  speed = 0.3,
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.5 },
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const width = () => canvas.width / (window.devicePixelRatio || 1);
    const height = () => canvas.height / (window.devicePixelRatio || 1);

    // Initialize particles
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width(),
      y: Math.random() * height(),
      size: Math.random() * (size.max - size.min) + size.min,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed - speed * 0.2, // Slight upward bias
      opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 251, g: 191, b: 36 };
    };

    const rgb = hexToRgb(color);

    const animate = () => {
      ctx.clearRect(0, 0, width(), height());

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update opacity (twinkle effect)
        particle.opacity += 0.005 * particle.fadeDirection;
        if (particle.opacity >= opacity.max || particle.opacity <= opacity.min) {
          particle.fadeDirection *= -1;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = width();
        if (particle.x > width()) particle.x = 0;
        if (particle.y < 0) particle.y = height();
        if (particle.y > height()) particle.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`;
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, color, speed, size, opacity, reducedMotion]);

  // No particles for reduced motion
  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
    />
  );
}

export default Particles;
