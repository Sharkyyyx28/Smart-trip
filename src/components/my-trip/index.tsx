import { collection, getDocs, query, where, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebase";
import { Link } from "react-router-dom";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(collection(db, "trips"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);

    // ✅ Collect all trips first, then update state once
    const tripsArray: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      tripsArray.push({ id: doc.id, ...doc.data() });
    });

    setUserTrips(tripsArray);
  };

  console.log("User Trips:", userTrips);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-70">
      <div className="font-bold text-3xl mt-5">My Trips</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips.map((item: any, index: number) => (
            <Link to={`/view-trip/${item.id}`} key={index}>
            <div className="mt-5 rounded-lg hover:scale-105 transition-all cursor-pointer">
              <img
                src={"/placeholder2.jpg"}
                className="rounded-lg h-[220px] w-full object-cover mb-2"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{item.UserSelection.destination}</h2>
                <p className="text-sm text-gray-600">{item.UserSelection.days} day trip with {item.UserSelection.budget} budget</p>
              </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
