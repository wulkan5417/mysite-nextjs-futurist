"use client";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number;    // kuchaytirgich (0.05–0.2)
  max?: number;         // maksimal px siljish (4–12px)
  radius?: number;      // ta’sir radiusi (px)
  friction?: number;    // silliqlik (0.12–0.25)
  disabledOnMobile?: boolean;
  axis?: "both" | "x" | "y";
};

export default function Magnetic({
  children,
  strength = 0.12,
  max = 8,
  radius = 120,
  friction = 0.18,
  disabledOnMobile = true,
  axis = "both",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const reduce = useRef(false);
  const hover = useRef(false);

  useEffect(() => {
    const el = ref.current!;
    if (!el) return;

    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

    const onMove = (e: MouseEvent) => {
      if (!hover.current || reduce.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      // radiusdan tashqarida effekt yo‘q
      if (dist > radius) {
        target.current.x = 0;
        target.current.y = 0;
        return;
      }

      // markazga yaqinroq — biroz kuchliroq
      const falloff = (1 - dist / radius) * strength;
      const tx = clamp(dx * falloff, -max, max);
      const ty = clamp(dy * falloff, -max, max);

      target.current.x = axis === "y" ? 0 : tx;
      target.current.y = axis === "x" ? 0 : ty;
    };

    const onEnter = () => (hover.current = true);
    const onLeave = () => {
      hover.current = false;
      target.current.x = 0;
      target.current.y = 0;
    };

    const loop = () => {
      raf.current = requestAnimationFrame(loop);
      pos.current.x += (target.current.x - pos.current.x) * friction;
      pos.current.y += (target.current.y - pos.current.y) * friction;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };
    loop();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current!);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, [strength, max, radius, friction, axis]);

  // Mobile’da o‘chirib qo‘yish
  useEffect(() => {
    if (!disabledOnMobile) return;
    const off = () => {
      if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
    };
    window.addEventListener("touchstart", off);
    return () => window.removeEventListener("touchstart", off);
  }, [disabledOnMobile]);

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}