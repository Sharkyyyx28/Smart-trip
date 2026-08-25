import { useEffect, useState } from "react";
import { getSeededImageUrl } from "@/lib/image";
import { getWikipediaImage } from "@/lib/wikiImage";

function SmartImage({
  query,
  seed,
  width,
  height,
  alt,
  className,
}: {
  query: string;
  seed: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  const fallback = getSeededImageUrl(seed, width, height);
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    setSrc(getSeededImageUrl(seed, width, height));

    getWikipediaImage(query, width).then((url) => {
      if (!cancelled && url) setSrc(url);
    });

    return () => {
      cancelled = true;
    };
  }, [query, seed, width, height]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setSrc(fallback)}
    />
  );
}

export { SmartImage };
