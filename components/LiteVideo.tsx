"use client";

import { useState } from "react";

export default function LiteVideo({ src, title = "Video", thumbnail }: { src: string; title?: string; thumbnail?: string }) {
  const [play, setPlay] = useState(false);
  const isYouTube = /youtube|youtu\.be/.test(src);
  const thumb = thumbnail || (isYouTube ? `https://i.ytimg.com/vi/${extractYouTubeId(src)}/hqdefault.jpg` : undefined);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      {!play ? (
        <button onClick={() => setPlay(true)} className="group absolute inset-0 w-full h-full">
          {thumb ? (
            <img src={thumb} alt={title} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition" />
          ) : (
            <div className="h-full w-full bg-white/5" />
          )}
          <div className="absolute inset-0 grid place-items-center">
            <div className="btn-glow rounded-full bg-[linear-gradient(135deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.85))] text-black px-5 py-3 font-medium">
              ▶ Play
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}

function extractYouTubeId(url: string) {
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return m ? m[1] : "";
}