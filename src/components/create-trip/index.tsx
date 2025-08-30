import { useState } from "react";
import { Users, DollarSign, Heart, Home, User } from "lucide-react";

export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");

  const handleSubmit = () => {
    console.log({
      destination,
      days,
      budget,
      travelType,
    });
    alert("Trip Generated! 🎉");
  };
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        Tell us your travel preferences 🌍✈️
      </h1>
      <p className="text-gray-600 mb-8">
        Just provide some basic information, and our trip planner will generate a customized itinerary.
      </p>

      {/* Destination */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          What is destination of choice?
        </label>
        <input
          type="text"
          placeholder="Ex. Paris, Bali, Goa..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Days */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          How many days are you planning your trip?
        </label>
        <input
          type="number"
          placeholder="Ex. 5"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block font-semibold mb-4">What is Your Budget?</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "Cheap", desc: "Stay conscious of costs", icon: DollarSign },
            { key: "Moderate", desc: "Keep cost on the average side", icon: DollarSign },
            { key: "Luxury", desc: "Don’t worry about cost", icon: DollarSign },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setBudget(item.key)}
              className={`border rounded-xl p-4 text-left shadow-sm hover:shadow-md transition ${
                budget === item.key ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <item.icon className="mb-2" />
              <h3 className="font-semibold">{item.key}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Travel Type */}
      <div className="mb-8">
        <label className="block font-semibold mb-4">
          Who do you plan on traveling with on your next adventure?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: "Just Me", desc: "Solo travels in exploration", icon: User },
            { key: "A Couple", desc: "Two travelers in tandem", icon: Heart },
            { key: "Family", desc: "A group of fun loving adventurers", icon: Home },
            { key: "Friends", desc: "A bunch of thrill-seekers", icon: Users },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTravelType(item.key)}
              className={`border rounded-xl p-4 text-left shadow-sm hover:shadow-md transition ${
                travelType === item.key ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <item.icon className="mb-2" />
              <h3 className="font-semibold">{item.key}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Generate Trip
        </button>
      </div>
    </div>
  );
}
