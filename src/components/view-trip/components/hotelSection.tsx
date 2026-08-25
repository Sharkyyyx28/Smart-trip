import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSeededImageUrl } from "@/lib/image";

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating || 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating ?? "N/A"}</span>
    </div>
  );
}

function HotelSection({ trip, loading }: { trip: any; loading?: boolean }) {
  const hotels = trip?.TripData?.hotels;
  const isLoading = loading || !trip;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hotel Options</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-lg p-2">
                <Skeleton className="rounded-lg h-40 w-full mb-2" />
                <div className="my-2 flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))
          : hotels?.map((item: any, index: number) => (
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName}`}
                target="_blank"
                key={index}
              >
                <div className="rounded-lg p-2 hover:scale-105 transition-all cursor-pointer">
                  <img
                    src={getSeededImageUrl(`${item.hotelName}-hotel`, 400, 300)}
                    className="rounded-lg h-40 w-full object-cover mb-2"
                    alt={item.hotelName}
                  />
                  <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{item.hotelName}</h2>
                    <p className="text-xs text-gray-600">📍{item.hotelAddress}</p>
                    <p className="text-sm">💰{item.pricePerNight} per night</p>
                    <StarRating rating={item.rating} />
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default HotelSection;
