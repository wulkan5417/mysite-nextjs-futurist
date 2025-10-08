"use client";

import { useEffect, useState } from "react";
import MiniSearch, { SearchResult } from "minisearch";

type Doc = { id: string; type: string; slug: string; title: string; excerpt?: string };

// Define a proper type for the search result fields we're extracting
type SearchDoc = {
  id: string;
  type: string;
  slug: string;
  title: string;
  excerpt?: string;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [ms, setMs] = useState<MiniSearch<Doc> | null>(null);
  const [res, setRes] = useState<Doc[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((json) => {
        const miniSearch = new MiniSearch({
          fields: ['title', 'excerpt'], // fields to search in
          storeFields: ['type', 'slug', 'title', 'excerpt'], // fields to return with search results
          idField: 'id',
        });
        
        // Add documents to the search index
        miniSearch.addAll(json.documents);
        setMs(miniSearch);
      });
  }, []);

  useEffect(() => {
    if (!ms) return;
    const searchResults = ms.search(q, { prefix: true });
    // Convert SearchResult to Doc type
    const docs: Doc[] = searchResults.map(result => {
      // Extract the stored fields from the result
      const searchDoc = result as unknown as SearchDoc & SearchResult;
      return {
        id: searchDoc.id,
        type: searchDoc.type,
        slug: searchDoc.slug,
        title: searchDoc.title,
        excerpt: searchDoc.excerpt,
      };
    });
    setRes(q ? docs : []);
  }, [q, ms]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-4">Qidiruv</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Kalit so'z kiriting..."
        className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-slate-400"
      />
      <div className="mt-6 space-y-3">
        {res.map((d) => (
          <a key={d.id} href={`/${d.type}/${d.slug}`} className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            <div className="text-sm uppercase text-slate-400">{d.type}</div>
            <div className="text-base font-medium">{d.title}</div>
            <div className="text-sm text-slate-300">{d.excerpt}</div>
          </a>
        ))}
        {!res.length && q && <div className="text-slate-400 text-sm">Hech narsa topilmadi.</div>
        }
      </div>
    </div>
  );
}