import { motion } from "framer-motion";
import { Button } from "../ui/button";

const destinationChips: { label: string; top: string; left: string }[] = [
  { label: "✈️ Paris", top: "10%", left: "6%" },
  { label: "🏯 Tokyo", top: "18%", left: "86%" },
  { label: "🏝️ Bali", top: "68%", left: "4%" },
  { label: "🗽 New York", top: "78%", left: "88%" },
  { label: "🏛️ Santorini", top: "12%", left: "46%" },
  { label: "🐪 Dubai", top: "70%", left: "50%" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#fde8e3,#ffffff,#e3f0fd,#ffffff,#fde8e3)] bg-[length:400%_400%]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {destinationChips.map((chip, i) => (
        <motion.span
          key={chip.label}
          aria-hidden
          className="hidden md:block absolute text-sm font-medium px-3 py-1 rounded-full bg-white/70 backdrop-blur shadow-sm text-gray-500"
          style={{ top: chip.top, left: chip.left }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.4 + i * 0.1 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
          }}
        >
          {chip.label}
        </motion.span>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center mx-4 md:mx-40 gap-8 py-16"
      >
        <motion.div
          variants={itemVariants}
          className="text-[36px] md:text-[50px] font-extrabold text-center mt-16"
        >
          <span className="text-[#f56551]">
            Create your itineraries easily, in seconds!
          </span>
          <br />
          Smart Trips, Smarter Memories
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-[18px] md:text-[20px] text-center text-gray-600 mb-6 max-w-2xl"
        >
          Plan your perfect trip with Smart Trip - the AI-powered itinerary
          generator that creates personalized travel plans in seconds. Say goodbye
          to hours of research and hello to stress-free travel planning.
        </motion.div>

        <motion.a
          variants={itemVariants}
          href="/create-trip"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <Button variant="outline" className="px-6 py-5 text-base shadow-md">
            Get Started, It's Free
          </Button>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default HeroSection;
