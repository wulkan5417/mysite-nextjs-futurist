import { getAllMeta } from "@/lib/content";
export const dynamic = "error";
type LessonMeta = { title: string; date?: string; level?: string; duration?: string; tags?: string[] };

export default function LessonsPage() {
  const lessons = getAllMeta<LessonMeta>("lessons");
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Video darslar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {lessons.map((l) => (
          <a key={l.slug} href={`/lessons/${l.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-lg font-medium">{l.title}</div>
            <div className="text-xs text-slate-400 mt-1">{[l.level, l.duration].filter(Boolean).join(" • ")}</div>
          </a>
        ))}
      </div>
    </div>
  );
}