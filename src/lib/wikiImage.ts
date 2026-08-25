type WikipediaQueryResponse = {
  query?: {
    pages?: Record<string, { thumbnail?: { source?: string } }>;
  };
};

type CommonsImageInfoResponse = {
  query?: {
    pages?: Record<string, { imageinfo?: { thumburl?: string }[] }>;
  };
};

const cache = new Map<string, Promise<string | null>>();

async function resolveWikipediaPageImage(
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

// Fallback for topics whose Wikipedia article has no page image set (e.g. no
// infobox photo), but which still have real photos on Wikimedia Commons.
async function resolveCommonsImage(
  query: string,
  targetWidth: number
): Promise<string | null> {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap ${query}`
    )}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=${targetWidth}&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data: CommonsImageInfoResponse = await res.json();
    const pages = data.query?.pages ? Object.values(data.query.pages) : [];
    return pages[0]?.imageinfo?.[0]?.thumburl ?? null;
  } catch {
    return null;
  }
}

async function resolveImage(query: string, targetWidth: number): Promise<string | null> {
  const wikipediaImage = await resolveWikipediaPageImage(query, targetWidth);
  if (wikipediaImage) return wikipediaImage;
  return resolveCommonsImage(query, targetWidth);
}

export function getWikipediaImage(query: string, targetWidth: number): Promise<string | null> {
  const cacheKey = `${query}::${targetWidth}`;
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, resolveImage(query, targetWidth));
  }
  return cache.get(cacheKey)!;
}
