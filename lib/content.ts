// lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { mdxComponents } from "@/components/mdx-components";

export type Collection = "blog" | "lessons" | "projects";
const CONTENT_DIR = path.join(process.cwd(), "content");

function getDir(collection: Collection) {
  return path.join(CONTENT_DIR, collection);
}

export function getSlugs(collection: Collection) {
  const dir = getDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getAllMeta<T extends Record<string, unknown>>(collection: Collection): (T & { slug: string })[] {
  const dir = getDir(collection);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    return { slug, ...(data as T) };
  });
  return items.sort((a, b) => {
    const dateA = a.date ? new Date(a.date as string | number) : new Date(0);
    const dateB = b.date ? new Date(b.date as string | number) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

// Sarlavhalarni (h2/h3) chiqarish — TOC uchun
function extractHeadings(markdown: string) {
  const slugger = new GithubSlugger();
  slugger.reset();
  const lines = markdown.split("\n");
  const headings: { level: 2 | 3; text: string; slug: string }[] = [];
  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) {
      const text = h2[1].trim();
      headings.push({ level: 2, text, slug: slugger.slug(text) });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ level: 3, text, slug: slugger.slug(text) });
    }
  }
  return headings;
}

// Define proper types for rehype plugins
type RehypePlugin = [typeof rehypePrettyCode, RehypePrettyCodeOptions] | typeof rehypeSlug | [typeof rehypeAutolinkHeadings, { behavior: string }];

export async function getMdxBySlug<T extends Record<string, unknown>>(collection: Collection, slug: string) {
  const fullPath = path.join(getDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) throw new Error("Not found");
  const source = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(source);
  const contentOnly = parsed.content || source;

  const { content, frontmatter } = await compileMDX<T>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
          [
            // Chiroyli code highlight (Shiki)
            rehypePrettyCode,
            {
              theme: "one-dark-pro",
              keepBackground: false,
            },
          ],
        ] as RehypePlugin[],
      },
    },
    components: mdxComponents,
  });

  const rt = readingTime(contentOnly);
  const headings = extractHeadings(contentOnly);

  return {
    content,
    frontmatter: frontmatter as T,
    readingTime: rt, // { text: '3 min read', minutes, time, words }
    headings, // [{level, text, slug}]
  };
}