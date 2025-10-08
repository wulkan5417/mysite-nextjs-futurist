import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Progress from "@/components/ui/Progress";
import NeonButton from "@/components/ui/NeonButton";
import Magnetic from "@/components/Magnetic";
import { siteConfig } from "@/lib/site";
import { getAllMeta } from "@/lib/content";

const posts = getAllMeta<{ title: string; date?: string; excerpt?: string }>("blog").slice(0, 3);
const lessons = getAllMeta<{ title: string; level?: string; duration?: string }>("lessons").slice(0, 3);
const projects = getAllMeta<{ title: string; year?: number; excerpt?: string }>("projects").slice(0, 3);

export const dynamic = "error";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl pt-6 md:pt-10">
      <div className="px-1 md:px-0">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {siteConfig.tagline}
        </h1>
        <p className="mt-2 text-slate-300 max-w-2xl">{siteConfig.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/projects" className="btn-glow inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.85))] px-4 py-2 font-medium text-black">Portfolio</Link>
          <Link href="/lessons" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">Darslar</Link>
          <Link href="/blog" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">Blog</Link>
        </div>
      </div>

      {/* Dashboard bloklari */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <GlassCard
            header={<div className="text-base">Filters</div>}
            actions={
              <div className="flex items-center gap-2">
                <Badge>To do</Badge>
                <Badge tone="purple">Work</Badge>
                <Badge tone="cyan">High priority</Badge>
              </div>
            }
          >
            <div className="flex items-center gap-3">
              <Magnetic><NeonButton>New task</NeonButton></Magnetic>
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                Quick add
              </button>
            </div>
          </GlassCard>

          <Magnetic>
            <GlassCard className="overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-slate-400">Today</div>
                  <h3 className="mt-1 text-lg font-medium">Meeting with team members</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Discuss website redesign with updated features…
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                    <span>08:00 AM — 10:00 AM</span>
                    <span>•</span>
                    <span>4 people</span>
                  </div>
                </div>
                <div className="hidden md:block h-12 w-12 rounded-xl bg-[linear-gradient(135deg,rgba(var(--primary),0.9),rgba(var(--accent),0.9))]" />
              </div>
            </GlassCard>
          </Magnetic>

          <Magnetic>
            <GlassCard className="relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(1200px_240px_at_0%_0%,rgba(var(--primary),0.35),transparent),radial-gradient(1200px_240px_at_100%_100%,rgba(var(--accent),0.35),transparent)]" />
              <div className="relative">
                <div className="text-sm text-slate-400">Today</div>
                <h3 className="mt-1 text-lg font-medium">Design System</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Create a responsive design system focusing on consistency and reusable components.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Design team</Badge>
                    <Badge tone="purple">Marketing</Badge>
                    <Badge tone="cyan">Dev team</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-300">Progress</span>
                    <div className="flex-1">
                      <Progress value={70} />
                    </div>
                    <span className="text-sm text-slate-300">70%</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Magnetic>

          <GlassCard>
            <div className="text-sm text-slate-400">Today</div>
            <h3 className="mt-1 text-lg font-medium">Meeting With Sales Team</h3>
            <p className="mt-1 text-sm text-slate-300">
              Check month sales and estimate costs for next month.
            </p>
            <div className="mt-3 text-xs text-slate-400">11:00 AM — 02:00 PM</div>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard header={<div>Today note</div>}>
            <p className="text-sm text-slate-300">
              Going to the company and planning meetings for the week ahead. 🧠
            </p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                20 min ago
              </button>
              <NeonButton className="px-3 py-2 text-sm">I’m going</NeonButton>
            </div>
          </GlassCard>

          <GlassCard header={<div>My files</div>} actions={<button className="text-sm text-slate-300">⋯</button>}>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="h-16 w-full rounded-lg bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary),0.35),transparent_60%)]" />
            </div>
            <p className="mt-3 text-sm text-slate-400">You have not added a file yet</p>
            <button className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
              Add file
            </button>
          </GlassCard>

          <GlassCard header={<div>Activity</div>} actions={<button className="text-sm text-slate-300">Get the report</button>}>
            <div className="mt-2 h-24 w-full overflow-hidden rounded-lg bg-white/5">
              <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(255,255,255,0.04)_8px,rgba(255,255,255,0.04)_16px)] relative">
                <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 p-2">
                  {[20, 35, 25, 60, 30, 80, 40, 55].map((h, i) => (
                    <div
                      key={i}
                      className="w-6 rounded-t bg-[linear-gradient(180deg,rgba(var(--primary),0.9),rgba(var(--cyan),0.8))] shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-300">80% tasks completed</div>
          </GlassCard>
        </div>
      </div>

      {/* So'nggi darslar/blog/loyihalar */}
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">So’nggi darslar</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {lessons.map((l) => (
              <Magnetic key={l.slug}>
                <Link
                  href={`/lessons/${l.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
                >
                  <div className="text-base font-medium">{l.title}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {[l.level, l.duration].filter(Boolean).join(" • ")}
                  </div>
                </Link>
              </Magnetic>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">So’nggi bloglar</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
              >
                <div className="text-base font-medium">{p.title}</div>
                <div className="text-xs text-slate-400 mt-1">{p.date}</div>
                <p className="text-sm text-slate-300 mt-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Loyihalar</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((pr) => (
              <Link
                key={pr.slug}
                href={`/projects/${pr.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
              >
                <div className="text-base font-medium">{pr.title}</div>
                <div className="text-xs text-slate-400 mt-1">{pr.year}</div>
                <p className="text-sm text-slate-300 mt-2">{pr.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}