"use client";

import { useEffect } from "react";

export default function PointerGlow() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--pg-x", `${x}%`);
      document.documentElement.style.setProperty("--pg-y", `${y}%`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}