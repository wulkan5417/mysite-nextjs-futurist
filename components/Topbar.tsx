"use client";
import { Bell, Search, Plus } from "lucide-react";
import NeonButton from "./ui/NeonButton";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <div className="hidden md:flex items-center gap-3 text-sm text-slate-300">
          <span>Home / Dashboard</span>
          <span className="text-slate-400 text-xs">Today</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:flex">
            <input
              placeholder="Search…"
              className="h-10 w-64 rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          <NeonButton className="hidden md:inline-flex">
            <Plus className="h-4 w-4" />
            Add item
          </NeonButton>
          <button className="relative rounded-xl border border-white/10 bg-white/5 p-2">
            <Bell className="h-5 w-5 text-slate-300" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>
          <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10">
            <img alt="avatar" src="/avatar.jpg" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}