import { Link } from "react-router-dom";

function HotelSection({ trip }: { trip: any }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hotel Options</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.TripData?.hotels?.map((item: any, index: number) => (
          <Link to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName}`} target="_blank">
          <div key={index} className="rounded-lg p-2 hover:scale-105 transition-all cursor-pointer">
            <img
              src={"/placeholder2.jpg"}
              className="rounded-lg h-40 w-full object-cover mb-2"
            />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium">{item.hotelName}</h2>
              <p className="text-xs text-gray-600">📍{item.hotelAddress}</p>
              <p className="text-sm">💰{item.pricePerNight} per night</p>
              <p className="text-sm text-gray-600">
                ⭐Rating: {item.rating} / 5
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HotelSection;
