"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  accent?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

/** Numbered, glowing section header shared by every page section. */
export default function SectionHeading({ index, eyebrow, title, description, accent = "#67e8f9", align = "left", action }: Props) {
  const center = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className={`th-heading mb-10 flex flex-wrap items-end justify-between gap-5 ${center ? "justify-center text-center" : ""}`}
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        <p className="th-heading-index mb-4">
          <i />
          {index ? `${index} · ` : ""}
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-.03em] text-white sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        {description && <p className="mt-4 text-[15px] leading-7 text-slate-300/80">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
