"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TimelineItem from "./TimelineItem";
import { experienceData } from "@/data/experience";
import { iconOf, kindOf } from "./kinds";

interface ExperienceTimelineProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ExperienceTimeline({ selectedId, onSelect }: ExperienceTimelineProps) {
  return (
    <div className="jr-rail">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="jr-rail-head">
        <h2><Sparkles size={20} fill="currentColor" /> My Journey</h2>
        <p>A timeline of my growth, leadership, achievements and the impact I&apos;ve created.</p>
      </motion.div>
      <ol className="jr-list">
        {experienceData.map((item, index) => {
          const kind = kindOf(item.icon);
          return (
            <TimelineItem
              key={item.id}
              icon={iconOf(item.icon)}
              kind={kind.label}
              color={kind.color}
              year={item.year}
              title={item.title}
              subtitle={item.subtitle}
              isActive={selectedId === item.id}
              onClick={() => onSelect(item.id)}
              index={index}
              isLast={index === experienceData.length - 1}
            />
          );
        })}
      </ol>
    </div>
  );
}
