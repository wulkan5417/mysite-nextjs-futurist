import { getMdxBySlug, getSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import ScrollProgress from "@/components/ScrollProgress";

export const dynamic = "error";

type PostMeta = { title: string; date?: string; excerpt?: string; tags?: string[] };

export async function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const { content, frontmatter, readingTime, headings } = await getMdxBySlug<PostMeta>("blog", params.slug);

    return (
      <>
        <ScrollProgress />
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
          <article className="prose prose-invert max-w-none">
            <h1 className="mb-2">{frontmatter.title}</h1>
            <p className="text-sm text-slate-400">
              {frontmatter.date ? dayjs(frontmatter.date).format("D MMM, YYYY") : ""} {readingTime?.text ? ` • ${readingTime.text}` : ""}
            </p>
            <div className="mt-8">{content}</div>
          </article>

          <aside className="hidden lg:block">
            <div className="glass sticky top-20 p-4">
              <div className="text-sm font-medium mb-2">Mundarija</div>
              <nav className="space-y-1 text-sm">
                {headings?.map((h, i) => (
                  <a
                    key={i}
                    href={`#${h.slug}`}
                    className={`block rounded-lg px-2 py-1 text-slate-300 hover:bg-white/5 ${h.level === 3 ? "ml-3 text-slate-400" : ""}`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}