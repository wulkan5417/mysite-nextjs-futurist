import { getAllMeta } from "@/lib/content";
export const dynamic = "error";
type ProjectMeta = { title: string; year?: number; stack?: string[]; excerpt?: string; link?: string };

export default function ProjectsPage() {
  const projects = getAllMeta<ProjectMeta>("projects");
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Loyihalar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((pr) => (
          <a key={pr.slug} href={`/projects/${pr.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-lg font-medium">{pr.title}</div>
            <div className="text-xs text-slate-400 mt-1">{pr.year}</div>
            <p className="text-sm text-slate-300 mt-3">{pr.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}