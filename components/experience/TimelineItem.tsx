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
      <div className="absolute left-3 top-8 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
      
      {/* Card */}
      <motion.div
        className={`ml-10 p-4 rounded-xl border transition-all duration-300 ${
          isActive
            ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
            : "bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card/80"
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
              className={isActive ? "text-primary" : "text-muted"}
            />
          </div>
          <div className="flex-1">
            <p
              className={`text-xs font-medium mb-1 ${
                isActive ? "text-primary" : "text-muted"
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
