"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  kind: string;
  color: string;
  year: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ icon: Icon, kind, color, year, title, subtitle, isActive, onClick, index, isLast }: TimelineItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className={`jr-item ${isActive ? "is-active" : ""} ${isLast ? "is-last" : ""}`}
      style={{ ["--kind" as string]: color }}
    >
      <span className="jr-node" aria-hidden="true">{isActive && <i />}</span>
      <button type="button" onClick={onClick} aria-current={isActive ? "true" : undefined} className="jr-card">
        <span className="jr-card-icon"><Icon size={19} strokeWidth={1.7} /></span>
        <span className="jr-card-text">
          <span className="jr-card-meta"><b>{kind}</b><em>{year}</em></span>
          <span className="jr-card-title">{title}</span>
          <span className="jr-card-sub">{subtitle}</span>
        </span>
      </button>
    </motion.li>
  );
}
