import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWikipediaImage } from "@/lib/wikiImage";

type Status = "loading" | "found" | "missing";

const PLACEHOLDER_PALETTE = [
  "bg-rose-100 text-rose-400",
  "bg-amber-100 text-amber-500",
  "bg-emerald-100 text-emerald-500",
  "bg-sky-100 text-sky-500",
  "bg-violet-100 text-violet-500",
  "bg-orange-100 text-orange-500",
];

function paletteFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PLACEHOLDER_PALETTE[hash % PLACEHOLDER_PALETTE.length];
}

function SmartImage({
  query,
  seed,
  width,
  alt,
  className,
}: {
  query: string;
  seed: string;
  width: number;
  alt: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setSrc(null);

    getWikipediaImage(query, width).then((url) => {
      if (cancelled) return;
      if (url) {
        setSrc(url);
        setStatus("found");
      } else {
        setStatus("missing");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [query, width]);

  if (status === "found" && src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setStatus("missing")}
      />
    );
  }

  if (status === "loading") {
    return (
      <div className={cn("bg-gray-200 animate-pulse", className)} role="img" aria-label={alt} />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        paletteFor(seed),
        className
      )}
      role="img"
      aria-label={alt}
    >
      <ImageIcon className="h-8 w-8" />
    </div>
  );
}

export { SmartImage };
