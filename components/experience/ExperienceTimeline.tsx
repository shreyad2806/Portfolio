"use client";

import { motion } from "framer-motion";
import {
  Github,
  Award,
  Trophy,
  FolderKanban,
  Target,
  Rocket,
  Briefcase,
  Sparkles,
  Users,
  Network,
  FolderGit2,
} from "lucide-react";
import TimelineItem from "./TimelineItem";
import { experienceData } from "@/data/experience";

const iconMap: Record<string, any> = {
  Rocket,
  Briefcase,
  Github,
  Sparkles,
  Users,
  Network,
  Trophy,
  FolderGit2,
};

interface ExperienceTimelineProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ExperienceTimeline({
  selectedId,
  onSelect,
}: ExperienceTimelineProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-text mb-2">My Journey</h2>
        <p className="text-sm text-muted">
          A timeline of my growth, leadership, achievements and the impact I've
          created.
        </p>
      </motion.div>

      <div className="space-y-0">
        {experienceData.map((item, index) => {
          const Icon = iconMap[item.icon] || Target;
          return (
            <TimelineItem
              key={item.id}
              icon={Icon}
              year={item.year}
              title={item.title}
              subtitle={item.subtitle}
              isActive={selectedId === item.id}
              onClick={() => onSelect(item.id)}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
