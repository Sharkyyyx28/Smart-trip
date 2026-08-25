import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartImage } from "@/components/ui/smart-image";

function InfoSection({ trip, loading }: { trip: any; loading?: boolean }) {
  const [copied, setCopied] = useState(false);

  if (loading || !trip) {
    return (
      <div>
        <Skeleton className="w-full h-90 rounded-lg mb-4" />
        <div className="my-8 flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-5">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const destination = trip?.UserSelection?.destination ?? "trip";

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Trip link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Could not copy link");
    }
  };

  return (
    <div>
      <div className="relative">
        <SmartImage
          query={destination}
          seed={destination}
          width={1200}
          height={600}
          className="w-full h-90 object-cover rounded-lg mb-4"
          alt={destination}
        />
        <Button
          onClick={handleShare}
          variant="outline"
          className="absolute top-4 right-4 bg-white/90 backdrop-blur hover:bg-white"
        >
          {copied ? (
            <Check className="mr-1 h-4 w-4" />
          ) : (
            <Share2 className="mr-1 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Share Trip"}
        </Button>
      </div>
      <div className="my-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{destination}</h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">📅 {trip?.UserSelection?.days} Day </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.UserSelection?.budget} Budget </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">👥 Travelers : {trip?.UserSelection?.travelType} </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
