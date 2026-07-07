"use client";

import { motion } from "framer-motion";

export default function FloatingCube() {
  return (
    <motion.div
      className="relative w-48 h-48"
      animate={{
        y: [0, -20, 0],
        rotateX: [0, 10, 0],
        rotateY: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl" />
      
      {/* Main Cube */}
      <motion.div
        className="relative w-full h-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-primary/10 rounded-2xl border border-primary/30"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Glow */}
        <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-xl" />
        
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
        
        {/* Center Element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-primary/20 rounded-xl border border-primary/40"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/40 rounded-lg" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
