"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Glimmer {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const STAR_COUNT = 100;
const EMBER_COUNT = 40;
const GLIMMER_CHANCE = 0.003; // per frame

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createStar(w: number, h: number): Star {
  const warm = Math.random() > 0.6;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.15, 0.15),
    radius: randomBetween(0.5, 1.8),
    baseOpacity: randomBetween(0.3, 0.8),
    twinkleSpeed: randomBetween(0.8, 2.5),
    twinkleOffset: Math.random() * Math.PI * 2,
    color: warm ? "#F5F0EB" : "#FFFFFF",
  };
}

function createEmber(w: number, h: number): Ember {
  return {
    x: randomBetween(w * 0.1, w * 0.9),
    y: h + randomBetween(5, 30),
    vx: randomBetween(-0.3, 0.3),
    vy: randomBetween(-0.4, -1.2),
    radius: randomBetween(1, 2.5),
    opacity: randomBetween(0.5, 0.9),
    life: 0,
    maxLife: randomBetween(180, 400),
  };
}

function createGlimmer(w: number, h: number): Glimmer {
  return {
    x: randomBetween(w * 0.05, w * 0.95),
    y: randomBetween(h * 0.05, h * 0.95),
    size: randomBetween(4, 10),
    opacity: 1,
    life: 0,
    maxLife: randomBetween(20, 45),
  };
}

function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.stroke();

  // diagonal arms (thinner)
  ctx.lineWidth = 0.6;
  const d = size * 0.5;
  ctx.beginPath();
  ctx.moveTo(x - d, y - d);
  ctx.lineTo(x + d, y + d);
  ctx.moveTo(x + d, y - d);
  ctx.lineTo(x - d, y + d);
  ctx.stroke();
  ctx.restore();
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Initialize particles
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () =>
      createStar(w, h),
    );
    const embers: Ember[] = Array.from({ length: EMBER_COUNT }, () => {
      const e = createEmber(w, h);
      e.y = randomBetween(0, h); // spread initial embers
      e.life = randomBetween(0, e.maxLife * 0.8);
      return e;
    });
    const glimmers: Glimmer[] = [];

    let frame = 0;
    let raf: number;

    function tick() {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // --- Stars ---
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        // wrap
        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;

        const twinkle =
          s.baseOpacity *
          (0.5 + 0.5 * Math.sin(frame * 0.02 * s.twinkleSpeed + s.twinkleOffset));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = twinkle;
        ctx.fill();
      }

      // --- Embers ---
      for (const e of embers) {
        e.x += e.vx;
        e.y += e.vy;
        e.life++;

        const progress = e.life / e.maxLife;
        const alpha = progress < 0.1
          ? progress / 0.1
          : progress > 0.7
            ? (1 - progress) / 0.3
            : 1;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#C5A55A";
        ctx.globalAlpha = e.opacity * Math.max(0, alpha);
        ctx.fill();

        if (e.life >= e.maxLife || e.y < -10) {
          Object.assign(e, createEmber(w, h));
        }
      }

      // --- Glimmers ---
      if (Math.random() < GLIMMER_CHANCE) {
        glimmers.push(createGlimmer(w, h));
      }

      for (let i = glimmers.length - 1; i >= 0; i--) {
        const g = glimmers[i];
        g.life++;
        const progress = g.life / g.maxLife;
        const alpha = progress < 0.3
          ? progress / 0.3
          : (1 - progress) / 0.7;

        drawFourPointStar(ctx, g.x, g.y, g.size * (0.5 + 0.5 * progress), Math.max(0, alpha));

        if (g.life >= g.maxLife) {
          glimmers.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
