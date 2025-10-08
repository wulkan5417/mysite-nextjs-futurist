"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(scrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
      <div className="h-full bg-[linear-gradient(90deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.9))] shadow-[0_0_12px_rgba(59,130,246,0.5)]" style={{ width: `${p}%` }} />
    </div>
  );
}