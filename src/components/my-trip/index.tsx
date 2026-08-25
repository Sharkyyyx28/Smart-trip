import { collection, getDocs, query, where, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebase";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { SmartImage } from "../ui/smart-image";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "trips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      // ✅ Collect all trips first, then update state once
      const tripsArray: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        tripsArray.push({ id: doc.id, ...doc.data() });
      });

      setUserTrips(tripsArray);
    } finally {
      setLoading(false);
    }
  };

  console.log("User Trips:", userTrips);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-70">
      <div className="font-bold text-3xl mt-5 mb-5">My Trips</div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="mt-5 rounded-lg">
              <Skeleton className="rounded-lg h-[220px] w-full mb-2" />
              <div className="my-2 flex flex-col gap-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : userTrips.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 gap-4">
          <MapPin className="h-16 w-16 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-700">No trips yet</h2>
          <p className="text-gray-500 max-w-sm">
            You haven't planned any trips yet. Start by creating your first
            AI-generated itinerary.
          </p>
          <Link to="/create-trip">
            <Button className="mt-2">+ Create a trip</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {userTrips.map((item: any, index: number) => (
            <Link to={`/view-trip/${item.id}`} key={index}>
              <div className="mt-5 rounded-lg hover:scale-105 transition-all cursor-pointer">
                <SmartImage
                  query={item.UserSelection?.destination}
                  seed={item.UserSelection?.destination}
                  width={400}
                  height={300}
                  className="rounded-lg h-[220px] w-full object-cover mb-2"
                  alt={item.UserSelection?.destination}
                />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium">{item.UserSelection?.destination}</h2>
                  <p className="text-sm text-gray-600">{item.UserSelection?.days} day trip</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                      💰 {item.UserSelection?.budget}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      👥 {item.UserSelection?.travelType}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
