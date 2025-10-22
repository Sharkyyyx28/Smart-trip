function InfoSection({ trip }: { trip: any }) {
  return (
    <div>
      <img
        src="/placeholder2.jpg"
        className="w-full h-90 object-cover rounded-lg mb-4"
      />
      <div className="my-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{trip?.UserSelection?.destination ?? "Loading..."}</h2>
        <div className="flex gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">📅 {trip?.UserSelection?.days ?? "Loading..."} Day </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.UserSelection?.budget ?? "Loading..."} Budget </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">👥 Travelers : {trip?.UserSelection?.travelType?? "Loading..."} </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
