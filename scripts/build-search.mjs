import fs from "fs";
import path from "path";

// Simple function to get all metadata without relying on path aliases
function getAllMeta(collection) {
  const CONTENT_DIR = path.join(process.cwd(), "content");
  const dir = path.join(CONTENT_DIR, collection);
  
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    // Simple frontmatter extraction
    const frontmatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    let data = {};
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      // Simple parsing of YAML-like frontmatter
      frontmatter.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          // Try to parse as JSON, otherwise keep as string
          try {
            data[key] = JSON.parse(value);
          } catch {
            // Remove quotes if present
            data[key] = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
          }
        }
      });
    }
    const slug = file.replace(/\.mdx?$/, "");
    return { slug, ...data };
  });
  return items;
}

// Get all content metadata
const posts = getAllMeta("blog");
const lessons = getAllMeta("lessons");
const projects = getAllMeta("projects");

// Combine all documents with their types
const documents = [
  ...posts.map((doc) => ({ ...doc, type: "blog" })),
  ...lessons.map((doc) => ({ ...doc, type: "lessons" })),
  ...projects.map((doc) => ({ ...doc, type: "projects" })),
];

// Create search index
const searchIndex = {
  schema: {
    id: "slug",
    fields: ["title", "excerpt"],
  },
  documents: documents.map((doc) => ({
    id: `${doc.type}-${doc.slug}`,
    type: doc.type,
    slug: doc.slug,
    title: doc.title || "",
    excerpt: doc.excerpt || "",
  })),
};

// Write to public directory
const outputPath = path.join(process.cwd(), "public", "search-index.json");
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

console.log(`Search index generated with ${documents.length} documents`);