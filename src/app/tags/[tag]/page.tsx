import { getAllMeta } from "@/lib/content";

export const dynamic = "error";

export async function generateStaticParams() {
  const all = [...new Set(getAllMeta<{tags?:string[]}>("blog").flatMap(p=>p.tags||[]).concat(getAllMeta<{tags?:string[]}>("lessons").flatMap(l=>l.tags||[])))];
  return all.map(tag => ({ tag: String(tag).toLowerCase() }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag.toLowerCase();
  const posts = getAllMeta<{ title:string; tags?:string[] }>("blog").filter(p => (p.tags||[]).map(t=>t.toLowerCase()).includes(tag));
  const lessons = getAllMeta<{ title:string; tags?:string[] }>("lessons").filter(l => (l.tags||[]).map(t=>t.toLowerCase()).includes(tag));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Tag: {tag}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[...posts.map(p=>({...p, type:"blog"})), ...lessons.map(l=>({...l, type:"lessons"}))].map((it:any)=>(
          <a key={`${it.type}-${it.slug}`} href={`/${it.type}/${it.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-xs uppercase text-slate-400">{it.type}</div>
            <div className="text-lg font-medium">{it.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}