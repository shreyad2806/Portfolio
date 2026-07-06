"use client";

import { Search, Grid, List } from "lucide-react";
import { ViewMode } from "@/types/project";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-64 text-sm bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted/50"
        />
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-1 bg-muted/50 border border-border/50 rounded-lg p-1">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded-md transition-all ${
            viewMode === "grid"
              ? "bg-background text-text shadow-sm"
              : "text-muted hover:text-text"
          }`}
          aria-label="Grid view"
        >
          <Grid size={18} />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded-md transition-all ${
            viewMode === "list"
              ? "bg-background text-text shadow-sm"
              : "text-muted hover:text-text"
          }`}
          aria-label="List view"
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
}
