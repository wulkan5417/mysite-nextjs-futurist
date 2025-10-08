import { getAllMeta } from "@/lib/content";

export function getAllTags() {
  const posts = getAllMeta<{ tags?: string[] }>("blog");
  const lessons = getAllMeta<{ tags?: string[] }>("lessons");
  const map = new Map<string, { count: number; types: Set<string> }>();
  
  for (const [type, items] of [["blog", posts], ["lessons", lessons]] as const) {
    for (const it of items) {
      (it.tags || []).forEach((t) => {
        const key = t.toLowerCase();
        if (!map.has(key)) map.set(key, { count: 0, types: new Set() });
        const v = map.get(key)!;
        v.count += 1;
        v.types.add(type);
      });
    }
  }
  
  return Array.from(map.entries()).map(([tag, v]) => ({ 
    tag, 
    count: v.count, 
    types: Array.from(v.types) 
  }));
}