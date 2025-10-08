import { getAllTags } from "@/lib/tags";
export const dynamic = "error";

export default function TagsPage() {
  const tags = getAllTags().sort((a,b)=> b.count - a.count);
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Taglar</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <a key={t.tag} href={`/tags/${t.tag}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            {t.tag} <span className="text-slate-400">({t.count})</span>
          </a>
        ))}
      </div>
    </div>
  );
}