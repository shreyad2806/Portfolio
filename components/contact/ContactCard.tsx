"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  buttonLabel: string;
  buttonHref: string;
  isExternal?: boolean;
  index: number;
}

export default function ContactCard({
  icon: Icon,
  title,
  description,
  value,
  buttonLabel,
  buttonHref,
  isExternal = false,
  index,
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
          <p className="text-xs text-muted leading-relaxed mb-3">
            {description}
          </p>
          {title === "Email" && (
            <p className="text-sm text-text/80 break-all">{value}</p>
          )}
        </div>
      </div>
      <a
        href={buttonHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary hover:bg-primary/20 transition-colors"
      >
        {buttonLabel}
      </a>
    </motion.div>
  );
}
