import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import { useParams } from "react-router-dom";

function ViewTrip() {
  const { tripId } = useParams();

  const fetchTripData = async (tripId: string) => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);
  }


  return (
    <div>
      <h1>View Trip: {tripId}</h1>
    </div>
  );
}

export default ViewTrip;
