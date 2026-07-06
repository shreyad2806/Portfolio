"use client";

import { categories } from "./ProjectData";
import { ProjectCategory } from "@/types/project";

interface ProjectFiltersProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export default function ProjectFilters({
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeCategory === category
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-muted/50 text-muted hover:bg-muted hover:text-text border border-border/50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
