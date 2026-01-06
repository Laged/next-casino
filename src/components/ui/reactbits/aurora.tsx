'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
}

/**
 * Canvas-based aurora background effect
 * Creates premium casino atmosphere
 * Only renders on client (ssr: false)
 */
export function Aurora({
  className,
  colors = ['#fbbf24', '#f97316', '#dc2626', '#7c3aed', '#3b82f6'],
  speed = 0.5,
  blur = 100,
}: AuroraProps) {
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

    // Aurora blobs
    const blobs = colors.map((color, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200 + 150,
      color,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      phase: (i * Math.PI * 2) / colors.length,
    }));

    let time = 0;

    const animate = () => {
      time += 0.01;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear with dark background
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw each blob
      blobs.forEach((blob) => {
        // Move blob
        blob.x += blob.vx + Math.sin(time + blob.phase) * 0.5;
        blob.y += blob.vy + Math.cos(time + blob.phase) * 0.5;

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;

        // Draw gradient blob
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color + '40');
        gradient.addColorStop(0.5, blob.color + '20');
        gradient.addColorStop(1, blob.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
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
  }, [colors, speed, reducedMotion]);

  // Static gradient fallback for reduced motion
  if (reducedMotion) {
    return (
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
          className
        )}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ filter: `blur(${blur}px)` }}
    />
  );
}

export default Aurora;
