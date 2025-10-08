import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  Github, Youtube, Linkedin, Send, Instagram, Film, Palette, Shapes, Twitter
} from "lucide-react";

export default function Footer() {
  const socials = [
    { href: siteConfig.socials.github, icon: Github, label: "GitHub" },
    { href: siteConfig.socials.youtube, icon: Youtube, label: "YouTube" },
    { href: siteConfig.socials.vimeo, icon: Film, label: "Vimeo" },
    { href: siteConfig.socials.instagram, icon: Instagram, label: "Instagram" },
    { href: siteConfig.socials.behance, icon: Palette, label: "Behance" },
    { href: siteConfig.socials.artstation, icon: Shapes, label: "ArtStation" },
    { href: siteConfig.socials.twitter, icon: Twitter, label: "Twitter" },
    { href: siteConfig.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: siteConfig.socials.telegram, icon: Send, label: "Telegram" },
  ].filter(s => s.href);

  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
        <div>© {new Date().getFullYear()} {siteConfig.name} — {siteConfig.role}</div>
        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.label} href={s.href} target="_blank" className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition" aria-label={s.label}>
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}