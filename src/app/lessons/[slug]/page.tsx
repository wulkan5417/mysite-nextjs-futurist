import { getMdxBySlug, getSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
export const dynamic = "error";
type LessonMeta = { title: string; date?: string; level?: string; duration?: string; tags?: string[] };

export async function generateStaticParams() {
  return getSlugs("lessons").map((slug) => ({ slug }));
}

export default async function LessonPage({ params }: { params: { slug: string } }) {
  try {
    const { content, frontmatter } = await getMdxBySlug<LessonMeta>("lessons", params.slug);
    return (
      <article className="mx-auto max-w-3xl px-6 py-10 prose prose-invert">
        <h1 className="mb-2">{frontmatter.title}</h1>
        <p className="text-sm text-slate-400">
          {[frontmatter.level, frontmatter.duration].filter(Boolean).join(" • ")}
        </p>
        <div className="mt-8">{content}</div>
      </article>
    );
  } catch {
    notFound();
  }
}