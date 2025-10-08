import { getAllMeta } from "@/lib/content";
export const dynamic = "error";
type PostMeta = { title: string; date?: string; excerpt?: string; tags?: string[] };

export default function BlogPage() {
  const posts = getAllMeta<PostMeta>("blog");
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-lg font-medium">{p.title}</div>
            <div className="text-xs text-slate-400 mt-1">{p.date}</div>
            <p className="text-sm text-slate-300 mt-3">{p.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}