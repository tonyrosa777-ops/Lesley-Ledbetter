"use client";

import { useEffect, useRef } from "react";

/* ── Constants ── */
const GOLD = "#C5A55A";
const BURGUNDY = "#800020";
const IVORY = "#F5F0EB";
const DEEP_PURPLE = "#2D1B4E";

const STREAM_COUNT = 60;
const STREAM_FRAMES = 140;
const RISE_FRAMES = 80;
const COOL_FRAMES = 60;
const ARC_FRAMES = 90;

/* ── Easing ── */
function springOut(t: number): number {
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * Math.PI * 10 * 0.68);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Color utils ── */
function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerpRgb(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}

/* ── Bezier interpolation ── */
function cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

/* ── Stream particle ── */
interface Particle {
  sx: number; sy: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  ex: number; ey: number;
  t: number;
  speed: number;
  r: number;
  opacity: number;
  trail: { x: number; y: number; a: number }[];
}

function makeParticle(w: number, h: number, cx: number, cy: number): Particle {
  const edge = Math.floor(Math.random() * 4);
  let sx: number, sy: number;
  switch (edge) {
    case 0: sx = Math.random() * w; sy = -10; break;
    case 1: sx = w + 10; sy = Math.random() * h; break;
    case 2: sx = Math.random() * w; sy = h + 10; break;
    default: sx = -10; sy = Math.random() * h; break;
  }
  return {
    sx, sy,
    c1x: sx + (cx - sx) * 0.25 + (Math.random() - 0.5) * w * 0.5,
    c1y: sy + (cy - sy) * 0.25 + (Math.random() - 0.5) * h * 0.5,
    c2x: sx + (cx - sx) * 0.7 + (Math.random() - 0.5) * w * 0.25,
    c2y: sy + (cy - sy) * 0.7 + (Math.random() - 0.5) * h * 0.25,
    ex: cx + (Math.random() - 0.5) * 16,
    ey: cy + (Math.random() - 0.5) * 16,
    t: Math.random() * 0.2,
    speed: 0.005 + Math.random() * 0.007,
    r: 1.2 + Math.random() * 2.5,
    opacity: 0.5 + Math.random() * 0.5,
    trail: [],
  };
}

/* ── Orbital particle for IDLE ── */
interface Orbital {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  phase: number;
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

    // Derived dimensions
    const cx = () => w / 2;
    const cy = () => h / 2;
    const unit = () => Math.min(w, h);
    const eyeW = () => unit() * 0.52;
    const eyeH = () => eyeW() * 0.38;

    // State
    let phase = 0; // 0=STREAM 1=RISE 2=COOL 3=ARC 4=IDLE
    let frame = 0;
    let elapsed = 0;
    let particles: Particle[] = Array.from({ length: STREAM_COUNT }, () => makeParticle(w, h, cx(), cy()));
    let eyeScale = 0;
    let eyeAlpha = 0;
    let coolT = 0;
    let arcT = 0;

    // Orbital particles for IDLE
    const orbitals: Orbital[] = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      radius: unit() * (0.28 + Math.random() * 0.14),
      speed: 0.003 + Math.random() * 0.004 * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));

    /* ── Draw radial glow ── */
    function drawGlow(x: number, y: number, r: number, color: string, alpha: number) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      const [cr, cg, cb] = hexToRgb(color);
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.6})`);
      grad.addColorStop(0.3, `rgba(${cr},${cg},${cb},${alpha * 0.25})`);
      grad.addColorStop(0.6, `rgba(${cr},${cg},${cb},${alpha * 0.08})`);
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    /* ── Draw the filled eye ── */
    function drawEye(x: number, y: number, ew: number, eh: number, scale: number, alpha: number, heatT: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      const hw = ew / 2;
      const hh = eh / 2;
      const cp = hh * 1.5;

      // Outer glow
      drawGlow(0, 0, hw * 1.8, GOLD, alpha * 0.4 * (1 - heatT * 0.5));

      // Eye shape path (almond / vesica piscis)
      function eyePath() {
        ctx.beginPath();
        ctx.moveTo(-hw, 0);
        ctx.bezierCurveTo(-hw * 0.5, -cp, hw * 0.5, -cp, hw, 0);
        ctx.bezierCurveTo(hw * 0.5, cp, -hw * 0.5, cp, -hw, 0);
        ctx.closePath();
      }

      // Fill eye with gradient
      eyePath();
      const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, hw * 0.8);
      const innerColor = heatT < 0.5
        ? lerpRgb("#FFFFFF", GOLD, heatT * 2)
        : lerpRgb(GOLD, BURGUNDY, (heatT - 0.5) * 2);
      const outerColor = heatT < 0.5
        ? lerpRgb("#FFFFFF", DEEP_PURPLE, heatT * 2)
        : lerpRgb(DEEP_PURPLE, "#0F0F0F", (heatT - 0.5) * 2);
      eyeGrad.addColorStop(0, innerColor);
      eyeGrad.addColorStop(0.6, outerColor);
      eyeGrad.addColorStop(1, "rgba(15,15,15,0.8)");
      ctx.globalAlpha = alpha * 0.25;
      ctx.fillStyle = eyeGrad;
      ctx.fill();

      // Eye outline — double stroke for thickness
      eyePath();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = innerColor;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = innerColor;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner eye outline (slightly smaller)
      ctx.beginPath();
      ctx.moveTo(-hw * 0.85, 0);
      ctx.bezierCurveTo(-hw * 0.45, -cp * 0.75, hw * 0.45, -cp * 0.75, hw * 0.85, 0);
      ctx.bezierCurveTo(hw * 0.45, cp * 0.75, -hw * 0.45, cp * 0.75, -hw * 0.85, 0);
      ctx.closePath();
      ctx.globalAlpha = alpha * 0.3;
      ctx.strokeStyle = innerColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Iris — filled circle with gradient
      const irisR = Math.min(hw, hh) * 0.45;
      const irisGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, irisR);
      irisGrad.addColorStop(0, innerColor);
      irisGrad.addColorStop(0.5, lerpRgb(innerColor, DEEP_PURPLE, 0.5));
      irisGrad.addColorStop(1, "rgba(15,15,15,0.6)");
      ctx.beginPath();
      ctx.arc(0, 0, irisR, 0, Math.PI * 2);
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = irisGrad;
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = innerColor;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = innerColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Iris detail — radial lines
      ctx.globalAlpha = alpha * 0.15;
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * irisR * 0.25, Math.sin(a) * irisR * 0.25);
        ctx.lineTo(Math.cos(a) * irisR * 0.95, Math.sin(a) * irisR * 0.95);
        ctx.strokeStyle = innerColor;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Pupil — solid with glow
      const pupilR = irisR * 0.3;
      ctx.beginPath();
      ctx.arc(0, 0, pupilR, 0, Math.PI * 2);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#0F0F0F";
      ctx.fill();

      // Pupil highlight — small bright dot
      ctx.beginPath();
      ctx.arc(pupilR * -0.3, pupilR * -0.3, pupilR * 0.2, 0, Math.PI * 2);
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Light rays from center
      ctx.globalAlpha = alpha * 0.06;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + elapsed * 0.0003;
        const len = hw * (0.9 + Math.sin(elapsed * 0.002 + i) * 0.2);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        ctx.strokeStyle = innerColor;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.restore();
      return innerColor;
    }

    /* ── Draw sacred geometry rings ── */
    function drawRings(x: number, y: number, baseR: number, progress: number, color: string, alpha: number) {
      if (progress <= 0) return;
      ctx.save();
      ctx.translate(x, y);

      const ringAlpha = alpha * Math.min(progress / 0.3, 1);

      // Ring 1 — inner, rotates clockwise
      ctx.save();
      ctx.rotate(elapsed * 0.0005);
      ctx.globalAlpha = ringAlpha * 0.8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      const r1 = baseR * 0.85;
      const end1 = Math.PI * 2 * Math.min(progress * 1.2, 1);
      ctx.beginPath();
      ctx.arc(0, 0, r1, 0, end1);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tick marks on ring 1
      ctx.globalAlpha = ringAlpha * 0.4;
      const ticks1 = 36;
      for (let i = 0; i < ticks1 * Math.min(progress * 1.2, 1); i++) {
        const a = (i / ticks1) * Math.PI * 2;
        const inner = r1 - 4;
        const outer = r1 + (i % 4 === 0 ? 8 : 4);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.strokeStyle = color;
        ctx.lineWidth = i % 4 === 0 ? 1 : 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // Ring 2 — outer, rotates counter-clockwise
      if (progress > 0.3) {
        ctx.save();
        ctx.rotate(-elapsed * 0.0003);
        const r2 = baseR * 1.05;
        const p2 = (progress - 0.3) / 0.7;
        ctx.globalAlpha = ringAlpha * 0.5 * Math.min(p2 / 0.3, 1);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, r2, 0, Math.PI * 2 * Math.min(p2 * 1.3, 1));
        ctx.stroke();
        ctx.setLineDash([]);

        // Corner markers (4 cardinal points)
        ctx.globalAlpha = ringAlpha * 0.6 * Math.min(p2, 1);
        for (let i = 0; i < 4; i++) {
          const a = (i / 4) * Math.PI * 2;
          const mx = Math.cos(a) * r2;
          const my = Math.sin(a) * r2;
          ctx.beginPath();
          ctx.arc(mx, my, 3, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.restore();
      }

      // Ring 3 — outermost, very thin, slow rotation
      if (progress > 0.6) {
        ctx.save();
        ctx.rotate(elapsed * 0.0002);
        const r3 = baseR * 1.2;
        const p3 = (progress - 0.6) / 0.4;
        ctx.globalAlpha = ringAlpha * 0.25 * Math.min(p3, 1);
        ctx.strokeStyle = BURGUNDY;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, r3, 0, Math.PI * 2 * Math.min(p3 * 1.5, 1));
        ctx.stroke();

        // Small triangles at 60-degree intervals
        ctx.globalAlpha = ringAlpha * 0.2 * Math.min(p3, 1);
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const tx = Math.cos(a) * r3;
          const ty = Math.sin(a) * r3;
          ctx.beginPath();
          ctx.moveTo(tx + Math.cos(a) * 6, ty + Math.sin(a) * 6);
          ctx.lineTo(tx + Math.cos(a + 0.3) * 6, ty + Math.sin(a + 0.3) * 6);
          ctx.lineTo(tx + Math.cos(a - 0.3) * 6, ty + Math.sin(a - 0.3) * 6);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();
    }

    /* ── Draw orbital particles ── */
    function drawOrbitals(x: number, y: number, alpha: number) {
      for (const o of orbitals) {
        o.angle += o.speed;
        const pulse = 0.7 + Math.sin(elapsed * 0.003 + o.phase) * 0.3;
        const ox = x + Math.cos(o.angle) * o.radius;
        const oy = y + Math.sin(o.angle) * o.radius;

        ctx.beginPath();
        ctx.arc(ox, oy, o.size * pulse, 0, Math.PI * 2);
        ctx.globalAlpha = alpha * o.opacity * pulse;
        ctx.fillStyle = GOLD;
        ctx.shadowColor = GOLD;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }

    /* ── Main loop ── */
    let raf: number;

    function tick(ts: number) {
      elapsed = ts;
      frame++;
      ctx.clearRect(0, 0, w, h);

      switch (phase) {
        /* ── STREAM ── */
        case 0: {
          // Background glow building up
          const buildUp = Math.min(frame / STREAM_FRAMES, 1);
          drawGlow(cx(), cy(), unit() * 0.4, GOLD, buildUp * 0.15);

          for (const p of particles) {
            p.t += p.speed;
            if (p.t > 1) p.t = 1;

            const px = cubicBezier(p.sx, p.c1x, p.c2x, p.ex, p.t);
            const py = cubicBezier(p.sy, p.c1y, p.c2y, p.ey, p.t);

            // Store trail
            p.trail.push({ x: px, y: py, a: p.opacity });
            if (p.trail.length > 12) p.trail.shift();

            const fadeIn = Math.min(p.t / 0.08, 1);
            const fadeOut = p.t > 0.88 ? (1 - p.t) / 0.12 : 1;
            const life = fadeIn * Math.max(0, fadeOut);

            // Draw trail
            for (let i = 0; i < p.trail.length - 1; i++) {
              const tp = p.trail[i];
              const progress = i / p.trail.length;
              ctx.beginPath();
              ctx.arc(tp.x, tp.y, p.r * progress * 0.6, 0, Math.PI * 2);
              ctx.globalAlpha = life * progress * 0.3;
              ctx.fillStyle = GOLD;
              ctx.fill();
            }

            // Draw particle head
            ctx.beginPath();
            ctx.arc(px, py, p.r, 0, Math.PI * 2);
            ctx.globalAlpha = p.opacity * life;
            ctx.fillStyle = GOLD;
            ctx.shadowColor = GOLD;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          ctx.globalAlpha = 1;

          if (frame >= STREAM_FRAMES) {
            phase = 1;
            frame = 0;
            particles = [];
          }
          break;
        }

        /* ── RISE ── */
        case 1: {
          const t = Math.min(frame / RISE_FRAMES, 1);
          eyeScale = springOut(t);
          eyeAlpha = easeOutCubic(Math.min(t / 0.25, 1));
          coolT = 0;

          drawEye(cx(), cy(), eyeW(), eyeH(), eyeScale, eyeAlpha, 0);

          if (frame >= RISE_FRAMES) {
            phase = 2;
            frame = 0;
          }
          break;
        }

        /* ── COOL ── */
        case 2: {
          coolT = Math.min(frame / COOL_FRAMES, 1);
          eyeScale = 1;
          eyeAlpha = 1;

          drawEye(cx(), cy(), eyeW(), eyeH(), 1, 1, coolT);

          if (frame >= COOL_FRAMES) {
            phase = 3;
            frame = 0;
          }
          break;
        }

        /* ── ARC ── */
        case 3: {
          arcT = easeOutCubic(Math.min(frame / ARC_FRAMES, 1));

          const color = drawEye(cx(), cy(), eyeW(), eyeH(), 1, 1, 1);
          drawRings(cx(), cy(), unit() * 0.36, arcT, GOLD, 0.8);

          // Fade in orbitals
          if (arcT > 0.5) {
            drawOrbitals(cx(), cy(), (arcT - 0.5) * 2);
          }

          if (frame >= ARC_FRAMES) {
            phase = 4;
            frame = 0;
          }
          break;
        }

        /* ── IDLE ── */
        case 4: {
          const breathe = Math.sin(elapsed * 0.001);
          const pulse = Math.sin(elapsed * 0.0006);
          const idleScale = 1 + breathe * 0.012;
          const idleAlpha = 0.9 + pulse * 0.1;

          drawEye(cx(), cy(), eyeW(), eyeH(), idleScale, idleAlpha, 1);
          drawRings(cx(), cy(), unit() * (0.36 + breathe * 0.005), 1, GOLD, 0.6 + pulse * 0.15);
          drawOrbitals(cx(), cy(), 0.7 + pulse * 0.2);
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
