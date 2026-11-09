"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  year: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function TimelineItem({
  icon: Icon,
  year,
  title,
  subtitle,
  isActive,
  onClick,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      custom={index}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`relative cursor-pointer mb-6 ${
        isActive ? "z-10" : "z-0"
      }`}
    >
      {/* Timeline Line */}
      <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
      
      {/* Timeline Dot */}
      <div className={`absolute left-3 top-8 h-3 w-3 rounded-full ${isActive ? "bg-cyan-300 shadow-[0_0_16px_4px_rgba(103,232,249,.7)]" : "bg-primary shadow-[0_0_10px_2px_rgba(139,107,255,.55)]"}`}>
        {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/70" />}
      </div>
      
      {/* Card */}
      <motion.div
        className={`ml-10 p-4 rounded-xl border transition-all duration-300 ${
          isActive
            ? "border-cyan-300/60 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 shadow-[0_0_30px_rgba(103,232,249,.18)]"
            : "border-violet-300/20 bg-[#120c46]/60 backdrop-blur-md hover:border-violet-300/50 hover:bg-[#1a1160]/70"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              isActive ? "bg-primary/20" : "bg-muted/50"
            }`}
          >
            <Icon
              size={20}
              className={isActive ? "text-cyan-200" : "text-muted"}
            />
          </div>
          <div className="flex-1">
            <p
              className={`text-xs font-medium mb-1 ${
                isActive ? "text-cyan-200" : "text-muted"
              }`}
            >
              {year}
            </p>
            <h3 className="text-sm font-semibold text-text mb-1">{title}</h3>
            <p className="text-xs text-muted">{subtitle}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
