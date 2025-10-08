"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type Ripple = { x: number; y: number; r: number; alpha: number };

export default function PointerFX() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number>(0);
  const state = useRef({
    w: 0, h: 0, dpr: 1,
    tx: 0, ty: 0, x: 0, y: 0,
    sparks: [] as Spark[],
    ripples: [] as Ripple[],
    reduce: false,
  });

  useEffect(() => {
    const c = document.createElement("canvas");
    c.style.position = "fixed";
    c.style.inset = "0";
    c.style.pointerEvents = "none";
    c.style.zIndex = "1";
    c.style.mixBlendMode = "screen";
    ref.current = c;
    document.body.appendChild(c);

    const s = state.current;
    s.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = c.getContext("2d", { alpha: true })!;
    const resize = () => {
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = window.innerWidth;
      s.h = window.innerHeight;
      c.width = Math.floor(s.w * s.dpr);
      c.height = Math.floor(s.h * s.dpr);
      c.style.width = s.w + "px";
      c.style.height = s.h + "px";
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      `rgba(var(--primary),`,
      `rgba(var(--accent),`,
      `rgba(var(--flare),`,
    ];

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMove = (e: PointerEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (s.reduce) return;
      // harakatda kichik uchqunlar
      for (let i = 0; i < 4; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 0.6 + Math.random() * 1.2;
        const col = colors[(Math.random() * colors.length) | 0];
        s.sparks.push({
          x: s.tx, y: s.ty,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 1,
          color: col,
        });
      }
    };
    const onClick = (e: PointerEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      s.ripples.push({ x: s.tx, y: s.ty, r: 0, alpha: 0.6 });
      // kuchliroq uchqun portlash
      for (let i = 0; i < 18; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1.2 + Math.random() * 2.2;
        const col = colors[(Math.random() * colors.length) | 0];
        s.sparks.push({
          x: s.tx, y: s.ty,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 1,
          color: col,
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });

    const loop = () => {
      raf.current = requestAnimationFrame(loop);
      // smoothing
      s.x = lerp(s.x || s.tx, s.tx, 0.12);
      s.y = lerp(s.y || s.ty, s.ty, 0.12);

      ctx.clearRect(0, 0, s.w, s.h);

      // aurora glow (radial gradient)
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 260);
      g.addColorStop(0, "rgba(0,213,255,0.28)");
      g.addColorStop(0.45, "rgba(130,80,255,0.18)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s.w, s.h);

      // ripples (shockwave rings)
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const r = s.ripples[i];
        r.r += 3.2;
        r.alpha *= 0.97;
        if (r.alpha < 0.02) { s.ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,213,255,${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (!s.reduce) {
        // sparks
        ctx.globalCompositeOperation = "lighter";
        for (let i = s.sparks.length - 1; i >= 0; i--) {
          const p = s.sparks[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.02; // engil tortishish
          p.life *= 0.96;
          if (p.life < 0.04) { s.sparks.splice(i, 1); continue; }
          ctx.fillStyle = `${p.color}${p.life})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 + (1 - p.life) * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      c.remove();
    };
  }, []);

  return null;
}