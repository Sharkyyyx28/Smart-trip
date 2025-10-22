import { Link } from "react-router-dom"
function itinerary({ trip }: { trip: any }) {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4 mt-2">Places to visit</h1>
      <div>
        {trip?.TripData?.itinerary?.map((item: any, index: number) => (
          <div key={index}>
            <h1 className="font-medium text-lg mt-5">{item.day}</h1>
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
                    <div className="border rounded-xl p-4 flex gap-5 shadow hover:shadow-md transition-all cursor-pointer">
                      <img
                        src={"/placeholder2.jpg"}
                        className="rounded-lg h-auto w-[130px] object-cover mb-2"
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

export default itinerary;
