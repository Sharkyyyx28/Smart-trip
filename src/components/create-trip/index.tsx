import { useState, useEffect, useCallback } from "react";
import { Users, DollarSign, Heart, Home, User } from "lucide-react";
import { toast } from "sonner";
import { genAiResponse } from "../service/AIModel";

export default function CreateTrip() {
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const debouncedEffect = useCallback(
    debounce((data: any) => {
      console.log("Debounced form data:", data);
    }, 500),
    []
  );

  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function handleInputChange(name: string, value: string) {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  }

  useEffect(() => {
    debouncedEffect(formData);
  }, [formData, debouncedEffect]);

  const generateTrip = async() => {
    if (
      (Number(formData?.days) > 5 && !formData?.destination) ||
      !formData?.budget ||
      !formData?.travelType
    ) {
      toast.error(
        "Please fill all the fields correctly. Days should be less than or equal to 5."
      );
      return;
    }
    const Prompt =
      "Generate Travel Plan for Location : " +
      formData?.destination +
      ", for " +
      formData?.days +
      " Days for " +
      formData?.travelType +
      " with a " +
      formData?.budget +
      " budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for " +
      formData?.days +
      " days with each day plan with best time to visit in JSON format.";

      const result = await genAiResponse(Prompt);
      console.log("AI Response:", result);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        Tell us your travel preferences 🌍✈️
      </h1>
      <p className="text-gray-600 mb-8">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary.
      </p>

      {/* Destination */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          What is destination of choice?
        </label>
        <input
          type="text"
          placeholder="Ex. Paris, France"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={place}
          onChange={(e) => (
            setPlace(e.target.value),
            handleInputChange("destination", e.target.value)
          )}
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
          onChange={(e) => (
            setDays(e.target.value), handleInputChange("days", e.target.value)
          )}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block font-semibold mb-4">What is Your Budget?</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "Cheap", desc: "Stay conscious of costs", icon: DollarSign },
            {
              key: "Moderate",
              desc: "Keep cost on the average side",
              icon: DollarSign,
            },
            { key: "Luxury", desc: "Don’t worry about cost", icon: DollarSign },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => (
                setBudget(item.key), handleInputChange("budget", item.key)
              )}
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
            {
              key: "Family",
              desc: "A group of fun loving adventurers",
              icon: Home,
            },
            { key: "Friends", desc: "A bunch of thrill-seekers", icon: Users },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => (
                setTravelType(item.key),
                handleInputChange("travelType", item.key)
              )}
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
          onClick={generateTrip}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Generate Trip
        </button>
      </div>
    </div>
  );
}
