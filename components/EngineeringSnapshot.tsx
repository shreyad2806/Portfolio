"use client";

import { motion } from "framer-motion";
import { Layers, Boxes, Wrench, Trophy } from "lucide-react";

const STATS = [
  {
    icon: Layers,
    value: "8+",
    label: "Production AI Projects",
  },
  {
    icon: Boxes,
    value: "5",
    label: "Production AI Systems",
  },
  {
    icon: Wrench,
    value: "20+",
    label: "Technologies Used",
  },
  {
    icon: Trophy,
    value: "Runner-up",
    label: "Smart India Hackathon",
  },
];

export default function EngineeringSnapshot() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-surface p-6 flex flex-col gap-4"
            >
              <stat.icon size={18} className="text-primary" strokeWidth={1.75} />
              <div>
                <p className="text-2xl lg:text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
