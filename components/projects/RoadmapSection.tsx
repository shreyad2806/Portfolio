"use client";

import { motion } from "framer-motion";
import { ProjectDetailData } from "@/lib/project-detail-data";

interface RoadmapSectionProps {
  data: ProjectDetailData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function RoadmapSection({ data }: RoadmapSectionProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "planned":
        return "bg-muted/50 text-muted border-border/50";
      default:
        return "bg-muted/50 text-muted border-border/50";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-3">Roadmap</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Future Roadmap
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {data.roadmap.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
                >
                  {getStatusLabel(item.status)}
                </span>
              </div>
              <div className="flex-1 card-surface p-4 rounded-lg border border-border/50">
                <p className="font-medium text-sm">{item.feature}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
