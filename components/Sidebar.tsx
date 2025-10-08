"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Activity,
  Calendar,
  Settings,
  LogOut,
  User,
  Search,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons", label: "Lessons", icon: ListChecks },
  { href: "/blog", label: "Blog", icon: MessageSquare },
  { href: "/projects", label: "Projects", icon: Activity },
  { href: "/about", label: "About", icon: User },
  { href: "/search", label: "Search", icon: Search },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/options", label: "Options", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Nested sahifalarda ham active bo‘lsin (mas: /blog/slug)
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 md:w-64 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-4 py-4">
        {/* Logo bo'lsa rasm qo'ying, bo'lmasa gradient qoldiring */}
        <img src="/logo.svg" alt="logo" className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 p-1.5" />
        <div className="hidden md:block text-lg font-semibold">{siteConfig.name}</div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2 md:px-3">
        {items.map((it) => {
          const active = isActive(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.85))] text-black"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <Icon className={`${active ? "text-black" : "text-slate-200"} h-5 w-5`} />
              </span>
              <span className="hidden md:block text-sm">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mb-4 mt-auto space-y-2 px-2 md:px-3">
        <button className="group flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <Settings className="h-5 w-5" />
          </span>
          <span className="hidden md:block text-sm">Settings</span>
        </button>
        <button className="group flex items-center gap-3 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <LogOut className="h-5 w-5" />
          </span>
          <span className="hidden md:block text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
}