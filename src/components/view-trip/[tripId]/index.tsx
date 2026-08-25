import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import HotelSection from "../components/hotelSection";
import Itinerary from "../components/itinerary";

function ViewTrip() {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;
    fetchTripData(tripId);
  }, [tripId]);

  const fetchTripData = async (id: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, "trips", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data() as any);
      } else {
        console.log("No such document!");
        toast.error("No trip exists!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      toast.error("Error fetching trip data");
    } finally {
      setLoading(false);
    }
  };

  if (!tripId) {
    return <div>No trip ID provided</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-60">
      <InfoSection trip={trip} loading={loading} />
      <HotelSection trip={trip} loading={loading} />
      <Itinerary trip={trip} loading={loading} />
    </div>
  );
}

export default ViewTrip;
