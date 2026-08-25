export function getSeededImageUrl(seed: string | undefined, width: number, height: number) {
  const safeSeed = encodeURIComponent(seed?.trim() || "travel");
  return `https://picsum.photos/seed/${safeSeed}/${width}/${height}`;
}
