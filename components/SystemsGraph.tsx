"use client";

import { motion } from "framer-motion";

type NodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const NODES: NodeDef[] = [
  { id: "talentlens", label: "TalentLens", x: 40, y: 60 },
  { id: "stack", label: "AI Tech Stack", x: 380, y: 40 },
  { id: "lawgpt", label: "LawGPT CRM", x: 40, y: 320 },
  { id: "complyt", label: "ComplytAI", x: 380, y: 340 },
];

const CENTER = { x: 210, y: 190 };

export default function SystemsGraph() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto aspect-[440/380]">
      <svg
        viewBox="0 0 420 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Diagram of the central AI Systems node connected to TalentLens, AI Tech Stack, LawGPT CRM, and ComplytAI"
      >
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* connecting lines */}
        {NODES.map((node, i) => (
          <g key={`line-${node.id}`}>
            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={node.x}
              y2={node.y}
              stroke="#23242C"
              strokeWidth={1.5}
            />
            <motion.line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={node.x}
              y2={node.y}
              stroke="url(#edge-gradient)"
              strokeWidth={1.5}
              strokeDasharray="6 220"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -226 }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          </g>
        ))}

        {/* center glow */}
        <circle cx={CENTER.x} cy={CENTER.y} r={70} fill="url(#node-glow)" />

        {/* center node */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={8}
          fill="#8B5CF6"
          animate={{ r: [8, 9.5, 8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={16}
          fill="none"
          stroke="#8B5CF6"
          strokeOpacity={0.35}
          strokeWidth={1}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 34}
          textAnchor="middle"
          className="fill-[#F8FAFC]"
          style={{ fontSize: 12, fontFamily: "var(--font-jetbrains)" }}
        >
          AI Systems
        </text>

        {/* satellite nodes */}
        {NODES.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={4.5} fill="#F8FAFC" />
            <circle
              cx={node.x}
              cy={node.y}
              r={9}
              fill="none"
              stroke="#23242C"
              strokeWidth={1}
            />
            <text
              x={node.x < CENTER.x ? node.x + 14 : node.x - 14}
              y={node.y - 14}
              textAnchor={node.x < CENTER.x ? "start" : "end"}
              className="fill-[#94A3B8]"
              style={{ fontSize: 11, fontFamily: "var(--font-jetbrains)" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
