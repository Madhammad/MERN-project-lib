import { motion } from "framer-motion";

export const SlidingText = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "50px",
      }}
    >
      <motion.div
        className="inline-block text-2xl text-indigo-400 "
        animate={{
          x: ["100%", "-100%"], // Start from right and move to the left
        }}
        transition={{
          repeat: Infinity, // Infinite loop
          duration: 20, // Duration of one cycle
          ease: "linear", // Smooth and continuous motion
        }}  
      >
        For Learning, Sharing, and Showcasing Projects
      </motion.div>
    </div>
  );
};
