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
  const [trip,setTrip] = useState<any>(null);

  if (!tripId) {
    return <div>No trip ID provided</div>;
  }

  useEffect(() => {
    fetchTripData();
  }, [tripId]);

  const fetchTripData = async () => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data() as any);
      }
      else {
        console.log("No such document!");
        toast.error("No trip exists!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      toast.error("Error fetching trip data");
    }
  }
 


  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-60">
      <InfoSection trip={trip} />
      <HotelSection trip={trip} />
      <Itinerary trip={trip} />
    </div>
  );
}

export default ViewTrip;
