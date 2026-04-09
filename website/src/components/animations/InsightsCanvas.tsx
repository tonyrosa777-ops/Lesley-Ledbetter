"use client";

import { useEffect, useRef } from "react";

/* ──────────────────────────────────────────────
   Phase lifecycle for the brand canvas animation
   ────────────────────────────────────────────── */
enum Phase {
  STREAM = 0,
  RISE = 1,
  COOL = 2,
  ARC = 3,
  IDLE = 4,
}

const STREAM_DURATION = 120; // frames
const RISE_DURATION = 90;
const COOL_DURATION = 70;
const ARC_DURATION = 80;

/* ── Spring-out easing ── */
function springOut(t: number): number {
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * Math.PI * 10 * 0.68);
}

/* ── Color interpolation ── */
function lerpColor(a: string, b: string, t: number): string {
  const parseHex = (hex: string) => {
    const v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bv})`;
}

/* ── Stream particle ── */
interface StreamParticle {
  startX: number;
  startY: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  endX: number;
  endY: number;
  t: number;
  speed: number;
  radius: number;
  opacity: number;
}

function createStreamParticle(w: number, h: number, cx: number, cy: number): StreamParticle {
  // Spawn from random edge
  const edge = Math.floor(Math.random() * 4);
  let sx: number, sy: number;
  switch (edge) {
    case 0: sx = Math.random() * w; sy = 0; break;
    case 1: sx = w; sy = Math.random() * h; break;
    case 2: sx = Math.random() * w; sy = h; break;
    default: sx = 0; sy = Math.random() * h; break;
  }

  return {
    startX: sx,
    startY: sy,
    cp1x: sx + (cx - sx) * 0.3 + (Math.random() - 0.5) * w * 0.4,
    cp1y: sy + (cy - sy) * 0.3 + (Math.random() - 0.5) * h * 0.4,
    cp2x: sx + (cx - sx) * 0.7 + (Math.random() - 0.5) * w * 0.2,
    cp2y: sy + (cy - sy) * 0.7 + (Math.random() - 0.5) * h * 0.2,
    endX: cx + (Math.random() - 0.5) * 20,
    endY: cy + (Math.random() - 0.5) * 20,
    t: Math.random() * 0.3, // stagger starts
    speed: 0.006 + Math.random() * 0.008,
    radius: 1.5 + Math.random() * 2,
    opacity: 0.4 + Math.random() * 0.5,
  };
}

function bezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

/* ── Draw the eye shape (vesica piscis + iris) ── */
function drawEye(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  eyeW: number,
  eyeH: number,
  color: string,
  alpha: number,
  scale: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;

  const halfW = eyeW / 2;
  const halfH = eyeH / 2;
  const cpOffset = halfH * 1.4; // control point height for the almond curve

  // Upper lid
  ctx.beginPath();
  ctx.moveTo(-halfW, 0);
  ctx.bezierCurveTo(-halfW * 0.5, -cpOffset, halfW * 0.5, -cpOffset, halfW, 0);
  // Lower lid
  ctx.bezierCurveTo(halfW * 0.5, cpOffset, -halfW * 0.5, cpOffset, -halfW, 0);
  ctx.closePath();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Iris circle
  const irisR = Math.min(halfW, halfH) * 0.38;
  ctx.beginPath();
  ctx.arc(0, 0, irisR, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pupil dot
  const pupilR = irisR * 0.35;
  ctx.beginPath();
  ctx.arc(0, 0, pupilR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

/* ── Draw aura arc ── */
function drawAura(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  progress: number,
  color: string,
  alpha: number,
) {
  if (progress <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";

  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + Math.PI * 2 * Math.min(progress, 1);

  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.stroke();

  // Second outer ring, thinner
  if (progress > 0.2) {
    ctx.globalAlpha = alpha * 0.4;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.15, startAngle, startAngle + Math.PI * 2 * Math.min(progress - 0.1, 1));
    ctx.stroke();
  }

  ctx.restore();
}

export default function InsightsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let w = container.clientWidth;
    let h = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = container!.clientWidth;
      h = container!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const cx = () => w / 2;
    const cy = () => h / 2;
    const eyeW = () => Math.min(w, h) * 0.55;
    const eyeH = () => eyeW() * 0.42;
    const auraRadius = () => Math.min(w, h) * 0.38;

    // State
    let phase: Phase = Phase.STREAM;
    let phaseFrame = 0;
    let particles: StreamParticle[] = [];

    // Init stream particles
    function initStream() {
      particles = Array.from({ length: 30 }, () =>
        createStreamParticle(w, h, cx(), cy()),
      );
    }
    initStream();

    let eyeColor = "#FFFFFF";
    let eyeAlpha = 0;
    let eyeScale = 0;
    let arcProgress = 0;
    let raf: number;

    function tick() {
      phaseFrame++;
      ctx.clearRect(0, 0, w, h);

      switch (phase) {
        /* ── STREAM: particles converge toward center ── */
        case Phase.STREAM: {
          for (const p of particles) {
            p.t += p.speed;
            if (p.t > 1) p.t = 1;

            const px = bezier(p.startX, p.cp1x, p.cp2x, p.endX, p.t);
            const py = bezier(p.startY, p.cp1y, p.cp2y, p.endY, p.t);

            const fadeIn = Math.min(p.t / 0.1, 1);
            const fadeOut = p.t > 0.85 ? (1 - p.t) / 0.15 : 1;

            ctx.beginPath();
            ctx.arc(px, py, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#C5A55A";
            ctx.globalAlpha = p.opacity * fadeIn * Math.max(0, fadeOut);
            ctx.fill();

            // Trail
            if (p.t > 0.05 && p.t < 0.95) {
              const tt = p.t - 0.03;
              const tx = bezier(p.startX, p.cp1x, p.cp2x, p.endX, tt);
              const ty = bezier(p.startY, p.cp1y, p.cp2y, p.endY, tt);
              ctx.beginPath();
              ctx.arc(tx, ty, p.radius * 0.5, 0, Math.PI * 2);
              ctx.globalAlpha = p.opacity * 0.3 * fadeIn;
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;

          if (phaseFrame >= STREAM_DURATION) {
            phase = Phase.RISE;
            phaseFrame = 0;
            particles = [];
          }
          break;
        }

        /* ── RISE: eye extrudes with spring-out ── */
        case Phase.RISE: {
          const t = Math.min(phaseFrame / RISE_DURATION, 1);
          const st = springOut(t);

          eyeScale = st;
          eyeAlpha = Math.min(t / 0.2, 1);
          eyeColor = "#FFFFFF";

          drawEye(ctx, cx(), cy(), eyeW(), eyeH(), eyeColor, eyeAlpha, eyeScale);

          if (phaseFrame >= RISE_DURATION) {
            phase = Phase.COOL;
            phaseFrame = 0;
          }
          break;
        }

        /* ── COOL: white-hot → gold → burgundy ── */
        case Phase.COOL: {
          const t = Math.min(phaseFrame / COOL_DURATION, 1);
          eyeScale = 1;
          eyeAlpha = 1;

          if (t < 0.5) {
            eyeColor = lerpColor("#FFFFFF", "#C5A55A", t / 0.5);
          } else {
            eyeColor = lerpColor("#C5A55A", "#800020", (t - 0.5) / 0.5);
          }

          drawEye(ctx, cx(), cy(), eyeW(), eyeH(), eyeColor, eyeAlpha, eyeScale);

          if (phaseFrame >= COOL_DURATION) {
            phase = Phase.ARC;
            phaseFrame = 0;
          }
          break;
        }

        /* ── ARC: circular halo draws progressively ── */
        case Phase.ARC: {
          const t = Math.min(phaseFrame / ARC_DURATION, 1);
          arcProgress = t;

          drawEye(ctx, cx(), cy(), eyeW(), eyeH(), eyeColor, 1, 1);
          drawAura(ctx, cx(), cy(), auraRadius(), arcProgress, "#C5A55A", 0.7);

          if (phaseFrame >= ARC_DURATION) {
            phase = Phase.IDLE;
            phaseFrame = 0;
          }
          break;
        }

        /* ── IDLE: gentle breathing ── */
        case Phase.IDLE: {
          const breathe = Math.sin(phaseFrame * 0.025);
          const idleAlpha = 0.85 + breathe * 0.15;
          const idleScale = 1 + breathe * 0.015;

          drawEye(ctx, cx(), cy(), eyeW(), eyeH(), "#800020", idleAlpha, idleScale);
          drawAura(ctx, cx(), cy(), auraRadius() * (1 + breathe * 0.01), 1, "#C5A55A", 0.5 + breathe * 0.2);
          break;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "clamp(340px, 50vw, 540px)" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
