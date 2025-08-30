import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mx-40 gap-8">
      <div className="text-[50px] font-extrabold text-center mt-16">
        <span className="text-[#f56551]">
          Create your itineraries easily, in seconds!
        </span>
        <br></br>Smart Trips, Smarter Memories
      </div>
      <div className="text-[20px] text-center text-gray-600 mb-6">
        Plan your perfect trip with Smart Trip - the AI-powered itinerary
        generator that creates personalized travel plans in seconds. Say goodbye
        to hours of research and hello to stress-free travel planning.
      </div>
      <a href="/create-trip">
        <Button variant="outline">Get Started, It's Free</Button>
      </a>
    </div>
  );
};

export default HeroSection;
