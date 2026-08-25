type WikipediaQueryResponse = {
  query?: {
    pages?: Record<string, { thumbnail?: { source?: string } }>;
  };
};

const cache = new Map<string, Promise<string | null>>();

async function resolveWikipediaImage(
  query: string,
  targetWidth: number
): Promise<string | null> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=${targetWidth}&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data: WikipediaQueryResponse = await res.json();
    const pages = data.query?.pages ? Object.values(data.query.pages) : [];
    return pages[0]?.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

export function getWikipediaImage(query: string, targetWidth: number): Promise<string | null> {
  const cacheKey = `${query}::${targetWidth}`;
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, resolveWikipediaImage(query, targetWidth));
  }
  return cache.get(cacheKey)!;
}
