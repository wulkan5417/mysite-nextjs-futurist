import { getAllMeta } from "@/lib/content";

export const dynamic = "error";

// Define proper types for our content items
type ContentItem = {
  slug: string;
  title: string;
  tags?: string[];
};

type MergedItem = ContentItem & {
  type: string;
};

export async function generateStaticParams() {
  const all = [...new Set(getAllMeta<{tags?:string[]}>("blog").flatMap(p=>p.tags||[]).concat(getAllMeta<{tags?:string[]}>("lessons").flatMap(l=>l.tags||[])))];
  return all.map(tag => ({ tag: String(tag).toLowerCase() }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag.toLowerCase();
  const posts = getAllMeta<ContentItem>("blog").filter(p => (p.tags||[]).map(t=>t.toLowerCase()).includes(tag));
  const lessons = getAllMeta<ContentItem>("lessons").filter(l => (l.tags||[]).map(t=>t.toLowerCase()).includes(tag));

  // Type-safe merge of posts and lessons with their types
  const mergedPosts: MergedItem[] = posts.map(p => ({...p, type:"blog"}));
  const mergedLessons: MergedItem[] = lessons.map(l => ({...l, type:"lessons"}));
  const allItems: MergedItem[] = [...mergedPosts, ...mergedLessons];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Tag: {tag}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {allItems.map((it) => (
          <a key={`${it.type}-${it.slug}`} href={`/${it.type}/${it.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-xs uppercase text-slate-400">{it.type}</div>
            <div className="text-lg font-medium">{it.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}