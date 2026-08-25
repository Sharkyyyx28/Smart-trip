import { Link } from "react-router-dom";
import { Navigation } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartImage } from "@/components/ui/smart-image";

function Itinerary({ trip, loading }: { trip: any; loading?: boolean }) {
  const isLoading = loading || !trip;
  const days = trip?.TripData?.itinerary;
  const destination = trip?.UserSelection?.destination ?? "";

  if (isLoading) {
    return (
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4 mt-2">Places to visit</h1>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="mb-8">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="border rounded-xl p-4 flex gap-5">
                  <Skeleton className="h-[130px] w-[130px] rounded-lg shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4 mt-2">Places to visit</h1>
      <div>
        {days?.map((item: any, index: number) => (
          <div key={index}>
            <div className="flex items-center gap-3 mt-5 mb-1 flex-wrap">
              <h1 className="font-medium text-lg">{item.day}</h1>
              {item.transportationTip && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  <Navigation className="h-3 w-3" />
                  {item.transportationTip}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-600 mb-5">Theme: {item.theme}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {item?.plan?.map((place: any, idx: number) => (
                <div key={idx}>
                  <div className="font-medium text-sm mb-3 text-orange-600">
                    {place.suggestedTime}
                  </div>
                  <Link
                    to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
                    target="_blank"
                  >
                    <div className="border rounded-xl p-4 flex gap-5 shadow hover:scale-105 transition-all cursor-pointer">
                      <SmartImage
                        query={`${place.placeName}, ${destination}`}
                        seed={`${place.placeName}-landmark`}
                        width={200}
                        height={200}
                        className="rounded-lg h-[130px] w-[130px] object-cover shrink-0"
                        alt={place.placeName}
                      />

                      <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg">{place.placeName}</h2>
                        <p className="text-sm text-gray-400">
                          {place.placeDetails}
                        </p>
                        <p className="text-md">⏲️{place.timeSpent}</p>
                        <p className="text-md">🎫{place.ticketPricing}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
