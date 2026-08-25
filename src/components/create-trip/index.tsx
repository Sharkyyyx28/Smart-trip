import { useState, useEffect, useCallback } from "react";
import { Users, Heart, Home, User, Wallet, CreditCard, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { genAiResponse } from "../service/AIModel";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog"; // ✅ only use shadcn dialog
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";

function LoadingSpinner() {
  return (
    <span className="inline-block animate-spin rounded-full border-2 border-gray-300 border-t-black h-5 w-5 mr-2" />
  );
}

type FormErrors = {
  destination?: string;
  days?: string;
  budget?: string;
  travelType?: string;
};

export default function CreateTrip() {
  const navigate = useNavigate();
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [openDialog, setOpenDialog] = useState(false);

  // ✅ separate loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // ✅ debounce
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

  const debouncedEffect = useCallback(
    debounce((data: any) => {
      console.log("Debounced form data:", data);
    }, 500),
    []
  );

  function handleInputChange(name: string, value: string) {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  useEffect(() => {
    debouncedEffect(formData);
  }, [formData, debouncedEffect]);

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!formData?.destination?.trim()) {
      newErrors.destination = "Please enter a destination.";
    }
    if (!formData?.days) {
      newErrors.days = "Please enter the number of days.";
    } else if (Number(formData.days) <= 0) {
      newErrors.days = "Days must be at least 1.";
    }
    if (!formData?.budget) {
      newErrors.budget = "Please select a budget.";
    }
    if (!formData?.travelType) {
      newErrors.travelType = "Please select who you're traveling with.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ✅ Generate Trip
  const generateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all the fields correctly.");
      return;
    }

    if (Number(formData.days) > 5) {
      toast.warning(
        "Longer trips (over 5 days) may take a little longer to generate — thanks for your patience!"
      );
    }

    const Prompt = `
Generate a travel plan in **strict JSON format** using the exact schema and key order shown below.
Do not include any markdown, code fences, comments, or extra text—only valid JSON.

Required schema and order:

{
  "location": "string (destination name)",
  "duration": "string (e.g. '3 Days')",
  "targetAudience": "string (e.g. 'A Couple')",
  "budget": "string (e.g. 'Cheap')",
  "hotels": (3-4 options)[
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "pricePerNight": "string",
      "hotelImageUrl": "string (URL)",
      "geoCoordinates": {
        "latitude": number,
        "longitude": number
      },
      "rating": number,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": "string (e.g. 'Day 1')",
      "theme": "string",
      "date": "string",
      "transportationTip": "string",
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string (in short sentence under 10-15 words)",
          "placeImageUrl": "string (URL)",
          "ticketPricing": "string(just numbers with currency symbol, Free , Varies)",
          "suggestedTime": "string(e.g. '9:00 AM - 11:00 AM')",
          "timeSpent": "string",
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}

Generate the content for:
- Location: ${formData?.destination}
- Duration: ${formData?.days} Days
- Target Audience: ${formData?.travelType}
- Budget: ${formData?.budget}

Ensure:
- All URLs are valid-looking placeholders if real ones aren't available.
- All numbers (latitude, longitude, rating) are valid numeric types.
- Follow the JSON key names and nesting **exactly** as above.
- Return **only** the JSON object.
`;


    try {
      setIsGenerating(true); // ✅ only affects "Generate Trip" button
      const result = await genAiResponse(Prompt);
      console.log("AI Response:", result);
      SaveTrip(result);
      toast.success("Trip Generated Successfully");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip");
    } finally {
      setIsGenerating(false);
    }
  };

  const getUserProfile = async (tokenInfo: { access_token: string }) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
          },
        }
      );

      console.log("Google Profile:", res.data);

      // save user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // close login dialog
      setOpenDialog(false);
      setIsGoogleLoading(false);

      toast.success(`Welcome ${res.data.name}!`);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch user profile");
      setIsGoogleLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: () => {
      toast.error("Google Login Failed");
      setIsGoogleLoading(false);
    },
  });

  function cleanJson(str: string) {
    return str.replace(/```json|```/g, "").trim();
  }

  const SaveTrip = async (TripData: any) => {
    const DocId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user")!);

    const parsedTrip = JSON.parse(cleanJson(TripData)); // ✅ cleaned

    await setDoc(doc(db, "trips", DocId), {
      UserSelection: formData,
      TripData: parsedTrip,
      id: DocId,
      userEmail: user.email,
    });

    toast.success("Trip Saved Successfully");
    navigate(`/view-trip/${DocId}`);
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
          className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 ${
            errors.destination ? "border-red-500" : ""
          }`}
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
            handleInputChange("destination", e.target.value);
          }}
        />
        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
        )}
      </div>

      {/* Days */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          How many days are you planning your trip?
        </label>
        <input
          type="number"
          placeholder="Ex. 5"
          min={1}
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
            handleInputChange("days", e.target.value);
          }}
          className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 ${
            errors.days ? "border-red-500" : ""
          }`}
        />
        {errors.days ? (
          <p className="text-red-500 text-sm mt-1">{errors.days}</p>
        ) : Number(days) > 5 ? (
          <p className="text-amber-600 text-sm mt-1">
            Longer trips take a bit more time to generate — thanks for your patience!
          </p>
        ) : null}
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block font-semibold mb-4">What is Your Budget?</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "Cheap", desc: "Stay conscious of costs", icon: Wallet },
            {
              key: "Moderate",
              desc: "Keep cost on the average side",
              icon: CreditCard,
            },
            { key: "Luxury", desc: "Don’t worry about cost", icon: Gem },
          ].map((item) => (
            <motion.button
              key={item.key}
              type="button"
              onClick={() => {
                setBudget(item.key);
                handleInputChange("budget", item.key);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: budget === item.key ? 1.03 : 1 }}
              className={`border rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-shadow ${
                budget === item.key
                  ? "border-blue-500 bg-blue-50"
                  : errors.budget
                  ? "border-red-300"
                  : ""
              }`}
            >
              <item.icon className="mb-2" />
              <h3 className="font-semibold">{item.key}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.button>
          ))}
        </div>
        {errors.budget && (
          <p className="text-red-500 text-sm mt-2">{errors.budget}</p>
        )}
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
            <motion.button
              key={item.key}
              type="button"
              onClick={() => {
                setTravelType(item.key);
                handleInputChange("travelType", item.key);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: travelType === item.key ? 1.03 : 1 }}
              className={`border rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-shadow ${
                travelType === item.key
                  ? "border-blue-500 bg-blue-50"
                  : errors.travelType
                  ? "border-red-300"
                  : ""
              }`}
            >
              <item.icon className="mb-2" />
              <h3 className="font-semibold">{item.key}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.button>
          ))}
        </div>
        {errors.travelType && (
          <p className="text-red-500 text-sm mt-2">{errors.travelType}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          onClick={generateTrip}
          disabled={isGenerating}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center"
        >
          {isGenerating ? (
            <>
              <LoadingSpinner /> Generating...
            </>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription>
              <div className="flex justify-start items-center">
                <img src="logo.png" className="h-12 mr-2" />
                <span className="text-2xl font-bold ml-2">Smart Trip</span>
              </div>
              <h2 className="text-lg font-semibold mt-7 text-gray-800">
                Sign In Required
              </h2>
              <p className="mt-2 text-gray-600">
                Please sign in with your Google account to generate a trip plan.
              </p>
              <Button
                onClick={() => {
                  setIsGoogleLoading(true);
                  login();
                }}
                className="w-full mt-5 bg-black text-white font-semibold hover:bg-gray-800 transition flex items-center justify-center"
              >
                {isGoogleLoading ? (
                  <>
                    <LoadingSpinner /> Signing in...
                  </>
                ) : (
                  <>
                    <FcGoogle className="mr-2 text-xl" /> Sign in with Google
                  </>
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
